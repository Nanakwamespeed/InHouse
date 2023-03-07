/**
 * DateUtil
 *
 * Seo Yongki
 */
var DateUtil = {

	dateformat: 'DD/MM/YYYY',

	/**
	 * 현재날짜를 format형식(YYYY/MM/DD)으로 가져옴 :: Upload the current date with format (YYYY/MM/DD)
	 *
	 * DateUtil.getToday() -> YYYY/MM/DD
	 */
	getToday: function() {
		return this.formatDate(new Date());
    },

    /**
	 * 현재시간을 string으로 가져옴. :: Upload the current time with string
	 *
	 * 12s, 12h, 24s, 24h(defulat)
	 */
    getTime: function(timeTp) {
    	var rtnTime = '';
        if(timeTp == '12s'){
          rtnTime = this.formatDate(new Date(), 'hh:mm:ss a').toUpperCase();
        }else if(timeTp == '12h'){
          rtnTime = this.formatDate(new Date(), 'hh:mm a').toUpperCase();
        }else if(timeTp == '24s'){
          rtnTime = this.formatDate(new Date(), 'HH:mm:ss');
        }else{ // 24h
          rtnTime = this.formatDate(new Date(), 'HH:mm');
        }
        return rtnTime;
    },

    /**
	 * 현재일시를 string으로 가져옴. :: Upload the current date with string
	 *
	 * 12s, 12h, 24s, 24h(defulat)
	 */
    getDateTime: function(timeTp) {
    	var rtnDateTime = '';
        if(timeTp == '12s'){
          rtnDateTime = this.formatDate(new Date(), this.dateformat + ' hh:mm:ss a').toUpperCase();
        }else if(timeTp == '12h'){
          rtnDateTime = this.formatDate(new Date(), this.dateformat + ' hh:mm a').toUpperCase();
        }else if(timeTp == '24s'){
          rtnDateTime = this.formatDate(new Date(), this.dateformat + ' HH:mm:ss');
        }else{ // 24h
          rtnDateTime = this.formatDate(new Date(), this.dateformat + ' HH:mm');
        }
        return rtnDateTime;
    },

    /**
	 * 문자형 날짜값을 Date형으로 변환 :: Change the date value of characters to format (YYYY/MM/DD)
	 *
	 * DateUtil.stringToDate('2019/01/01')
	 */
    stringToDate: function(inDate, timeTp) {
    	var momentValue;
        if(StringUtil.isBlank(timeTp)){
          momentValue = moment(inDate, this.dateformat);
        }else if(timeTp == '24s'){
          momentValue = moment(inDate, this.dateformat + ' HH:mm:ss');
        }else{ // 24h
          momentValue = moment(inDate, this.dateformat + ' HH:mm');
        }
        return momentValue.toDate();
    },

    /**
	 * Date add days
	 *
	 * DateUtil.addDays(new Date(), 1)
	 */
    addDays: function(inDate, addDays) {
    	const momentValue = moment(inDate);
        return momentValue.add(addDays, 'days').toDate();
    },

    /**
	 * Date add Year
	 *
	 * DateUtil.addYear(new Date(), 1)
	 */
    addYear: function(inDate, addYear) {
    	const momentValue = moment(inDate);
        return momentValue.add(addYear, 'years').toDate();
    },

    /**
	 * Date add Months
	 *
	 * DateUtil.addMonths(new Date(), 1)
	 */
    addMonths: function(inDate, addMonths) {
    	const momentValue = moment(inDate);
        return momentValue.add(addMonths, 'months').toDate();
    },

    /**
	 * Date add Seconds
	 *
	 * DateUtil.addSeconds(new Date(), 1)
	 */
    addSeconds: function(inDate, addSeconds) {
    	const momentValue = moment(inDate);
        return momentValue.add(addSeconds, 'seconds').toDate();
    },

    /**
	 * 날짜를 format형식(YYYY/MM/DD)으로 변환 :: Change the date to date with format (YYYY/MM/DD)
	 *
	 * DateUtil.formatDate(new Date()) -> YYYY/MM/DD
	 */
    formatDate: function(inDate, format) {
    	const momentValue = moment(inDate);
        if(StringUtil.isBlank(format)){
          format = this.dateformat;
        }
        return momentValue.format(format);
    },

    /**
	 * DB에서 조회된 String형식(YYYYMMDD)의 날짜를 YYYY/MM/DD 형식으로 변환 :: After searching string type date (YYYY/MM/DD) And change the format to YYYY/MM/DD.
	 *
	 * DateUtil.formatStringDate('20171029') -> 2017/10/29
	 */
    formatStringDate: function(inDate, format) {
    	if(StringUtil.isBlank(inDate)){
    		return '';
    	}
    	const momentValue = moment(inDate, 'YYYYMMDD');
    	if(StringUtil.isBlank(format)){
    	    format = this.dateformat;
    	}
    	return momentValue.format(format);
    },

    /**
	 * Dateinput컴포넌트에서 생성된 YYYY/MM/DD 형식의 날짜를 String형식(YYYYMMDD)의 날짜로 변환 :: After component creation of YYYY/MM/DD type date, change the date to YYYY/MM/DD type.
	 *
	 * DateUtil.formatDateString('2017/10/29') -> 20171029
	 */
    formatDateString: function(inDate, format) {
    	if(StringUtil.isBlank(inDate)){
	      return '';
	    }
	    const momentValue = moment(inDate, this.dateformat);
	    if(StringUtil.isBlank(format)){
	      format = 'YYYYMMDD';
	    }
	    return momentValue.format(format);
    },

    /**
	 * 입력날짜(YYYY/MM/DD)가 유효한 날짜인지 체크 :: Check whether entered date (YYYY/MM/DD) is valid
	 *
	 * DateUtil.isValid('2018/02/30') -> false
	 */
    isValid: function(chkDate, format) {
    	if(StringUtil.isBlank(format)){
    		format = this.dateformat;
  	    }
    	if(StringUtil.isBlank(chkDate)){
    		return true;
    	}
    	const isValid = moment(chkDate, format, true).isValid();
        return isValid;
    },

	/**
	 * bootstrap.Daterangepicker Locale 설정 :: Settings
	 */
    getDateLocale: function(locale) {
    	var rtnObj;
        if(locale == 'ko-KR'){
          rtnObj = {
            format : 'YYYY/MM/DD',
            applyLabel : '적용',	// Apply
            cancelLabel : '취소',	// Cancel
            fromLabel: 'from',
            toLabel: 'to',
            customRangeLabel: '범위지정',	// Set the range
            daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],	// Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	// Month, 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
          };
        }else{
          rtnObj = {
            format : 'YYYY/MM/DD',
            cancelLabel: 'Clear'
          };
        }
        return rtnObj;
	},

	/**
	 * bootstrap.Daterangepicker Locale 설정 :: Settings
	 */
	getDateRange: function(locale) {
		var rtnObj;
	    if(locale == 'ko-KR'){
	      rtnObj = {
	        '오늘'     : [moment(), moment()],
	        '어제'     : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	        '지난7일'  : [moment().subtract(6, 'days'), moment()],
	        '지난30일' : [moment().subtract(29, 'days'), moment()],
	        '이번달'   : [moment().startOf('month'), moment().endOf('month')],
	        '지난달'   : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	      };
	    }else{
	      rtnObj = {
	        'Today'       : [moment(), moment()],
	        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
	        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
	        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	      };
	    }
	    return rtnObj;
	}
}

