var console = window.console || {log:function(){}};
/*****************************************************
* alert Message: Factor value classification is implemented as "|" and can be omitted without factor value !==인자값 구분은 "|"로 구현하며 인자값이 없을 시 생략 가능==!
* title: INFO, WARN, ERR, default(INFO)
******************************************************/
function cf_alert(msg, arg, title, callback) {

    if(arg) {
        var tArg = arg.split("|");
        for(var i=0;i<tArg.length;i++) {
            msg = msg.replace("{"+i+"}",tArg[i]);
        }
    }

    var type = "INFO";
    if(StringUtil.isBlank(title)){
        title = 'Information';
    }else if(title == 'INFO'){
        title = 'Information';
    }else if(title == 'WARN'){
        title = 'Warning';
        type = "WARN";
    }else if(title == 'ERR'){
        title = 'Error';
        type = "ERR";
    }

    if(typeof msg == 'undefined'){
        cf_alert(COMMON_MSG.err_all_00251, "Message"); // Registered {0} does not exist. !==등록된 {0}이(가) 존재하지 않습니다.==!
        return false;
    }
    var popup = $('#messagePopup').dialog({
        modal: true,
        autoOpen: false,
        resizable: false,
        width: 500,
        open: function () {
            if(type == 'WARN'){
                $('.ui-dialog-titlebar').css('background-color', '#F76300');    // old color #ffb920
            }else if(type == 'ERR'){
                $('.ui-dialog-titlebar').css('background-color', '#f95656');
            }else{ // INFO
                $('.ui-dialog-titlebar').css('background-color', '#4691de');
            }
            $('.ui-dialog-titlebar-close').attr('title', '');
        },
        close: function () {
            $('.ui-dialog-titlebar').css('background-color', '#4691de');
        },
        buttons: [
            {text: 'Close', class:'g-button dialog_close', click:function(){
                if(ObjectUtil.hasValue(callback)){
                    callback(true);
                }
                $(this).dialog('close');
            }}
        ]
    });
    $('#messageText').text(msg);
    $('#messagePopup').dialog('option', 'title', title);
    $('#messagePopup').dialog('open');
    $('.ui-dialog button').removeClass('ui-state-default');
}

/*****************************************************
* confirm Message: Factor value classification is implemented as "|" and can be omitted without factor value !==인자값 구분은 "|"로 구현하며 인자값이 없을 시 생략 가능==!
******************************************************/
function cf_confirm(msg, arg, title, callback, cwidth) {

    if(arg) {
        var tArg = arg.split("|");
        for(var i=0;i<tArg.length;i++) {
            msg = msg.replace("{"+i+"}",tArg[i]);
        }
    }
    if(StringUtil.isBlank(title)){
        title = 'Confirm';
    }

    if(typeof msg == 'undefined'){
        cf_alert(COMMON_MSG.err_all_00251, "Message"); // Registered {0} does not exist. !==등록된 {0}이(가) 존재하지 않습니다.==!
        return false;
    }

    $('.ui-dialog-titlebar').css('background-color', '#32a26f');
    
    if(StringUtil.isBlank(cwidth)) cwidth = 400;

    var popup = $('#messagePopup').dialog({
        modal: true,
        autoOpen: false,
        resizable: false,
        width: cwidth,
        // dialogClass: 'no-close',
        open: function () {
            $('.ui-dialog-titlebar').css('background-color', '#32a26f');
            $('.ui-dialog-titlebar-close').attr('title', '');
        },
        close: function () {
            $('.ui-dialog-titlebar').css('background-color', '#32a26f');
        },
        buttons: [
            {text: 'Yes', class:'g-button', click:function(){
                callback(true);
                $(this).dialog('close');
            }},
            {text: 'No', class:'g-button dialog_close', click:function(){
                $(this).dialog('close');
            }}
        ]
    });
    $('#messageText').text(msg);
    $('#messagePopup').dialog('option', 'title', title);
    $('#messagePopup').dialog('open');
    $('.ui-dialog button').removeClass('ui-state-default');
}

/*****************************************************
* Convert form.serialize to json !==form.serialize를 json으로 변환==! : var jsonVo = $('#detailForm').serializeObject();
******************************************************/
$.fn.serializeObject = function () {
   var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]',this);
    $.each($radio,function(){
        if(!o.hasOwnProperty(this.name)){ // unchecked된 checkbox도 값을 전송하기 위한 조치
            if($(this).attr('checkyn')){
                o[this.name] = 'N';
            }
        }
    });
    var $number = $('input[number=true]',this);
    $.each($number,function(){
        o[this.name] = StringUtil.uncomma(o[this.name]); // 숫자형 콤마(,)제거
    });
    return o;
};

/*****************************************************
* loadCodeList: 코드목록을 가져와 sessionStorage에 담음
******************************************************/
function cf_loadCodeList(arrayList) {
    arrayList.forEach((item)=>{

        var cmmCodeList = JSON.parse(sessionStorage.getItem('cmmCodeList'));
        if(ObjectUtil.isEmpty(cmmCodeList)){
            cmmCodeList = [];
        }
        var codeList = ArrayUtil.findBy(cmmCodeList, 'codetype', item.codetype+'_'+item.codegroup);
        var itemList = [];

        if(ObjectUtil.isEmpty(codeList)){
            $.ajax({
                url: "/co/code/selectCodeList.do"
                , datatype: "json"
                , data: {
                    codeType: item.codetype,
                    codeGroup: item.codegroup
                }
            }).then((data)=>{
                var addList = ArrayUtil.findBy(cmmCodeList, 'codetype', item.codetype+'_'+item.codegroup);
                if(ObjectUtil.isEmpty(addList)){
                    cmmCodeList.push({codetype: item.codetype+'_'+item.codegroup, list:data});
                    sessionStorage.setItem('cmmCodeList', JSON.stringify(cmmCodeList));
                }
            });
        }

    });
}

/*****************************************************
* getComCodeList: Return Code Object !==코드 객체 리턴==!
******************************************************/
function cf_getComCodeList(codetype, codegroup) {
    var cmmCodeList = JSON.parse(sessionStorage.getItem('cmmCodeList'));
    if(ObjectUtil.isEmpty(cmmCodeList)){
        cmmCodeList = [];
    }
    var codeList = ArrayUtil.findBy(cmmCodeList, 'codetype', codetype+'_'+codegroup);
    if(ObjectUtil.isEmpty(codeList)){
        $.ajax({
            url: "/co/code/selectCodeList.do"
            , datatype: "json"
            , data: {
                codeType: this.codetype
                , codeGroup: this.codegroup
            }
        }).then((data)=>{
            cf_setCodeList(this.codetype, this.codegroup, data);
            // console.log(data);
            return data;
        });
    }else{
        return codeList.list;
    }
}

