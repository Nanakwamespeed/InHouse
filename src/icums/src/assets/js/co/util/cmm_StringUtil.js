
/**
 * StringUtil
 *
 * Seo Yongki
 */
var StringUtil = {

	/**
	 * Verifies that a value is `null` or an empty string.
	 *
	 * StringUtil.isEmpty(null);            // true
	 * StringUtil.isEmpty(undefined);       // true
	 * StringUtil.isEmpty('');              // true
	 * StringUtil.isEmpty('Adam Hawkins');  // false
	 * StringUtil.isEmpty('\n\t');          // false
	 * StringUtil.isEmpty('  ');            // false
	 */
	isEmpty: function(value) {
    	return ObjectUtil.isEmpty(value);
    },

	/**
	 * Verifies that a value is not `null` or an empty string.
	 *
	 * StringUtil.isNotEmpty(null);            // false
	 * StringUtil.isNotEmpty(undefined);       // false
	 * StringUtil.isNotEmpty('');              // false
	 * StringUtil.isNotEmpty('Adam Hawkins');  // true
	 * StringUtil.isNotEmpty('\n\t');          // true
	 * StringUtil.isNotEmpty('  ');            // true
	 */
    isNotEmpty: function(value) {
		return ObjectUtil.isNotEmpty(value);
	},

	/**
	 * A value is blank if it is empty or a whitespace string.
	 *
	 * StringUtil.isBlank(null);            // true
	 * StringUtil.isBlank(undefined);       // true
	 * StringUtil.isBlank('');              // true
	 * StringUtil.isBlank('\n\t');          // true
	 * StringUtil.isBlank('  ');            // true
	 * StringUtil.isBlank('\n\t Hello');    // false
	 * StringUtil.isBlank('Hello world');   // false
	 */
	isBlank: function(value) {
		return StringUtil.isEmpty(value) || $.trim(value) === '';
	},

	/**
	 * Returns true if the value is not blank
	 *
	 * StringUtil.isNotBlank(null);            // false
	 * StringUtil.isNotBlank(undefined);       // false
	 * StringUtil.isNotBlank('');              // false
	 * StringUtil.isNotBlank('\n\t');          // false
	 * StringUtil.isNotBlank('  ');            // false
	 * StringUtil.isNotBlank('\n\t Hello');    // true
	 * StringUtil.isNotBlank('Hello world');   // true
	 */
	isNotBlank: function(value) {
		return !StringUtil.isBlank(value);
	},

	/**
	 * calculate bytes of text
	 *
	 * StringUtil.getByteLength('checkText');
	 */
	getByteLength: function(s, b, i, c){
		if(s) s = s.replace(/(\r\n|\n|\r)/g, '  ');
		for(b = i = 0; c = s.charCodeAt(i++); b+=c>>11?3:c>>7?2:1);
	    return b;
	},

	/**
	 * JSON parsing check
	 *
	 * StringUtil.isJSON('[{}, {}]')
	 */
	isJSON: function(str){
		try {
			return (JSON.parse(str) && !!str);
		} catch (e) {
		    return false;
		}
	},

	/**
	 * 두개의 인자를 문자열로 비교 :: Compare two factors by character
	 *
	 * equala(100, '100') => true
	 */
	equals: function(source, compStr){
		if(this.isBlank(source)){
			source = "";
		}
		if(this.isBlank(compStr)){
			compStr = "";
		}
		return source.toString() === compStr.toString();
	},

	/**
	 * 콤마로 분리된 문자열에서 비교문자열을 포함하는 값이 존재하면 true를 리턴하는 메서드 :: Method to return to true, if character string include comparison character in the seperated character string by comma
	 *
	 * splitEqual('A, B, C', 'B') => true
	 * splitEqual('A, B, C', 'D') => false
	 */
	splitEqual: function(source, compStr){
		var returnVal = false;
	    if (StringUtil.isBlank(compStr)) {
	    	returnVal = false;
	    }else{
	    	const splitSource = source.split(',');
	    	const splitLength = splitSource.length;
	    	for (var i = 0; i < splitLength; i++) {
	    		if (compStr == splitSource[i].trim()) {
	    			returnVal = true;
	    			break;
	    		}
	    	}
	    }
	    return returnVal;
	},

	/**
	 * 문자열을 인덱스단위로 자르기. 빈값인 경우 빈값 리턴 :: Cut character string by index, if there is no value, the empty character will return
	 */
	substring: function(str, startidx, endidx){
		var returnVal = '';
	    if (StringUtil.isBlank(str)) {
	    	returnVal = '';
	    }else{
	    	returnVal = str.substring(startidx, endidx);
	    }
	    return returnVal;
	},

	/**
	 * 문자열 변경 :: Change character string
	 */
	replace: function(str, tStr, cStr){
		str = str+""; // 문자열화 :: Make to character string
		str = str.split(tStr).join(cStr);
		return str;
	},

	/**
	 * string on the left side if it's shorter than length
	 *
	 * lPad('123', 5, '0') => '00123'
	 */
	lPad: function(value, length, prefix) {
		return _.padStart(value, length, prefix);
	},

	/**
	 * string on the right side if it's shorter than length.
	 *
	 * rPad('abc', 5, '-') => 'abc--'
	 */
	rPad: function(value, length, sufix) {
		return _.padEnd(value, length, sufix);
	},

	/**
	 * check Uppercase
	 */
	isUpperCase: function(value) {
		const pattern = /^[A-Z]*$/;
	    if(pattern.test(value)){
	    	return true;
	    }else{
	    	return false;
	    }
	},

	/**
	 * check number
	 */
	isNumber: function(value) {
		const pattern = /^[0-9]*$/;
	    if(pattern.test(value)){
	    	return true;
	    }else{
	    	return false;
	    }
	},

	/**
	 * display commas in numbers.
	 */
	numComma(value) {
		return Number(value).toLocaleString('en', {maximumFractionDigits: 10});
	},

	/**
	 * remove comma from String Number
	 */
	uncomma(str) {
		str = str+"";
		str = "" + str.replace(/,/gi, ''); // 콤마 제거 :: Delete comma
		str = str.replace(/(^\s*)|(\s*$)/g, ""); // trim()공백,문자열 제거 :: Delete empty space, character string
		return Number(str); // 문자열을 숫자로 반환 :: Change character string to number
	}
}