/*****************************************************
* dateRange 컴포넌트 설정 :: Set component
* - id : dateRange Item ID
* - opens : 달력 드롭다운이 열리는 방향(left, right) :: Direction to upload calender dropdown
******************************************************/
function cf_dateRange(id, opens) {
	if(StringUtil.isBlank(opens)){
		opens = 'left';
	}
	$(id).daterangepicker({
		// autoUpdateInput: false,
		locale: DateUtil.getDateLocale('ko-KR'),
		ranges: DateUtil.getDateRange('ko-KR'),
		opens: opens
	});
}

/*****************************************************
* dateRange 값 설정 :: Set value
* - id : dateRange Item ID
* - opens : 달력 드롭다운이 열리는 방향(left, right) :: Direction to upload calender dropdown
******************************************************/
function cf_dateRangeSet(id, range) {
	if(StringUtil.isBlank(range)){
		range = 'today';
	}
	var dateFormat = this.dateformat;
	var toDate = moment().format(dateFormat);
	var fromDate = moment().format(dateFormat);
	switch(range){
	case '1': fromDate = moment().subtract(1, 'days').format(dateFormat); break;
	case '7': fromDate = moment().subtract(6, 'days').format(dateFormat); break;
	case '30': fromDate = moment().subtract(29, 'days').format(dateFormat); break;
	default: break;
	}

	$(id).val(fromDate + ' - ' + toDate);
}

/*****************************************************
* dateRange Value
* - id : dateRange Item ID
******************************************************/
function cf_dateRangeGet(id) {
	return $(id).val().split(' - '); // [startDate, endDate]
}