/*****************************************************
* getCodeList: Imported code list from sessionStorage :: sessionStorage에서 코드목록을 가져옴
******************************************************/
function cf_getCodeList(codetype, codegroup) {
    var cmmCodeList = JSON.parse(sessionStorage.getItem('cmmCodeList'));
    if(ObjectUtil.isEmpty(cmmCodeList)){
        cmmCodeList = [];
    }
    var codeList = ArrayUtil.findBy(cmmCodeList, 'codetype', codetype+'_'+codegroup);
    if(ObjectUtil.isEmpty(codeList)){
        return [];
    }else{
        return codeList.list;
    }
}

/*****************************************************
* setCodeList: Save code list to sessionStorage !==sessionStorage에 코드목록을 저장==!
******************************************************/
function cf_setCodeList(codetype, codegroup, data) {
    var cmmCodeList = JSON.parse(sessionStorage.getItem('cmmCodeList'));
    if(ObjectUtil.isEmpty(cmmCodeList)){
        cmmCodeList = [];
    }

    var addList = ArrayUtil.findBy(cmmCodeList, 'codetype', codetype+'_'+codegroup);
    if(ObjectUtil.isEmpty(addList)){
        cmmCodeList.push({codetype: codetype+'_'+codegroup, list:data});
        sessionStorage.setItem('cmmCodeList', JSON.stringify(cmmCodeList));
    }
}

/*****************************************************
* getMsgList: Imported message list from sessionStorage !==sessionStorage에서 메세지목록을 가져옴==!
******************************************************/
function cf_getMessage(code) {
    var cmmMsgList = JSON.parse(sessionStorage.getItem('cmmMsgList'));
    if(ObjectUtil.isEmpty(cmmMsgList)){
        cmmMsgList = [];
    }
    var messageVo = ArrayUtil.findBy(cmmMsgList, 'code', code);
    if(ObjectUtil.isEmpty(messageVo)){
        return '';
    }else{
        return messageVo.message;
    }
}

/*****************************************************
* setMsgList: Save the message list to sessionStorage !==sessionStorage에 메세지목록을 저장==!
******************************************************/
function cf_setMsgList(code, message) {
    var cmmMsgList = JSON.parse(sessionStorage.getItem('cmmMsgList'));
    if(ObjectUtil.isEmpty(cmmMsgList)){
        cmmMsgList = [];
    }

    var addList = ArrayUtil.findBy(cmmMsgList, 'code', message);
    if(ObjectUtil.isEmpty(addList)){
        cmmMsgList.push({code: code, message:message});
        sessionStorage.setItem('cmmMsgList', JSON.stringify(cmmMsgList));
    }
}

/*****************************************************
* Initialize the voObject !==vo오브젝트를 초기화==!
******************************************************/
function cf_initVo(object) {
    for(const prop in object){
        if(typeof object[prop] === 'number'){
            object[prop] = 0;
        }else if(typeof object[prop] === 'string'){
            object[prop] = '';
        }else{
            if(Array.isArray(object[prop])){
                object[prop] = [];
            }else{
                object[prop] = {};
            }
        }
    }
    return object;
}

/*****************************************************
* codeinput에서 Invoking getCodeName is different from internal, implemented separately !==호출하는 getCodeName이 internal과 달라 별도 구현함==!
* param1: Specify elementId -> value value !==elementId지정 -> value값==!
******************************************************/
function cf_getCodeName(codeType, groupCd, code, filedCd, filedNm, hsCdLength, isClear, sync, useYn, param1) {
    if (!filedNm) {
        filedNm = filedCd;
    }

 // if (getUnmaskValue(filedCd)) {
    if (code) {
        var dataOptions = {
            parameters: $.param({
                codeType: codeType,
                codeGroup: groupCd,
                code: code, // getUnmaskValue(filedCd),
                param1: getUnmaskValue(param1),
                hsCdLength: hsCdLength,
                useYn: useYn
            }),
            async: sync ? false : true
        };

        ajaxUtil.ajaxJsonRequest('/co/selectCodeName.do', dataOptions, function (data) {
            if (!data.codeName) {
                if (eval(isClear)) {
                    $('#' + filedCd).val('');
                }
                $('#' + filedNm).val('');
            } else {
                $('#' + filedNm).val(data.codeName);

                // 2014.2.5  Modify by Yoonja,Yi : Remove dash character in company tin.
                if (filedCd.indexOf("Tin") >= 0 && $('#' + filedCd).val().indexOf("-") > 0) {
                    $('#' + filedCd).val($('#' + filedCd).val().replace(/-/gi, ''));
                }
            }
        });
    } else {
        $('#' + filedNm).val('');
    }
};

/*****************************************************
* // 1단계용 Company Code get
******************************************************/
function cf_getCodeNameTwo(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    var tinCode = $('#'+arg3).val();
    setBlankName(arg4, arg5);
    getCodeName(arg1, arg2, tinCode, arg4, arg5, arg6, arg7, arg8);
}

/*****************************************************
* 뒤로가기 안되도록 스크립트 설정 ready 안에 cf_backLock(); 넣으면 됨.
******************************************************/
function cf_backLock() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}


/*****************************************************
* // Add a Comma !==콤마 찍기==!
******************************************************/
function cf_comma(obj) {
    obj = obj+"";
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
    var strArr = obj.split('.');
    while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
        //정수 부분에만 콤마 달기
        strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
    }
    if (bExists > -1) {
        //. 소수점 문자열이 발견되지 않을 경우 -1 반환
        obj = strArr[0] + "." + strArr[1];
    } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
        obj = strArr[0];
    }
    return obj;//문자열 반환
}

/*****************************************************
* // Remove a Comma !==콤마 풀기==!
******************************************************/
function cf_uncomma(str) {
    str = str+"";
    str = "" + str.replace(/,/gi, ''); // 콤마 제거
    str = str.replace(/(^\s*)|(\s*$)/g, ""); // trim()공백,문자열 제거
    return (new Number(str));//문자열을 숫자로 반환
}

