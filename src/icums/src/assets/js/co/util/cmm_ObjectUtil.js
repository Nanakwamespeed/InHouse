/**
 * ObjectUtil
 *
 * Seo Yongki
 */
var ObjectUtil = {

    /**
     * Returns true if the passed value is null or undefined.
     *
     * ObjectUtil.hasNoValue();              // true
     * ObjectUtil.hasNoValue(null);          // true
     * ObjectUtil.hasNoValue(undefined);     // true
     * ObjectUtil.hasNoValue('');            // false
     * ObjectUtil.hasNoValue([]);            // false
     * ObjectUtil.hasNoValue(function() {}); // false
     */
    hasNoValue: function(obj) {
        return obj === null || obj === undefined;
    },

    /**
     * Returns true if the passed value is not null or undefined.
     *
     * ObjectUtil.hasValue();              // false
     * ObjectUtil.hasValue(null);          // false
     * ObjectUtil.hasValue(undefined);     // false
     * ObjectUtil.hasValue('');            // true
     * ObjectUtil.hasValue([]);            // true
     * ObjectUtil.hasValue(function() {}); // true
     */
    hasValue: function(obj) {
        return !ObjectUtil.hasNoValue(obj);
    },

    /**
     * Verifies that a value is `null` or an empty string, empty array,
     * or empty function.
     *
     * ObjectUtil.isEmpty();                // true
     * ObjectUtil.isEmpty(null);            // true
     * ObjectUtil.isEmpty(undefined);       // true
     * ObjectUtil.isEmpty('');              // true
     * ObjectUtil.isEmpty([]);              // true
     * ObjectUtil.isEmpty({});              // false
     * ObjectUtil.isEmpty('Adam Hawkins');  // false
     * ObjectUtil.isEmpty([0,1,2]);         // false
     * ObjectUtil.isEmpty('\n\t');          // false
     * ObjectUtil.isEmpty('  ');            // false
     */
    isEmpty: function(obj) {
        const hasNoValue = ObjectUtil.hasNoValue(obj);
        if (hasNoValue) {
            return hasNoValue;
        }

        if (typeof obj.size === 'number') {
            return !obj.size;
        }

        const objectType = typeof obj;

        if (objectType === 'object') {
            const size = obj['size'];
            if (typeof size === 'number') {
                return !size;
            }
        }

        if (typeof obj.length === 'number' && objectType !== 'function') {
            return !obj.length;
        }

        if (objectType === 'object') {
            const length = obj['length'];
            if (typeof length === 'number') {
                return !length;
            }
        }

        return false;
    },

    /**
     * Verifies that a value is not `null`, an empty string, empty array,
     * or empty function.
     *
     * ObjectUtil.isNotEmpty();                // false
     * ObjectUtil.isNotEmpty(null);            // false
     * ObjectUtil.isNotEmpty(undefined);       // false
     * ObjectUtil.isNotEmpty('');              // false
     * ObjectUtil.isNotEmpty([]);              // false
     * ObjectUtil.isNotEmpty({});              // true
     * ObjectUtil.isNotEmpty('Adam Hawkins');  // true
     * ObjectUtil.isNotEmpty([0,1,2]);         // true
     * ObjectUtil.isNotEmpty('\n\t');          // true
     * ObjectUtil.isNotEmpty('  ');            // true
     */
    isNotEmpty: function(obj) {
        return !ObjectUtil.isEmpty(obj);
    },

    /**
     * Object Equal check
     */
    isEqual: function(vo1, vo2){
        return _.isEqual(vo1, vo2);
    },

    /**
     * Object copy
     */
    copy: function(obj){
        return Object.assign({}, obj);
    },

    /**
     * Object to JSON (debug)
     */
    simpleStringify: function(object){
        const simpleObject = {};
        for (const prop in object ){
          if (!object.hasOwnProperty(prop)){
            continue;
          }
          if (typeof(object[prop]) === 'object'){
            continue;
          }
          if (typeof(object[prop]) === 'function'){
            continue;
          }
          simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    },

    /**
     * Object to console Log (debug)
     */
    objectToLog: function(object, removeNull) {
        let logStr = '';
        for (const prop in object ){
          if (!object.hasOwnProperty(prop)){
            continue;
          }
          if (typeof(object[prop]) === 'object'){
            continue;
          }
          if (typeof(object[prop]) === 'function'){
              continue;
          }
          if(removeNull){
            if(this.hasValue(object[prop])){
              if(typeof object[prop] === 'string' && StringUtil.isNotBlank(object[prop])){
                logStr += prop + ' : ' + object[prop] + '\n';
              }else if(typeof object[prop] === 'number' && object[prop] !== 0){
                logStr += prop + ' : ' + object[prop] + '\n';
              }
            }
          }else{
            logStr += prop + ' : ' + object[prop] + '\n';
          }
        }
        return logStr;
    },

    /**
     * Excel Export
     */
    s2ab: function(s){
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    },
    exportExcel: function(columns, filename, sheetname, data) {
        console.log(columns);
        // var columns = this.columns;
        console.log('excel export start');
        $(".icums_loading").css('display', '');

        // step 1. workbook Create
        var wb = XLSX.utils.book_new();
        // step 2. Create sheet
        var wscols = [];
        var wsrows = [
            // {hpt: 20}
        ];
        var xlsData = [];
        for(var i=0; i<columns.length; i++){
            wscols.push({wpx: columns[i].width});
        }
        for(var i=0; i<data.length; i++){
            var item = {};
            for(var j=0; j<columns.length; j++){
                item[columns[j].header] = data[i][columns[j].binding];
            }
            xlsData.push(item);
        }

        var ws = XLSX.utils.json_to_sheet(xlsData);
        ws['!cols'] = wscols;
        ws['!rows'] = wsrows;

        /* new format */
        var rows = data.length;
        var cols = columns.length;
        var fmt = "#,##0.00";
        /* change cell format of range B2:D4 */
        var range = { s: {r:1, c:0}, e: {r:rows, c:cols-1} };
        for(var R = range.s.r; R <= range.e.r; ++R) {
            for(var C = range.s.c; C <= range.e.c; ++C) {
                var cell = ws[XLSX.utils.encode_cell({r:R,c:C})];

                /*cell.t = 'n';
                console.log(cell.t + ':' + cell.v);

                if(!cell || cell.t != 'n') continue; // only format numeric cells
                cell.z = fmt;*/
          }
        }

        // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다. :: Give and put name to newly made work sheet 
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        // step 4. 엑셀 파일 만들기 :: Create excel file
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        // step 5. 엑셀 파일 내보내기 :: Transmit excel file
        saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), filename);
        $(".icums_loading").css('display', 'none');
        console.log('excel export end');
    },
    excelDownloadStart: function(){
        var c_name = 'fileDownload';
        var value = 'false';
        var exdate=new Date();
        var c_value=escape(value);
        document.cookie=c_name + "=" + c_value + "; path=/";
        $(".icums_loading").css('display', '');

        var timerId = null;
        var downloadCheck = function(){
            if (document.cookie.indexOf("fileDownload=true") != -1) {
                var date = new Date(1000);
                document.cookie = "fileDownload=; expires=" + date.toUTCString() + "; path=/";
                //프로그래스바 OFF :: Progress bar off
                $(".icums_loading").css('display', 'none');
                clearInterval(timerId);
                return;
            }
        }
        timerId = setInterval(downloadCheck, 5000);
    },
    init: function(obj) {
        let self = this;
        self.obj = obj;
        $.each(obj, function (item_name, item) {
            let datatype = $.type(item);
            if (datatype == "number")
                self.obj[item_name] = 0;
            else if (datatype == "string")
                self.obj[item_name] = '';
            else if (datatype == "boolean")
                self.obj[item_name] = false;
            else if (datatype == "array")
                self.obj[item_name] = [];
            else if (datatype == "object")
                self.obj[item_name] = {};
        });
    },
    objectStart : function(frmName) {
      ObjectUtil.oData = $('#'+frmName).serializeObject();
    },
    objectEnd : function(dataObject) {
      Object.assign(dataObject, ObjectUtil.oData);
      ObjectUtil.oData = {};
    },
    oData: {}
}