/*****************************************************
* 테이블에서 소트와 필터를 적용하는 유틸
* 1. 소트만 적용
*    $(document).ready(function() {} 함수 맨 아래에
*    FnUtil.tableDataSort(tableId);
* 2. 소트 및 필터 적용
*    $(document).ready(function() {} 함수 맨 아래에
*    FnUtil.tableDataSortFilter(tableId, searchText, searchBtn);
* 3. Vue 관련 테이블인 경우 추가로 Vue함수 update 에 아래 code를 추가한다.
*    FnUtil.tableDataSortFilterVueUpdate(searchText, searchBtn);
* 4. sample source : Sample > Sort&Filter
******************************************************/
var FnUtil = {
        tableDataSortFilter: function(tableId, searchText, searchBtn) {     // dataSortTable

            $('#'+tableId).addClass('dataSortTable');

            // search button event
            $('#'+searchBtn).prop('disabled', false).removeClass('readonly').click(function() {
                var value = $('#'+searchText).val().toLowerCase().trim();
                $('#'+tableId+' tr').not('tr:first').filter(function() {
                   $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            })

            // search text enter key event
            $('#'+searchText).prop('disabled', false).removeClass('readonly').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    $('#'+searchBtn).trigger("click");
                }
            });

            // reset button event
            $('button.reset').click(function() {
                $('#'+searchText).val('');
                $('#'+searchBtn).trigger("click");
            })

            FnUtil.tableDataSort(tableId);
        },

        tableDataSort: function(tableId) {      // dataSortTable

            $('#'+tableId).addClass('dataSortTable');

            // Sort Code
            $('#'+tableId+' th').each(function (column) {
                $(this).click(function() {
                   if(!$(this).is('.sorting') && !$(this).is('.sorting_asc') && !$(this).is('.sorting_desc')) return;
                   if($(this).is('.sorting_asc')) {
                       $(this).removeClass('sorting_asc');
                       $(this).addClass('sorting_desc');
                       sortdir=-1;
                   } else {
                      $(this).addClass('sorting_asc');
                      $(this).removeClass('sorting_desc');
                      sortdir=1;
                   }
                   $(this).siblings().removeClass('sorting_asc');
                   $(this).siblings().removeClass('sorting_desc');

                   var rec = $('#'+tableId).find('tbody>tr').get();
                   var regEx = new RegExp(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/, "ig");
                   rec.sort(function (a, b) {
                        var val1 = $(a).children('td').eq(column).text().toUpperCase().replace(/[$,. ]/gi, '');
                        var val2 = $(b).children('td').eq(column).text().toUpperCase().replace(/[$,. ]/gi, '');
                        if($.isNumeric(val1) && $.isNumeric(val2)) {
                            val1 *= 1;
                            val2 *= 1;
                        } else {
                            val1 = val1.replace(regEx, '$3/$2/$1');
                            val2 = val2.replace(regEx, '$3/$2/$1');
                        }
                        return (val1<val2)?-sortdir:(val1>val2)?sortdir:0;
                   });
                   $.each(rec, function(index, row) {
                        $('#'+tableId+' tbody').append(row);
                     });
               });
           });
        }, // End tableDataSort function

        tableDataSortFilterVueUpdate: function(searchText, searchBtn) { // error fix of Vue Table click event
            if(StringUtil.isNotBlank($('#'+searchText).val())) {
                $('#'+searchBtn).trigger("click");
            }
        }
}
/*****************************************************
* // Tin Company local Call and Esb Call Module.
******************************************************/
var FnTinCompany = {
        tinData:[],
        headId:'',
        lastId:'',
        addr:'',
        showCompany: function(lastId, headId, codeType , codeGroup, maxRow, param1, addr, tinTypeCdId ) {

            console.log('showCompany list');

            var FORMAT_TIN              = /^[A-Z]{1}[0-9]{9}[0-9A-Z]{1}$/;
            var FORMAT_TRANSITOR_CODE   = /^[A-Z]{2}[0-9A-Z]{9}$/
            var FORMAT_NATIONAL_ID      = /^[A-Z]{3}[0-9]{9}[0-9A-Z]{1}$/;
            var FORMAT_ETC_ONE_ID       = /^[A-Z]{3}[0-9]{6,10}[0-9A-Z]{1,3}$/;

            var tinCode = $('#'+headId).val();

            //console.log( "tinCode ", tinCode );

            var tinMinLength = 11;
            if( tinCode.trim() == '' || tinCode.trim().length < tinMinLength ) {
                alert('The code entered is an invalid code.( input at least ' + tinMinLength +' characters)');
                return;
            }else if( FORMAT_TIN.test( tinCode ) == false
                    && FORMAT_TRANSITOR_CODE.test( tinCode ) == false
                    && FORMAT_NATIONAL_ID.test( tinCode ) == false
                    && FORMAT_ETC_ONE_ID.test( tinCode ) == false
                ){
                alert('The code entered is an invalid code.');
                return;
            }

            // tin type cd
            var tinTypeCd = "";
            // 일단 'GHA'로 시작하면 NID
            // NID 패턴인 AAA-NNNNNNNNN-A, AAA-NNNNNNNN-A
            var bIsTintypeCdElem = false;
            if( StringUtil.isNotBlank( tinTypeCdId ) ){
                bIsTintypeCdElem = true;
                tinTypeCd = $("#" + tinTypeCdId + " option:selected" ).val();
            }

            if( tinCode.indexOf( "GHA") == 0 ){
                tinTypeCd = 'NID';
            }

            if( tinTypeCd == 'NID' && FORMAT_NATIONAL_ID.test( tinCode ) == false ){
                tinTypeCd = 'TIN';
            }

            if( bIsTintypeCdElem ){
                $("#" + tinTypeCdId  ).val( tinTypeCd );
            }

            var strTitle = "Company";
            if( tinTypeCd == 'NID'){
                strTitle = "NID";
            }

            console.log( "tinTypeCd ",  tinTypeCd );

            $('#'+lastId).val('');
            if(StringUtil.isNotBlank(addr)){
                $('#'+addr).val('');
            }

            FnTinCompany.headId = headId;
            FnTinCompany.lastId = lastId;
            FnTinCompany.addr = addr;

            if(maxRow==""){
                maxRow = "200";
            }

            var spinnerTarget = document.getElementById('canvasloader-container');
            spinner = new Spinner(opts).spin(spinnerTarget);
            $('#'+headId+'Btn').prop('disabled', true);
            $('#'+headId+'Btn').css('cursor', 'wait');

            $.ajax({ type : "POST",
                url  : "/co/code/selectCompanyTradingsAutoComplete.do",
                data : {
                    searchValue:  tinCode
                    , codeType : codeType
                    , codeGroup : codeGroup
                    , searchMaxRow : maxRow
                    , param : param1
                    , tinTypeCd : tinTypeCd
                 },
                dataType : "json",
                success : function(data) {
                    //console.log('data : ', data );

                    spinner.stop();
                    $('#'+headId+'Btn').prop('disabled', false);
                    $('#'+headId+'Btn').css('cursor', 'pointer');

                    FnTinCompany.tinData = data.list;

                    if( data.tinTypeCd != '' && tinTypeCd != '' && data.tinTypeCd != tinTypeCd ){
                        tinTypeCd = data.tinTypeCd;
                        if( StringUtil.isNotBlank( tinTypeCdId ) ){
                            $("#" + tinTypeCdId ).val(tinTypeCd);
                        }
                    }

                    if(data.list && data.list.length > 0) {
                        FnTinCompany.printCompanyList(data.list);
                    } else {

                        var alertMsg = 'NID/TIN Not Active.\nPlease contact the system administrator.\nIf it is regarding NID, please contact NIA(https://nia.gov.gh/).';
                        if( tinTypeCd != 'NID'){
                            // alertMsg +='\n* Please enter the TIN/Code Info approved by GRA or customs when entering manually';
                        }

                        alert( alertMsg );
                        /*
                        if( tinTypeCd != 'NID'){
                            $('#'+lastId).prop('readonly', false);
                            $('#'+lastId).removeClass('readonly');
                        }else{
                            $('#'+lastId).prop('readonly', true );
                            $('#'+lastId).addClass('readonly');
                        }
                        */
                        return;
                    }
                },
                error : function(data) {
                    spinner.stop();

                    var alertMsg = 'NID/TIN Not Active.\nPlease contact the system administrator.\nIf it is regarding NID, please contact NIA(https://nia.gov.gh/).';
                    if( tinTypeCd != 'NID'){
                        //alertMsg +='\n* Please enter the TIN/Code and Name approved by GRA or customs when entering manually.';
                    }

                    alert( alertMsg );

                    $('#'+headId+'Btn').prop('disabled', false);
                    $('#'+headId+'Btn').css('cursor', 'pointer');
                    /*
                    if( tinTypeCd != 'NID'){
                        $('#'+lastId).prop('readonly', false);
                        $('#'+lastId).removeClass('readonly');
                    }else{
                        $('#'+lastId).prop('readonly', true );
                        $('#'+lastId).addClass('readonly');
                    }
                    */
                    return;
                }
            });
        },
        hideCompany: function() {
            $('.modal__close-button').trigger('click');
            FnTinCompany.scrollMove(FnTinCompany.headId);
        },
        directChoose: function(seq) {
            console.log(seq);
            $("input:radio[id='company_key"+seq+"']").prop("checked", true);
            FnTinCompany.changeCompany();
        },
        scrollMove: function(divId) {
           var offset = $("#" + divId).offset();
           // $('html, body').animate({scrollTop : offset.top}, 400); 0.4 second
           $(window).scrollTop(offset.top);
        },
        printCompanyList: function(data) {
            $('#companyTbody').children().remove();
            for(var i=0; i<data.length; i++) {
                j=i+1;
                var compaynyInfo = data[i];
                var assessTr = '';
                assessTr =  '<tr onclick="FnTinCompany.directChoose(\''+j+'\')" style="cursor:pointer">';
                assessTr += '<td><input type=\"radio\" name=\"company_key\" id=\"company_key'+j+'\" value=\"'+compaynyInfo.companySeq+'\" /></td>';
                assessTr += "<td>"+compaynyInfo.code+"</td>";
                assessTr += "<td>"+compaynyInfo.codeDescription+"</td>";
                assessTr += "<td>"+compaynyInfo.name+"</td>";
                assessTr += '</tr>';
                $('#companyTbody').append(assessTr);
            }
            $('input#company_key1').prop('checked', true);
            $('#'+FnTinCompany.headId).madalPop({ target: "#fwObjectCompanyModal", width: "800", height: "500" });

        },
        changeCompany: function() {
            var checkedValue = $(':radio[name="company_key"]:checked').val();
            var data = FnTinCompany.tinData;
            console.log(data);
            for(var i=0; i<data.length; i++) {
                j=i+1;
                var compaynyInfo = data[i];
                if(checkedValue == compaynyInfo.companySeq) {
                    $('#'+FnTinCompany.headId).val(compaynyInfo.code);
                    $('#'+FnTinCompany.lastId).val(compaynyInfo.name);
                    if(StringUtil.isNotEmpty(FnTinCompany.addr)) {
                        $('#'+FnTinCompany.addr).val(compaynyInfo.codeEtc);
                    }
                    $('#'+FnTinCompany.lastId).prop('readonly', true);
                    $('#'+FnTinCompany.lastId).addClass('readonly');
                }
            }
            FnTinCompany.hideCompany();
        }
   };

/*****************************************************
* Session Timer Script
******************************************************/
var CmmTimer = {
        initMinute : 30,
        remainSecond : 1800,
        toastrOption : {
                timeOut: 15000,
                extendedTimeOut: 0,
                closeButton: true,
                onHidden: function () {
                    if(CmmTimer.remainSecond <= 0) {
                        location.href = "/login/actionLogout.do";
                    }
                }
        },
        playSound : function() {
            var audio = new Audio('/plugins/audio/chime.ogg');
            var promise = audio.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                    }).catch(error =>
                    {
                        console.log('sound play error');
                    });
            }
        },
        initTime : function(min) {
            CmmTimer.initMinute = min;
            CmmTimer.remainSecond = min*60;
        },
        setTimer : function() {
            remainMinute_ = parseInt(CmmTimer.remainSecond/60);
            remainSecond_ = CmmTimer.remainSecond%60;
            if(CmmTimer.remainSecond > 0) {
                $('#sessionTimer').empty().append(CmmTimer.Lpad(remainMinute_,2) + ':' + CmmTimer.Lpad(remainSecond_,2));
                CmmTimer.remainSecond--;
                setTimeout('CmmTimer.setTimer()', 1000);
                if(CmmTimer.remainSecond == 600) {
                    toastr.warning('If there is no work, it will log out after 10 minutes.', 'Session Information', CmmTimer.toastrOption);
                    CmmTimer.playSound();
                }
                if(CmmTimer.remainSecond == 1200 || CmmTimer.remainSecond == 2400) {
                    $.ajax({
                        url: "/co/selectSessionTimerReset.do",
                        data: '',
                        method: "POST",
                        async: true,
                        success : function(data) {
                            console.log('Session Check Time Log : ' + CmmTimer.remainSecond);
                        },
                        error: function(error){
                            toastr.warning('Failed to extend session time. Login again.', 'Session Information', CmmTimer.toastrOption);
                        }
                    });
                }
            } else {
                $('#sessionTimer').empty().append('00:00');
                $.ajax({
                    url: "/co/selectSessionTimerLogout.do",
                    data: '',
                    method: "POST",
                    async: true,
                    success : function(data) {
                        // success!
                    },
                    error: function(error) {
                        console.log('session logout error!');
                    },
                    complete : function() {
                        var newOption = $.extend(CmmTimer.toastrOption, {timeOut:0});
                        toastr.warning('The session was disconnected after 30 minutes of inactivity.<br/> Click to go to the login page.', 'Session Information', newOption);
                        CmmTimer.playSound();
                    }
                });
            }
        },
        Lpad : function(str, len) {
            str += '';
            while(str.length<len) {
                str = '0'+str;
            }
            return str;
        },
        resetTimer : function() {
            if(CmmTimer.remainSecond <= 0) {
                toastr.error('The session has already been disconnected.', 'Session Information', CmmTimer.toastrOption);
            } else {
                $.ajax({
                    url: "/co/selectSessionTimerReset.do",
                    data: '',
                    method: "POST",
                    async: true,
                    success : function(data) {
                        CmmTimer.initTime(60);
                    },
                    error: function(error){
                        toastr.warning('Failed to extend session time.', 'Session Information', CmmTimer.toastrOption);
                    }
                });
            }
        }
};

/*****************************************************
* Company Change Function
******************************************************/
   var FnCompany = {
        showCompany: function() {
            $.ajax({ type : "POST",
                url  : "/login/companyList.do",
                data : '',
                dataType : "JSON",
                success : function(data) {
                    if(data.success == 'fail') {
                     alert(data.message);
                     return;
                    } else {
                        if(data.companyList.length > 0) {
                            FnCompany.printCompanyList(data.companyList);
                        } else {
                            alert('There is no changeable company.');
                            return;
                        }
                    }
                },
                error : function(data) {
                    alert(data.message);
                }
            });
        },
        hideCompany: function() {
            $('#company-modal').hide();
        },
        printCompanyList: function(data) {
            $('#companyTbody').children().remove();
            for(var i=0; i<data.length; i++) {
                j=i+1;
                var compaynyInfo = data[i];
                var assessTr = '';
                assessTr =  '<tr>';
                assessTr += '<td><input type=\"radio\" name=\"company_key\" id=\"company_key'+j+'\" value=\"'+compaynyInfo.companyCd+'\" /></td>';
                assessTr += "<td>"+compaynyInfo.companyCd+"</td>";
                assessTr += "<td>"+compaynyInfo.tin+"</td>";
                assessTr += "<td>"+compaynyInfo.companyTypeCd+"</td>";
                assessTr += "<td>"+compaynyInfo.companyNm+"</td>";
                assessTr += '</tr>';
                $('#companyTbody').append(assessTr);
            }
            $('input#company_key1').prop('checked', true);
            var obj = $("#company-modal").offset();
            // #div의 현재 위치
            console.log("left: " + obj.left + "px, top: " + obj.top + "px");
            // $("#company-modal").css("left", obj.left - 300);
            // $("#company-modal").css("left", obj.left - 0);
            $('#company-modal').show();
            var obj2 = $("#company-modal").offset();
            // #div의 현재 위치
            console.log("left: " + obj2.left + "px, top: " + obj2.top + "px");
            // $("#company-modal").css("left", obj.left - 300);
        },
        changeCompany: function() {
            var checkedValue = $(':radio[name="company_key"]:checked').val();
            console.log(checkedValue);
            $.ajax({ type : "POST",
                url  : "/login/changeCompany.do",
                data : $("#companyForm").serialize(),
                dataType : "JSON",
                success : function(data) {
                    if(data.success == 'fail') {
                     alert(data.message);
                     return;
                    } else {
                     console.log(data);
                     location.reload(true);
                    }
                },
                error : function(data) {
                    alert(data.message);
                }
            });
        }
   };
/*****************************************************
* Quick Popup Menu Layer Function
******************************************************/
var FnQuick = {
      show: function() {
          // console.log('showQuick');
          var offset = $("#fwQuick").offset();
          $("#fwQuick-modal").css({
               "top" : offset.top+32,
               "left" : offset.left-300
            });
          $('#fwQuick-modal').show();
      },
      hide: function() {
          // console.log('hideCompany');
          $(".quick_menu_tracking").hide();
          $(".quick_menu_cargo").hide();
          $(".quick_menu_clearance").hide();
          $(".quick_menu_code").hide();
          $(".quick_menu_information").hide();
          $(".quick_menu_etc").hide();
          FnQuick.allMenuHide(0);
          $('#fwQuick-modal').hide();
      },
      toggle: function() {
          var offset = $("#fwQuick").offset();
          $("#fwQuick-modal").css({
              "top" : offset.top+32,
              "left" : offset.left-300
           });
          $('#fwQuick-modal').toggle();
      },
      showMenu: function(menuNo) {
        if(menuNo == '1') {
            FnQuick.allMenuHide(1);
            $(".quick_menu_tracking").toggle();
            if($("#quick_tracking").hasClass("on") === true) {
                $("#quick_tracking").removeClass('on');
                $("#quick_tracking").addClass('off');
            } else {
                $("#quick_tracking").removeClass('off');
                $("#quick_tracking").addClass('on');
            }
        } else if(menuNo == '2') {
            FnQuick.allMenuHide(2);
            $(".quick_menu_cargo").toggle();
            if($("#quick_cargo").hasClass("on") === true) {
                $("#quick_cargo").removeClass('on');
                $("#quick_cargo").addClass('off');
            } else {
                $("#quick_cargo").removeClass('off');
                $("#quick_cargo").addClass('on');
            }
        } else if(menuNo == '3') {
            FnQuick.allMenuHide(3);
            $(".quick_menu_clearance").toggle();
            if($("#quick_clearance").hasClass("on") === true) {
                $("#quick_clearance").removeClass('on');
                $("#quick_clearance").addClass('off');
            } else {
                $("#quick_clearance").removeClass('off');
                $("#quick_clearance").addClass('on');
            }
        } else if(menuNo == '4') {
            FnQuick.allMenuHide(4);
            $(".quick_menu_code").toggle();
            if($("#quick_code").hasClass("on") === true) {
                $("#quick_code").removeClass('on');
                $("#quick_code").addClass('off');
            } else {
                $("#quick_code").removeClass('off');
                $("#quick_code").addClass('on');
            }
        } else if(menuNo == '5') {
            FnQuick.allMenuHide(5);
            $(".quick_menu_information").toggle();
            if($("#quick_information").hasClass("on") === true) {
                $("#quick_information").removeClass('on');
                $("#quick_information").addClass('off');
            } else {
                $("#quick_information").removeClass('off');
                $("#quick_information").addClass('on');
            }
        } else if(menuNo == '6') {
            FnQuick.allMenuHide(6);
            $(".quick_menu_etc").toggle();
            if($("#quick_etc").hasClass("on") === true) {
                $("#quick_etc").removeClass('on');
                $("#quick_etc").addClass('off');
            } else {
                $("#quick_etc").removeClass('off');
                $("#quick_etc").addClass('on');
            }
        } else {
            console.log('other menuNo : ' + menuNo);
        }
      },
      allMenuHide: function(menuNo) {
          if( menuNo != '1') {
            $(".quick_menu_tracking").hide();
            $("#quick_tracking").removeClass('on');
            $("#quick_tracking").addClass('off');
          }
          if( menuNo != '2') {
            $(".quick_menu_cargo").hide();
            $("#quick_cargo").removeClass('on');
            $("#quick_cargo").addClass('off');
          }
          if( menuNo != '3') {
            $(".quick_menu_clearance").hide();
            $("#quick_clearance").removeClass('on');
            $("#quick_clearance").addClass('off');
          }
          if( menuNo != '4') {
            $(".quick_menu_code").hide();
            $("#quick_code").removeClass('on');
            $("#quick_code").addClass('off');
          }
          if( menuNo != '5') {
            $(".quick_menu_information").hide();
            $("#quick_information").removeClass('on');
            $("#quick_information").addClass('off');
          }
          if( menuNo != '6') {
            $(".quick_menu_etc").hide();
            $("#quick_etc").removeClass('on');
            $("#quick_etc").addClass('off');
          }
      }
};
$(document).mouseup(function (e){
    var container = $('#fwQuick-modal');
    if( container.has(e.target).length === 0){
      container.css('display','none');
    }
    var container2 = $('#MenuWrap');
    var container3 = $('#MenuButton');
    var container4 = $('#toast-container');
    if( container2.has(e.target).length === 0 && container3.has(e.target).length === 0 && container4.has(e.target).length === 0){
      if($('#MenuWrap').hasClass( "is-active" )){
        $('#MenuButton').trigger("click");
      }
    }
});
/*****************************************************
* Quick goCargoTrackingInfoPopup Function
******************************************************/
function goCargoTrackingInfoPopupNormal(){

    var url = '/cm/ct/cargoTracking/popup/selectCargoTrackingInfo.do';

    $(this).checkOpenWindow({
    resizable : "yes",
    width : "1000",
    height : "800",
    url : url,
    name : "Cargo Tracking"
    })
}

function goCargoTrackingInfoTwoPopup(){

    var trackingOption = $(':radio[name="trackingOption"]:checked').val();
    var paramValue = $('#cargNo').val().trim();
    var params = {};

    var toastrOption = {timeOut: 5000, extendedTimeOut: 0, closeButton: true };
    if(paramValue.length === 0) {
        toastr.info('Please enter a CRN or B/L or C/N number.', 'Message Information', toastrOption);
        $('#cargNo').val('');
        $('#cargNo').focus();
        return;
    }

    if(trackingOption === 'BL') {
        params = $.param({ 'searchType' : trackingOption, 'searchBlNo' : paramValue });
    } else if(trackingOption === 'CONTAINER') {
        params = $.param({ 'searchType' : trackingOption, 'searchContainerNo' : paramValue });
    } else if(trackingOption === 'BOE') {
        params = $.param({ 'searchType' : trackingOption, 'searchBoeNo' : paramValue });
    } else if(trackingOption === 'DO') {
        params = $.param({ 'searchType' : trackingOption, 'searchDoNo' : paramValue });
    } else {
        var pValue =  paramValue.split('-');
        minusCount = (paramValue.match(/-/g) || []).length;
        if ( minusCount === 2 ) {
            searchMrn = pValue[0];
            searchMsn = pValue[1];
            searchHsn = pValue[2];
        } else if ( minusCount === 1 ) {
            searchMrn = pValue[0];
            searchMsn = pValue[1];
            searchHsn = '';
        } else {
            if(paramValue.length == 18) {
                searchMrn = paramValue.substring(0, 11);
                searchMsn = paramValue.substring(11, 15);
                searchHsn = paramValue.substring(15);
            } else if(paramValue.length == 15) {
                searchMrn = paramValue.substring(0, 11);
                searchMsn = paramValue.substring(11);
                searchHsn = '';
            } else {
                searchMrn = paramValue;
                searchMsn = '';
                searchHsn = '';
            }
        }
        params = $.param({ 'searchType' : trackingOption, 'searchMrn' : searchMrn, 'searchMsn' : searchMsn, 'searchHsn' : searchHsn });
    }

    var url = '/cm/ct/cargoTracking/popup/selectCargoTrackingInfo.do?' + params;

    $(this).checkOpenWindow({
    resizable : "yes",
    width : "1000",
    height : "800",
    url : url,
    name : "Cargo Tracking"
    })
}

/*****************************************************
* Quick goSeaImportManifestStatusPopup Function
******************************************************/
function goSeaImportManifestStatusPopup(manifestNo){
    var params = $.param({
        mrn : manifestNo
    });

    var url = '/cm/dl/seaDischarge/list/popup/selectSeaImportManifestStatusPopup.do?' + params;

    $(this).checkOpenWindow({
    resizable : "yes",
    width : "1200",
    height : "800",
    url : url,
    name : "Manifest Status"
    })
}
/*****************************************************
* FavoriteMenu Function
******************************************************/
var maxFavoriteMenuCount = 10;

var favorite = {

    add: function() {
        var tMenuId = $("#getMenuID").val();
        // var inputString = prompt('Enter display name in your Favorite Menu', $(".fo").html().trim());
        var inputString = $(".fo").html().trim();
        if(inputString == null) return;
        if(inputString.length > 40) {
            alert('Display name cannot exceed 40Byte');
            return;
        }
        var toastrOption = {
                timeOut: 1000,
                extendedTimeOut: 0,
                closeButton: true,
                onHidden: function () {
                    form.action = "/um/pt/favorite/favoriteMenuAdd.do";
                    form.submit();
                }
        }
        $("#iMenuId").val(tMenuId);
        $("#returnUrl").val(location.href);
        $("#menuNameOpt").val(inputString);

        var passValidation = "Y";
        $.ajax({
            type : "POST",
            url  : "/um/pt/favorite/checkFavoriteMenuDuplication.do",
            data : {"iMenuId" : tMenuId, "menuNameOpt" : inputString},
            dataType : "JSON",
            async : false,
            success : function(data) {
                if(data.favoriteMenuCount >= maxFavoriteMenuCount) {
                    passValidation = "N";
                    alert("Can't exceed 10 Favorite Menu");
                    return;
                }
                if(data.MENU_ID_DUP_CHECK == 'Y') {
                    passValidation = "N";
                    alert("The menu already exists");
                    return;
                }
                if(data.MENU_NM_DUP_CHECK == 'Y') {
                    passValidation = "N";
                    alert("Same display name already exists");
                    return;
                }
            }
        });
        if(passValidation == 'N') return;

        var form = document.forms["requestMenuId"];
        toastr.info('Register the current menu to favorites.', 'Message Information', toastrOption);
    },

    edit: function(menuId, menuName) {
        var inputString = prompt('Enter display name in your Favorite Menu to modify', menuName);
        if(inputString == null) return;
        if(inputString.length > 40) {
            alert('Display name cannot exceed 40Byte');
            return;
        }
        $("#iMenuId").val(menuId);
        $("#returnUrl").val(location.href);
        $("#menuNameOpt").val(inputString);

        var passValidation = "Y";
        $.ajax({
            type : "POST",
            url  : "/um/pt/favorite/checkFavoriteMenuDuplication.do",
            data : {"iMenuId" : menuId, "menuNameOpt" : inputString},
            dataType : "JSON",
            async : false,
            success : function(data) {
                if(data.MENU_NM_DUP_CHECK == 'Y') {
                    passValidation = "N";
                    alert("Same display name already exists");
                    return;
                }
            }
        });
        if(passValidation == 'N') return;

        var form = document.forms["requestMenuId"];
        form.action = "/um/pt/favorite/favoriteMenuUpdate.do";
        form.submit();
    },

    deleteFavorite: function(menuId, menuName) {
        // if(!confirm('Delete this favorite menu? (' + menuName + ')')) return;

        var toastrOption = {
                timeOut: 1500,
                extendedTimeOut: 0,
                closeButton: true,
                onHidden: function () {
                    form.action = "/um/pt/favorite/favoriteMenuDelete.do";
                    form.submit();
                }
        }
        $("#iMenuId").val(menuId);
        $("#returnUrl").val(location.href);
        $("#menuNameOpt").val(menuName);
        var form = document.forms["requestMenuId"];
        toastr.info('The Favorites menu (' + menuName + ') has been removed.', 'Message Information', toastrOption);
    }

}

/*****************************************************
* File Download
******************************************************/

function cf_fileDownload(fileId){
    var sendData = {documentId: fileId}
    var exportUrl = contextRoot + '/cmm/fileDownload.do';
    var spinnerTarget = document.getElementById('canvasloader-container');
    // spinner = new Spinner(opts).spin(spinnerTarget);
    // var spinnerTarget = this.$el;
    $.fileDownload(exportUrl, {
        // httpMethod: 'POST',
        data: sendData,
        prepareCallback: function (url) {
            spinner = new Spinner(opts).spin(spinnerTarget);
        },
        successCallback: function (url) {
            spinner.stop();
        },
        failCallback: function (responseHtml, url) {
            spinner.stop();
            cf_alert('파일생성이 실패하였습니다.');
        }
    });
}

/*****************************************************
* select Side Menu Tab
******************************************************/

function selectMenuTab(tab, spinner_yn) {
    if(spinner_yn != 'N') {
        $(".icums_loading").css('display', '');
    }
    if(tab == 1) {
        $.cookie('currentMenuTab', 1, { expires : 1, path : '/', secure : false });
    } else {
        $.cookie('currentMenuTab', 2, { expires : 1, path : '/', secure : false });
    }
}

/*****************************************************
* Quick Menu Popup & Main Popup function
******************************************************/
/**
 * goArrivalVessel
 */
function goArrivalVessel() {

    var url = '/cm/mf/seaImport/expectedArrivals/popup/selectExpectedArrivalsList.do?decorator=popup&popupYn=Y';

    $(this).checkOpenWindow({
        resizable: "yes",
        scrollbars: "yes",
        width: "1320",
        height: "700",
        url: url,
        name: "Vessel Arrival"
    })
}

/**
 * goManifestStatus
 */
function goManifestStatus() {

    var url = '/cm/dl/seaDischarge/list/popup/selectSeaImportManifestStatusPopup.do?decorator=popup&mrn=';

    $(this).checkOpenWindow({
        resizable: "yes",
        width: "1320",
        height: "700",
        url: url,
        name: "Sea Manifest Status" // "Manifest Status"
    })
}

/**
 * cargo dashboard
 */
function goCargoDashBoard() {

    var url = '/co/dashboard/popup/selectCargoDashBoardInfo.do';

    $(this).checkOpenWindow({
        resizable: "yes",
        width: "1320",
        height: "700",
        url: url,
        name: "Vessel Schedule" // "Cargo DashBoard"
    })
}

function goBoePopup(){
    var params = $.param({
        MENU_ID : "II"
        , decorator : "popupExt"
        });

    var url = '/cl/dl/declaration/tracking/selectDeclarationTrackingList.do?decorator=popup&'+params;

    $(this).checkOpenWindow({
    resizable : "yes",
    width : "1000",
    height : "800",
    url : url,
    name : "BOE Status"
    })
   }

function goBoeMenu(){
    var params = $.param({
        MENU_ID : "CLM01S03V09"
        });

    document.location.href = '/cl/dl/declaration/tracking/selectDeclarationTrackingForMofList.do?'+params;
}

function goBoeMenu2(){
    var params = $.param({
        MENU_ID : "CLM01S03V10"
        });

    document.location.href = '/cl/dl/declaration/tracking/selectDeclarationTrackingForNacocList.do?'+params;
}

function goBoeMenu3(){
    var params = $.param({
        MENU_ID : "CLM01S03V11"
        });

    document.location.href = '/cl/dl/declaration/tracking/selectDeclarationTrackingForGlnsList.do?'+params;
}

/**
 * DW popup
 */
function goDWPopup(url){
    $(this).checkOpenWindow({
    resizable : "yes",
    width : "1320",
    height : "800",
    url : url,
    name : "DW Service"
    });
}

/**
 * TabPopup popup
 */
function goTabPopup(url, name, cwidth, cheight){
    if(StringUtil.isBlank(name)){
        name = 'TAB Popup';
    }
    if(!StringUtil.isBlank(cwidth) && !StringUtil.isBlank(cheight)){
	   $(this).checkOpenWindow({
	        resizable : "yes",
	        width : cwidth,
	        height : cheight,
	        url : url,
	        name : name
	    });
	} else {
	    $(this).checkOpenWindow({
	        resizable : "yes",
	        width : "1320",
	        height : "800",
	        url : url,
	        name : name
	    });
    }
}
/*****************************************
* Notification All Confirm update.
******************************************/
function allNotificationConfirm() {
    cf_confirm("Confirm Submit?", '', '', function() {
        var dataOptions = {
            parameters : ''
        };
        ajaxUtil.ajaxJsonRequest('/co/notifi/updateAllNotification.do', dataOptions, function(data) {
            console.log(data);
            if (data.errorMessage) {
                cf_alert(data.errorMessage);
            } else if (data.resultMessage) {
                cf_alert(data.resultMessage);
            } else if (data.validateError) {
                addValidateContent(data);
            } else {
                $('.noti__number').html('0');
                cf_alert("Successfully submitted.");
            }
        });
    });
}

/*****************************************************
 * Right Side Notification
 ******************************************************/
 function notificationButtonEvent() {
    var toastrOption = {
        timeOut: 0,
        extendedTimeOut: 0,
        closeButton: false,
        positionClass: 'toast-custom-two'
    }

     const menuActive = (elButton, elMenu) => {
       const button = elButton;
       const menu = elMenu;

       button.addEventListener('click', () => {
            var noti_count = $('.noti__number').text().trim();
            if(noti_count > 0) {
                button.classList.toggle('is-active');
                menu.classList.toggle('is-active');
                if($('#MenuWrap').hasClass( "is-active" )){
                    var dataOptions = {
                        parameters : {'notifiStatusCd':'B'}
                    };
                    ajaxUtil.ajaxJsonRequest('/co/notifi/selectNotificationListData.do', dataOptions, function(data) {
                        // console.log(data);
                        if (data.errorMessage) {
                            cf_alert(data.errorMessage);
                        } else if (data.resultMessage) {
                            cf_alert(data.resultMessage);
                        } else if (data.validateError) {
                            addValidateContent(data);
                        } else {
                            setTimeout(function() {
                                if(data.itemJList.length > 0) {
                                    let itemContents = '';
                                    $.each(data.itemJList, function(index, item) {
                                        itemContents = item.noticeCn.replace(/\n/gi,"<br/>");
                                        toastr.success(itemContents+'<br/><span style="width:240px;text-align:right">'+item.firstRegisterDtts+'</span>', item.businessNm, toastrOption);
                                    });
                                } else {
                                    toastr.warning('There are no notifications.', 'Notification Message', toastrOption);
                                }
                            }, 1500);
                        }
                    });
                } else {
                    $('#toast-container').hide();
                    toastr.clear();
                }
            } else {
                toastr.warning('There are no notifications.', 'Notification Message', {timeOut: 1500, extendedTimeOut: 0, closeButton: true, positionClass: 'toast-custom-two'});
            }
       });
     };
     menuActive(document.getElementById('MenuButton'), document.getElementById('MenuWrap'));
 }

/*****************************************************
 * cmm TextArea Bytes check
 ******************************************************/
function onTextAreaBytes(el, maxLength){
    setTimeout(function() {
    var len = $("#"+el).val().length;
    if(len > maxLength){
        $("#"+el).val($("#"+el).val().substr(0, maxLength));
    }
    $("#byteChk-"+el).text($("#"+el).val().length + ' byte / '+maxLength+' byte');
    }, 10);
};
/*****************************************************
 * Screen width resize event!
 ******************************************************/
function cf_resize() {
    setTimeout(function() { $(window).trigger('resize'); }, 100);
}

/*****************************************************
 * SlideUpDown of button
 ******************************************************/
function cf_slideUpDown(obj, j_id) {
    $(obj).toggleClass('v-down');
    $(obj).toggleClass('v-up');
    if( $(obj).html() == 'Slide Up' ) {
      $(obj).html('Slide Down');
    } else {
      $(obj).html('Slide Up');
    }
    $('#'+j_id).slideToggle();
}

/*****************************************************
 * Multi Login Function 1
 ******************************************************/
function showMultiLoginList() {
    $('#multiLogin-modal').show();
}

/*****************************************************
 * Multi Login Function 2
 ******************************************************/
function multiLoginChange() {
try {
        var checkedValue = $(':radio[name="user_key"]:checked').val();
        $.ajax({ type : "POST",
            url  : "/login/changeOtherUser.do",
            data : $("#multiUserForm").serialize(),
            dataType : "JSON",
            success : function(data) {
                if(data.success == 'fail') {
                 alert(data.message);
                 return;
                } else {
                 // console.log(data);
                 location.reload(true);
                }
            },
            error : function(data) {
                alert(data.message);
            }
        });
    } catch (e) {
        console.log('multi login error');
    }
}