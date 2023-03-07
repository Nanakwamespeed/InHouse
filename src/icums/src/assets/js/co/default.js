	var target ;
	var spinner;
	var opts;

$(document).ready(function(){
    // 20191023 PTL Side Menu Visual Status Check :: PTL 사이드메뉴 Visual 상태 체크
    /* commonLayout.jsp Modify
    if($(".container").length > 0){
    	if ($.cookie('EXTER_SIDEMENU_OPEN_YN') == "true"){
    		$(".container").toggleClass("resize-content");
    		$(".sub-content__wrap .side-close").toggleClass("open");
    	}
    }
    */
	// datePicker
	$.datepicker.setDefaults({
		showButtonPanel : true,
		showOtherMonths : true,
		selectOtherMonths : true,
		changeMonth : true,
		changeYear : true,
		constrainInput : true,
		showOn : "both",
		defaultDate : "+0d",
		dateFormat : 'dd/mm/yy',
		buttonImage : "/images/calendar.png",
		buttonImageOnly : false
	});
	$(".datepicker").datepicker();

	// blockUI
	blockUI.setBlockUI();

	$("#full_btn").click(function(){
		if($("#full_btn1").val() == 'true'){
			$("#head").slideUp("fast");
			$("#foot").slideUp("fast");
			$('#big_bar').css('height' ,  $(window).height());
			$("#full_btn1").val("false");
			$(".big_bar_img").css('background', "white");

			$("#left").animate({ marginLeft: "-210px"} , 0);
			$("#contents").animate({ marginLeft: "0px"} , 0);
			$("#main_top").animate({ marginLeft: "0px"} , 0);
			$("#full_btn").attr('src', "/images/common/full_btn.gif");
			$('#contents').css('height' ,  $(window).height() -28 );
			$('#left').css('height' ,  $(window).height());
		}else{
			$("#head").slideDown("fast");
			$("#foot").slideDown("fast");
			$('#big_bar').css('height' ,  $(window).height() -150 );
			$("#full_btn1").val("true");
			$(".big_bar_img").css('background', "#ededed");
			$("#left").animate({ marginLeft: "0px"} , 0);
			$("#contents").animate({ marginLeft: "217px"} , 0);
			$("#main_top").animate({ marginLeft: "217px"} , 0);
			$("#full_btn").attr('src', "/images/common/full_btn1.gif");
			$('#contents').css('height' ,  $(window).height() -177 );
			$('#left').css('height' ,  $(window).height() -150 );
		}
	});

$("#big_bar").click(function(){
		if($(".big_bar_img").css("background-color") == 'rgb(255, 255, 255)'){
			$(".big_bar_img").css('background', "#ededed");
			$("#left").animate({ marginLeft: "0px"} , 0);
			$("#contents").animate({ marginLeft: "0px"} , 0);
			$("#main_top").animate({ marginLeft: "217px"} , 0);
		}else{
			$(".big_bar_img").css('background', "white");
			$("#left").animate({ marginLeft: "-210px"} , 0);
			$("#contents").animate({ marginLeft: "-210px"} , 0);
			$("#main_top").animate({ marginLeft: "0px"} , 0);
		}
	});

/*	$(".prev").unbind("click");
	$(".next").unbind("click");*/

	$(".container ul.panel li:not("+$(".container ul.tab li a.selected").attr("href")+")").hide();

	$(".container ul.tab li a").click(function(){
		if(!$(this).hasClass("selected")) {
			$(".container ul.tab li a").removeClass("selected");
			$(this).addClass("selected");
			$(".container ul.panel li").slideUp("fast");
			$($(this).attr("href")).slideDown("fast");
		}

		return false;
	});

	// $('#contents').css('height' ,  $(window).height() -177 );
	$('#big_bar').css('height' ,  $(window).height() -150 );
	$('#left').css('height' ,  $(window).height() -150 );

	// 2013-09-17 leedongbum
	// blocking submit
    var vFlagProgress = false;
	// spin
	var opts = {
			  lines: 13, // The number of lines to draw
			  length: 20, // The length of each line
			  width: 10, // The line thickness
			  radius: 30, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 0, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#000', // #rgb or #rrggbb or array of colors
			  speed: 1, // Rounds per second
			  trail: 60, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: 'auto', // Top position relative to parent in px
			  left: 'auto' // Left position relative to parent in px
			};
	target = document.getElementById('canvasloader-container');
	spinner;

    $("form").each(function () {
    	if($(this).attr('_submit') != undefined) return;

        this._submit = this.submit;
        this.submit= function (){
            if(!vFlagProgress) {
            	/*$.blockUI({ message: '' });
            	spinner= new Spinner(opts).spin(target);
                vFlagProgress = true;*/
            	$(".icums_loading").css('display', '');
            }else{
                /*$.unblockUI();
            	spinner.stop();
                vFlagProgress = false;*/
            	$(".icums_loading").css('display', 'none');
            }
            this._submit();
        };
    });
});

function setProgressCircle(){
}

// external progress spin stop add 2013/09/23
function stopProgressSpin(){
	$(".icums_loading").css('display', 'none');
	/*$.unblockUI();
    if (spinner) {
        spinner.stop();
    }
    vFlagProgress = false;*/
}

function startProgressSpin(){
	$(".icums_loading").css('display', '');
	// $.blockUI({ message: '' });
	// spinner= new Spinner(opts).spin(target);
    // vFlagProgress = true;
}


function searchReset(sId, eId){
	$('#'+sId).val("");
	$('#'+eId).val("");
}

function setSearchDate(type, value, sId, eId){
	var ed = $('#'+eId).val();
	var date;
	if(ed == ''){
		date = new Date();
		$('#'+eId).val(setStringDate(date));
	}else{
		var arr = ed.split("/");
		date = new Date(arr[2], parseInt(arr[1])-1, arr[0]);
	}
	if(type == "d"){
		if(value == 1){
			date = new Date();
			$('#'+eId).val(setStringDate(date));
		}
		date.setDate(date.getDate() - (value-1));
	}else if(type == "m"){
		date.setMonth(date.getMonth() - value);
	}else if(type == "y"){
		date.setYear(date.getFullYear() - value);
	}
	$('#'+sId).val(setStringDate(date));
}

function setSearchDate2(type, value, sId, eId){
	var date = new Date();
	$('#'+eId).val(setStringDate(date));

	if(type == "d"){
		date.setDate(date.getDate() - (value-1));
	}else if(type == "m"){
		date.setMonth(date.getMonth() - value);
	}else if(type == "y"){
		date.setYear(date.getFullYear() - value);
	}
	$('#'+sId).val(setStringDate(date));
}

function setSearchPlusDate(value, sId, eId){
	var date = new Date();
	$('#'+sId).val(setStringDate(date));
	date.setDate(date.getDate() + value);
	$('#'+eId).val(setStringDate(date));
}

function setSearchPlusDate2(type, value, sId, eId){
	var date = new Date();
	$('#'+sId).val(setStringDate(date));

	if(type == "d"){
		date.setDate(date.getDate() + (value-1));
	}else if(type == "m"){
		date.setMonth(date.getMonth() + value);
	}else if(type == "y"){
		date.setYear(date.getFullYear() + value);
	}else if(type == "unlimited"){
		date.setYear(2099);
		date.setMonth(11);
		date.setDate(31);
	}
	$('#'+eId).val(setStringDate(date));
}

function fullDigit(i){
	if(i < 10){
		return "0"+i;
	}else{
		return ""+i;
	}
}

function setStringDate(date){
	return fullDigit(date.getDate()) + "/" + fullDigit((date.getMonth() + 1)) + "/" + date.getFullYear();
}

function co_checkAll(all, member){
	var checked = all.checked;
	for(var i=0; i<member.length; i++){
		member[i].checked = checked;
	}
}

/**
 *
 * @param codeGroupName 코드그룹명 :: name of code group
 * @param codeObjId 코드 Input 객체 id :: Object to code input 
 * @param codeNameObjId 코드명 Input 객체 id :: Object to code name pinput 
 * @param companyType company Type
 * 		  (SL : 선사, AL : 항공사, FF : 포워더, TO : 터미널오퍼레이터, WT : 터미널, WI : ICD, WW : 창고) :: Shipper, AL: airlines FF: Forwarder, TO: Terminal operator, WT: Terminal, WI : ICD, WW: Warehouse
 * 20190124징수 요청으로 param1~param3추가 :: param1~param3 added because of collection request 
 */
function goPopup(codeGroupName, codeObjId, codeNameObjId, companyType, hsCdLength, codeGroup, targetCode, option, popupWidth, popupHeight, callBackNm, searchSectorCd)
{
	var queryParam = '?codeObjId=' + codeObjId;
	queryParam += codeNameObjId ? '&codeNameObjId=' + codeNameObjId : '';
	queryParam += companyType ? '&searchCompanyType=' + companyType : '';
	queryParam += hsCdLength ? '&hsCdLength=' + hsCdLength : '';
	queryParam += codeGroup ? '&codeGroup=' + codeGroup : '';
	queryParam += targetCode ? '&targetCode=' + targetCode : '';
	queryParam += callBackNm ? '&callBackNm=' + callBackNm : '';
	queryParam += option ? '&codeOption=' + option : '';
	queryParam += searchSectorCd ? '&searchSectorCd=' + searchSectorCd : '';

	var url = '/co/popup/selectCommon' + codeGroupName + 'Popup.do' + queryParam;
	//var specs = 'width=800, height=550,menubar=no,status=no,toolbar=no,resizable=no, scrollbars=yes';
	//var popup = window.open(url, codeGroupName, specs);
	if(popupWidth == ""){
		popupWidth = "800";
	}
	if(popupHeight == ""){
		popupHeight = "654";
	}

	var popupName = codeGroupName;
	if(codeGroupName === 'Code'){
		popupName = 'Common Code';
	}else if(codeGroupName === 'Office'){
		popupName = 'Customs Office';
	}else if(codeGroupName === 'CompanyCode'){
		popupName = 'Company';
	}

    $(this).checkOpenWindow({
        resizable : "yes",
        width : popupWidth,
        height : popupHeight,
        url : url,
        name : popupName
    })

	//windowOp(url, codeGroupName);
	//popup.focus();
}

/**
 * collection 공용 팝업 (예: HS code 팝업, common popup (ex: HS code pop up 
 * @param codeGroupName : 팝업 명칭 :: pop up name 
 * @param codeObjId		: 전달받을 코드 객체 :: object code that will be delivered
 * @param codeNameObjId	: 전달받을 코드명 객체 :: object code that will be delivered
 * @param callBackNm	: 팝업 후 callback함수명 :: callback function name after pop up 
 * @param param1		: 조건1 (예: hsCd >> isMask	: mask 방법) :: condition 1 (ex: hsCd >> imMask : mask method )
 * @param param2		: 조건2 (예: hsCd >> displayYn	: hs code 조회 조건 (보통 10자리만 조회시 null 또는 Y / hs code 레벌까지 조회시 All) :: condition 2 (ex: hsCd >> displayYn : hs code search condition (usually 10 characters search then null or Y/hs code level search )
 * @returns
 */
function goColCommonPopup(codeGroupName, codeObjId, codeNameObjId, callBackNm, param1, param2, popupWidth, popupHeight)
{
	var queryParam = '?codeObjId=' + codeObjId;
	queryParam += codeNameObjId ? '&codeNameObjId=' + codeNameObjId : '';
	queryParam += callBackNm ? '&callBackNm=' + callBackNm : '';
	if(codeGroupName=="VehicleModel") {
		queryParam += param1 ? '&searchCodeName=' + $("#"+param1).val() : '';
	}
	else {
		queryParam += param1 ? '&param1=' + param1 : '';
	}

	queryParam += param2 ? '&param2=' + param2 : '';

	var url = '/co/popup/selectCommon' + codeGroupName + 'Popup.do' + queryParam;
//	popup.openWindowPopup(url, codeGroupName);

	if(popupWidth == ""){
		popupWidth = "1000";
	}
	if(popupHeight == ""){
		popupHeight = "654";
	}

    $(this).checkOpenWindow({
        resizable : "yes",
        width : popupWidth,
        height : popupHeight,
        url : url
    })
}

function goMultiPopup(multiCodeObjId, codeType, groupCode, sectorCode){
    var specsObj = {
            width: '1030px',
            height: '750px',
            menubar: 'no',
            status: 'no',
            toolbar: 'no',
            resizable: 'yes',
            scrollbars: 'yes'
        };

        if (codeType == undefined) {
            codeType = '';
        }
        
        if (sectorCode == undefined) {
            sectorCode = '';
        }
        
        var queryParam = "?multiCodeObjId=" + multiCodeObjId + "&codeType=" + codeType + "&groupCode=" + groupCode + "&searchSectorCd=" + sectorCode;
        var url = '/co/popup/selectCommonMultiPopup.do' + queryParam;
        popup.openWindowPopup(url, codeType, specsObj);
}

/*
 * argCodeType은  CO_COMPANY_CODE 테이블에서 선사(SL), 항공사(AL), 포워더(FF), :: CO_COMPANY_CODE table has shipper(SL), airlines(AL), forwarder(FF)
 * 터미널오퍼레이터(TO), 터미널(WT), ICD(WI), 창고(WW)를 식별하기 위한 업체유형코드이다. :: Terminal operator (TO), terminal(WT), ICD(WI), warehouse (WW) - in order to identify them, these are company type codes
 * CO_COMPANY테이블의 자료를 조회하는 함수와 같이 사용하기 위해서 5번째 파라미터에 유형코드 추가 :: added type code to the 5th parameter in order to use it same as the function to search the table information 
 * 2013.06.09 MIN
 */
var argCmCodeStr = "", argCmNameStr = "";
function goPopupAutoCompleteType(arg1, argCode, argName, codeOption, argCodeType, popupWidth, popupHeight)
{
	argCmCodeStr = argCode;
	argCmNameStr = argName;
	var url = '/co/popup/selectCommon'+arg1+'PopupAutoCompleteType.do?searchCompanyType='+argCodeType+'&tableType='+arg1+'&codeOption='+codeOption;
	var name = arg1;
	//var specs = 'width=800, height=550,menubar=no,status=no,toolbar=no,resizable=no, scrollbars=yes';
	//var newWindow = window.open(url, name, specs);
	if(popupWidth == ""){
		popupWidth = "800";
	}
	if(popupHeight == ""){
		popupHeight = "654";
	}

    $(this).checkOpenWindow({
        resizable : "yes",
        width : popupWidth,
        height : popupHeight,
        url : url,
        name : '' // argName
    })
}

/*
 * argCodeType은  CO_COMPANY_CODE 테이블에서 선사(SL), 항공사(AL), 포워더(FF), :: CO_COMPANY_CODE table has shipper(SL), airlines(AL), forwarder(FF)
 * 터미널오퍼레이터(TO), 터미널(WT), ICD(WI), 창고(WW)를 식별하기 위한 업체유형코드이다. :: Terminal operator (TO), terminal(WT), ICD(WI), warehouse (WW) - in order to identify them, these are company type codes
 * CO_COMPANY테이블의 자료를 조회하는 함수와 같이 사용하기 위해서 5번째 파라미터에 유형코드 추가 :: added type code to the 5th parameter in order to use it same as the function to search the table information 
 * 2013.06.09 MIN
 */
var argCmCodeStr = "", argCmNameStr = "",argSubCmCodeStr = "", argSubCmNameStr = "", argCmEtcStr = "";
function goPopupAutoCompleteTypeForSd(arg1, argCode, argName, codeOption, argCodeType, argSubCode, argSubName, argEtc, popupWidth, popupHeight)
{
	argCmCodeStr = argCode;
	argCmNameStr = argName;
	argSubCmCodeStr = argSubCode;
	argSubCmNameStr = argSubName;
	argCmEtcStr = argEtc;
	var url = '/co/popup/selectCommon'+arg1+'ForSdPopupType.do?searchCompanyType='+argCodeType+'&tableType='+arg1+'&codeOption='+codeOption;
	var name = arg1;
	//var specs = 'width=800, height=550,menubar=no,status=no,toolbar=no,resizable=no, scrollbars=yes';
	//var newWindow = window.open(url, name, specs);
	if(popupWidth == ""){
		popupWidth = "800";
	}
	if(popupHeight == ""){
		popupHeight = "654";
	}

    $(this).checkOpenWindow({
        resizable : "yes",
        width : popupWidth,
        height : popupHeight,
        url : url,
        name : '' // argName
    })
}


function goPopupAutoCompleteTypeForTin(arg1, argCode, argName, codeOption, argCodeType)
{
	argCmCodeStr = argCode;
	argCmNameStr = argName;
	var url = '/co/popup/selectCommon'+arg1+'PopupForTin.do?searchCompanyType='+argCodeType+'&tableType='+arg1+'&codeOption='+codeOption;
	var name = arg1;
	var specs = 'width=800, height=550,menubar=no,status=no,toolbar=no,resizable=no, scrollbars=yes';
	var newWindow = window.open(url, name, specs);
	newWindow.focus();
}

function goCommonPopup(targetId,targetName,codeGroup,codeOption, popupWidth, popupHeight)
{
	var code;
	if($('#'+targetName).val() == '') code = '';
	else {
		code = $('#'+targetName).val();
		var n = code.indexOf(",");
		if(n > 0) code = code.substring(0, n);
	}

	var jsonParams = {"targetId":targetId,"targetCode":code.toUpperCase(), "targetName":targetName, "codeGroup":codeGroup, "codeOption":codeOption};
	var url = '/co/popup/selectCommonCodePopupAutoCompleteType.do?' + $.param(jsonParams);
	var name = 'Common Code';

	if(popupWidth == ""){
		popupWidth = "800";
	}
	if(popupHeight == ""){
		popupHeight = "654";
	}

    $(this).checkOpenWindow({
        resizable : "yes",
        width : popupWidth,
        height : popupHeight,
        url : url,
        name : '' // targetId
        })

	return ;
}


function goViewerPopup(documentId) {

	var url = '/co/popup/selectCommon'+arg1+'PopupForTin.do?searchCompanyType='+argCodeType+'&tableType='+arg1+'&codeOption='+codeOption;
	var name = arg1;
	var specs = 'width=800, height=550,menubar=no,status=no,toolbar=no,resizable=no, scrollbars=yes';
	var newWindow = window.open(url, name, specs);
	newWindow.focus();

}

function view_pop1()
{
	pop1.style.display = "";
	pop1.style.left = event.clientX;
	pop1.style.top = event.clientY;
}

function site_map_check(no){
	if(document.getElementById("site_"+no).style.display!="none"){
		document.getElementById("site_"+no).style.display="none";
	}else{
		document.getElementById("site_"+no).style.display="block";
	}
}

function show_top(){
	document.getElementById("site_map").style.display="block";
	document.getElementById("site_map_value").value=1;
}

function hide_top(){
	if(document.getElementById("site_map_value").value==1){
	document.getElementById("site_map").style.display="none";
	}
}

function show_top1(){
	document.getElementById("site_map").style.display="block";
	document.getElementById("site_map_value").value=0;
}

function hide_top1(){
	document.getElementById("site_map").style.display="none";
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
  var i,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

$(window).resize(function() {
	if ($("#full_btn1").val() == 'true') {
		$('#contents').css('height', $(window).height() - 177);
		$('#big_bar').css('height', $(window).height() - 150);
		$('#left').css('height', $(window).height() - 150);
	} else {

		// $('#contents').css('height', $(window).height() - 28);
		$('#big_bar').css('height', $(window).height());
		$('#left').css('height', $(window).height());
	}
});

function FlashObject(swf, width, height, flashvars)
{
    var strFlashTag = new String();
    if (navigator.appName.indexOf("Microsoft") != -1) {
        strFlashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        strFlashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=version=8,0,0,0" width="' + width + '" height="' + height + '">';
        strFlashTag += '<param name="movie" value="' + swf + '"/>';
        strFlashTag += '<param name="FlashVars" value="' + flashvars + '"/>';
        strFlashTag += '<param name="quality" value="best"/>';
        strFlashTag += '<param name="menu" value="false"/>';
        strFlashTag += '<param name="salign" value="LT"/>';
        strFlashTag += '<param name="scale" value="noscale"/>';
        strFlashTag += '<param name="wmode" value="transparent"/>';
        strFlashTag += '<param name="allowScriptAccess" value="sameDomain"/>';
        strFlashTag += '</object>';
    } else {
        strFlashTag += '<embed src="' + swf + '" ';
        strFlashTag += 'quality="best" ';
        strFlashTag += 'width="' + width + '" ';
        strFlashTag += 'height="' + height + '" ';
        strFlashTag += 'menu="false" ';
        strFlashTag += 'scale="noscale" ';
        strFlashTag += 'salign="LT" ';
        strFlashTag += 'wmode="transparent" ';
        strFlashTag += 'allowScriptAccess="sameDomain" ';
        strFlashTag += '<param name="FlashVars" value="' + flashvars + '"/>';
        strFlashTag += 'type="application/x-shockwave-flash" ';
        strFlashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
        strFlashTag += '</embed>';
    }
    document.write(strFlashTag);
}

function flash(url,w,h,bg,win,vars,base){
	var s=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='wmode' value='"+win+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='bgcolor' value='"+bg+"' />"+
	"<param name='base' value='"+base+"' />"+
	"<embed src='"+url+"' base='"+base+"' wmode='"+win+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' align='middle' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";
	document.write(s);
}

function makeflash(Url,Width,Height,mainNum,subNum) {
	document.writeln("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width=\"" + Width + "\" height=\"" + Height + "\">");
	document.writeln("<param name=\"movie\" value=\"" + Url + "\">");
	document.writeln("<param name=\"quality\" value=\"high\" />");
	document.writeln("<param name=\"wmode\" value=\"transparent\">");
	document.write("<param name='menu' value='false'>");
	document.writeln("<embed autostart=\"false\" src=\"" + Url + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"" + Width + "\"  height=\"" + Height + "\">");
	document.write("<param name=\"FlashVars\" value=\"mainNum="+mainNum+"&subNum="+subNum+"\">");
	document.writeln("</object>");
}

function global1() {
	location.href="/index.html";
}

function global2() {
	location.href="/sub9/menu1.html";
}

function global3() {
	location.href="/sub5/menu5.html";
}

function global4() {
	location.href="/sub9/menu4.html";
}

function global5() {
	location.href="/sub2/menu6.html";
}

function check_outlogin() {
	if(!form_outlogin.user_id.value) {
		alert("Enter ID ");
		form_outlogin.user_id.focus();
		return false;
	}

	if(!form_outlogin.user_pass.value){
		alert("Enter password");
		form_outlogin.user_pass.focus();
		return false;
	}
}

function open_portfolio() {
	window.open('/portfolio/portfolio.php','portfolio','width=845,height=700,left=75,top=0,scrollbars=yes');
}

function open_sitemap() {
	window.open('/inc/sitemap.html','sitemap','width=654,height=450,left=50,top=50');
}

function open_map() {
	window.open('/sub1/map.html','map','width=527,height=481,left=50,top=50');
}

function open_admin() {
	window.open('/bbs/admin/index.php');
}

function member_help() {
	window.open('/bbs/help.php','help','width=420,height=420,left=50,top=50');
}

function password_change() {
	window.open('/bbs/password_change.php','help','width=420,height=420,left=50,top=50');
}

function letter() {
	window.open("/mypage/letter_r.php","letter","width=830,height=654,top=50,left=50,scrollbars=yes");
}

function bookmark() {
	window.external.AddFavorite("http://www.tjlink.co.kr","Enter title ");
}

function open_agreement(mode) {
	window.open("/bbs/agreement.html?mode="+mode,"agreement","width=700,height=657,top=50,left=50");
}

function open_basket() {
	location.href="/shop/shop_basket.php";
}

function open_myorder() {
	location.href="/shop/shop_order_list.php";
}

function txt_focus(t) {
	t.style.border="2px solid #627dce";
	t.style.paddingRight="0px";
	t.style.paddingTop="0px";
	t.style.paddingBottom="0px";
}

function txt_blur(t) {
	t.style.border="1px solid #cccccc";
	t.style.paddingRight="2px";
	t.style.paddingTop="0px";
	t.style.paddingBottom="2px";
}

function table_over(t) {
	t.style.backgroundColor="#f0f0f0";
}

function table_out(t) {
	t.style.backgroundColor="";
}



var autoComplete = function(url, targetID, targetName, codeType, codeGroup, codeOption, viewType) {

	if(codeOption == null) codeOption = "";

    var minLength = 2;
    var maxLength = $('#'+targetName).attr( 'maxlength' );

    if(maxLength) {
    	if(maxLength==2) {
    		minLength =1;
    	}
    }

    $('#'+targetName).autocomplete({
         minLength: minLength
       , delay : 0
       , source: function(request, response) {
             $.ajax({
                      url      : url
                    , datatype : "json"
                    , data     : {
                          term:  request.term
                        , codeType: codeType
                        , codeGroup: codeGroup
                        , codeOption: codeOption
                        , maxRows: 12
                      }
                    , success: function(data) {
                        $('#'+targetID).val("");

                        if(data.totalCount < 1) {
                            $('#'+targetName).val("");
                        }

                        response($.map(data.rows, function(item) {

                                return {
                                  label: item.value + ", " + item.label,
                                  value:  item.value + ", "  + item.label,
                                  id : item.value
                               };
                        }));
                      }
             });
          }
        , select : function( event, ui ) {
            if(ui.item) {

            	if(viewType=="D") {
            		event.preventDefault();
            		$('#'+targetID).val(ui.item.label);
            		$('#'+targetName).val(ui.item.id);


            	}else {
            		$('#'+targetID).val(ui.item.id);
            	}
            }
          }
        ,focus: function(event, ui) {
        	if(ui.item) {
	        	if(viewType=="D") {
		            event.preventDefault();
		            $('#'+targetName).val(ui.item.id);
	        	}
        	}
        }
    }).blur(function() {
        if(viewType!="D" && $("#"+targetID).val() == "") { $("#"+targetName).val(""); }
    }).keyup(function() {
        if(viewType!="D" && $("#"+targetName).val() == "") { $("#"+targetID).val(""); }
    });
};

var autoCompleteCode = function(targetID, targetName, codeType, codeGroup, codeOption, viewType) {
    autoComplete("/ajax/autoCompleteCode.do",targetID, targetName, codeType, codeGroup, codeOption, viewType);
};

var autoCompleteCodeForTin = function(targetID, targetName, codeType, codeGroup, codeOption) {
    if(codeOption == null) codeOption = "";

    $('#'+targetName).autocomplete({
         minLength: 2
       , delay : 0
       , source: function(request, response) {
             $.ajax({
                      url      : "/ajax/autoCompleteCode.do"
                    , datatype : "json"
                    , data     : {
                          term:  request.term
                        , codeType: codeType
                        , codeGroup: codeGroup
                        , codeOption: codeOption
                        , maxRows: 12
                      }
                    , success: function(data) {
                        $('#'+targetID).val("");

                        if(data.totalCount < 1) {
                            $('#'+targetName).val("");
                        }

                        response($.map(data.rows, function(item) {

                                return {
                                  label: item.value + ", " + item.label,
                                  value:  item.value + ", "  + item.label,
                                  id : item.value,
                                  tin : item.tin
                               };
                        }));
                      }
             });
          }
        , select : function( event, ui ) {
        	$('#'+targetID).val(ui.item.id);

        	if(viewType=='D') {
        		$('#'+targetName).val(ui.item.label);
        	}
          }
    }).blur(function() {
        if($("#"+targetID).val() == "") { $("#"+targetName).val("");  $("#"+targetID+"Tin").val(""); }
    }).keyup(function() {
        if($("#"+targetName).val() == "") { $("#"+targetID).val("");  $("#"+targetID+"Tin").val(""); }
    });
};


var codeInputAutoComplete = function (lastId, headId, codeType , codeGroup, maxRow, param1, param2){

	if(maxRow==""){
		maxRow = "15";
	}

	var minLength = 2;

	if (codeType == "CompanyCode") minLength = 11;
	if (codeType == "CompanyTradings") minLength = 11;

$('#'+headId).autocomplete({
        minLength: minLength
      , delay : 0
      , source: function(request, response) {
    		if (codeType == "CompanyTradings") {
    		    var prev = $('#'+headId).data('companyVal');
    		    var current = $('#'+headId).val();
    		    if(prev == current) return;		// prev value and current equal is not call
    		}
            $.ajax({
            		url      : "/co/code/selectCodeInputAutoComplete.do"
            	,	datatype : "json"
            	, 	data : {
            					searchValue:  $('#'+headId).val()
            				,	codeType : codeType
            				,	codeGroup : codeGroup
            				,	searchMaxRow : maxRow
            				,	param : param1
            				,	param2 : param2
            		}
            	,	beforeSend: function(data) {

            			if (codeType == "CompanyTradings") {
            				// $.blockUI();
            				$(".icums_loading").css('display', '');
            			}

            		}
            	,	success: function(data) {
            			// console.log(data);
            			if (codeType == "CompanyTradings") {
            				$('#'+lastId).val('');
            				if(StringUtil.isNotBlank(param1)){
            					$('#'+param1).val('');
            				}
            				if(data == null || data == '' || data.length < 1) {
            					$('#'+lastId).prop('readonly', false);
            					$('#'+lastId).removeClass('readonly');
            				} else {
            					$('#'+lastId).prop('readonly', true);
            					$('#'+lastId).addClass('readonly');
            				}
            			}
            			response($.map(data, function(item) {
            				return {
            					label: '['+item.code+'] : '+item.codeDescription
            					, value: item.code
            					, name : item.name
            					, companyType : item.companyType
            					, companyCd : item.companyCd
            					, companySeq : item.companySeq
            					, codeEtc : item.codeEtc
            				};
            			}));
            		}
            	,	complete: function(XMLHttpRequest, textStatus) {

            			if (codeType == "CompanyTradings") {
            				// $.unblockUI();
            				$(".icums_loading").css('display', 'none');
            			}

            		}
            });
         }
       , select : function( event, ui ) {
           if(ui.item) {
				$('#'+headId).val(ui.item.value);
				$('#'+lastId).val(ui.item.name);
				if (codeType == "CompanyCode") {
					$('#'+headId).attr('codeGroup',ui.item.companyType);
					$('#'+headId).attr('companyCd',ui.item.companyCd);
					$('#'+headId).attr('companySeq',ui.item.companySeq);
				}
				if (codeType == "CompanyTradings") {
					if(param1 != '') {
						$('#'+param1).val(ui.item.codeEtc);
					}
				}
				$('#' + headId).autocomplete('close').blur();
           }
         }
   }).blur(function() {
   }).keyup(function() {
	   if (codeType == "CompanyTradings") {
		    $(this).data('companyVal', $('#'+headId).val());
		}
   })
};

var companyTradingsAutoComplete = function (lastId, headId, codeType , codeGroup, maxRow, param1){

	if(maxRow==""){
		maxRow = "15";
	}

	var minLength = 11;

$('#'+headId).autocomplete({
        minLength: minLength
      , delay : 0
      , source: function(request, response) {
            $.ajax({
                     url      : "/co/code/selectCompanyTradingsAutoComplete.do"
                    , datatype : "json"
               	    , data : {
                       searchValue:  $('#'+headId).val()
                     , codeType : codeType
                     , codeGroup : codeGroup
                     , searchMaxRow : maxRow
                     , param : param1
                   }
                   , success: function(data) {

                       response($.map(data.list, function(item) {
	                       return {
	                         label: item.codeDescription
	                         , value: item.code
	                         , name : item.name
	                         , companyType : item.companyType
	                         , companyCd : item.companyCd
	                         , companySeq : item.companySeq
	                      };
                       }));
                     }
            });
         }
       , select : function( event, ui ) {
           if(ui.item) {
				$('#'+headId).val(ui.item.value);
				$('#'+lastId).val(ui.item.name);
				if (codeType == "CompanyTradings") {
					$('#'+headId).attr('codeGroup',ui.item.companyType);
					$('#'+headId).attr('companyCd',ui.item.companyCd);
					$('#'+headId).attr('companySeq',ui.item.companySeq);
				}
           }
         }
   }).blur(function() {
   }).keyup(function() {
   })
};

var checkCodeOnVehicle = function(targetID, targetName, codeType) {
	var url= "/ajax/checkCodeOnVehicle.do";
	var _maxlength= $("#"+targetID).attr('maxlength');
    $('#'+targetID).autocomplete({
         minLength: _maxlength
       , delay : 0
       , source: function(request, response) {
             $.ajax({
                      url      : url
                    , datatype : "json"
                    , data     : {
                          code: $('#'+targetID).val()
                        , codeType: codeType
                      }
                    , success: function(data) {
                    	if('Y' == data.SUCCESS){
                    		$('#'+targetName).val(data.codeDescription);
                    	}else {
                    		alert("No available code!");
                    		$('#'+targetName).val("");
                    	}

                        response($.map(data.rows, function(item) {

                                return {
                                  label: item.value + ", " + item.label,
                                  value:  item.value + ", "  + item.label,
                                  id : item.value
                               };
                        }));
                      }
             });
          }
        , select : function( event, ui ) {
            if(ui.item) {
                $('#'+targetID).val(ui.item.id);
            }
          }
    }).blur(function() {
        if($("#"+targetID).val() == "") { $("#"+targetName).val(""); }
    }).keyup(function() {
        if($("#"+targetID).val().length < _maxlength) {
            $("#"+targetName).val('');
        }
    });
};

var popup = {
	/**
	 * Window 팝업을 보여준다. :: Show the pop up
	 *
	 * @param url URL
	 * @param name 팝업명 :: Name of the pop up 
	 * @param specObj Spec Object
	 * @return 팝업 객체 :: Pop up object
	 */
	openWindowPopup : function(url, name, specObj) {
		var defaultSpecsObj = {
			width : '800px',
			height : '550px',
			menubar : 'no',
			status : 'no',
			toolbar : 'no',
			resizable : 'yes',
			scrollbars: 'yes'
		};

		$.extend(true, defaultSpecsObj, specObj);

		defaultSpecsObj.left = (window.screen.width / 2) - (parseInt(defaultSpecsObj.width) / 2);
		defaultSpecsObj.top = (window.screen.height / 2) - (parseInt(defaultSpecsObj.height) / 2);

		var specs = '';
		$.each(defaultSpecsObj, function(property, propertyValue) {
			specs += property + '=' + propertyValue;
			specs += ', ';
		});
		specs = specs.substring(0, specs.lastIndexOf(', '));

		var popupObject = window.open(url, name, specs);
		popupObject.focus();

		return popupObject;
	},

	/**
	 * Modal 팝업을 보여준다. :: Show the pop up
	 *
	 * @param url URL
	 * @param arguments Object
	 * @param optionObj Options Object
	 * @returns
	 * @deprecated
	 */
	/*openModalPopup : function(url, arguments, optionsObj) {
		var defaultOptions = {
			center : 'yes',
			dialogWidth : '800px',
			dialogHeight : '550px',
			resizable : 'yes',
			scroll : 'yes'
		};
		$.extend(true, defaultOptions, optionsObj);
		var options = '';
		$.each(defaultOptions, function(property, propertyValue) {
			options += property + ':' + propertyValue;
			options += '; ';
		});
		options = options.substring(0, options.lastIndexOf('; '));

		return window.showModalDialog(url, arguments, options);
	}*/
};

var commonCodeUtil = {
	/**
	 * 동적 SelectBox를 생성한다. :: Create dynamic SelectBox
	 *
	 * @param targetId 적용될 Element의 ID :: The applied element's 
	 * @param dynamicCodeType 동적코드유형 :: dynmaic code type 
	 * 		  - ACTION : Action Code
	 * @param code Code
	 * @param displayStyle Display Style(optional)
	 * 		  - default : 코드 구분자 코드명 :: code category code name
	 * 		  - 0 : 코드 :: code
	 * 		  - 1 : 코드명 :: code name
	 * @param titleCode title message Id
	 * @param selectedValue default selected value
	 */
	appendDynamicSelectBox: function(targetId, dynamicCodeType, code, displayStyle, selectedValue, titleCode,callback) {
		var dataOptions = {
			parameters : $.param({
				dynamicCodeType : dynamicCodeType,
				code : code,
				displayStyle: displayStyle,
				titleCode : titleCode,
				selectedValue : selectedValue
			})
		};

		ajaxUtil.ajaxJsonRequest('/co/selectDynamicCodeList.do', dataOptions, function(data) {
			$('#' + targetId).children().remove();
			var codeList = data.resultList;
			for ( var i = 0; i < codeList.length; i++) {


				var optionElement = $('<option/>');
				var resultCode = codeList[i].code;
				var resultText = codeList[i].text;

				optionElement.val(resultCode);
				optionElement.text(resultText);

				if (selectedValue && resultCode == selectedValue) {
					optionElement.attr('selected', 'selected');
				}

				$('#' + targetId).append(optionElement);


			}

			if( callback == 1 ) {
				timeOut();
			}

		});
	}
};

var getCodeName = function(codeType, groupCd, code, filedCd, filedNm, hsCdLength, isClear, sync, param1){

	var fileEtc="";
	var companyCd="";
	var companySeq="";

	if(filedCd.indexOf('Tin') != -1){
		fileEtc = filedCd.replace("Tin","Addr");
	}else if(filedCd.indexOf('hsCd') != -1){
		fileEtc = filedCd + "Etc";
	}

	if(!filedNm) {
		filedNm = filedCd;
	}

	if(codeType == "CompanyCode"){
		groupCd = $('#'+filedCd).attr('codeGroup');
		companyCd = $('#'+filedCd).attr('companyCd');
		companySeq = $('#'+filedCd).attr('companySeq');
	}

	if(code){
		var dataOptions = {
			parameters : $.param({
				codeType : codeType,
				codeGroup: groupCd,
				code : getUnmaskValue(filedCd),
				param1 : getUnmaskValue(param1),
				hsCdLength : hsCdLength,
				companyCd : companyCd,
				companySeq : companySeq
			}),
			async : sync ? false : true
		};

		ajaxUtil.ajaxJsonRequest('/co/selectCodeName.do', dataOptions, function(data) {
			if(!data.codeName) {

				if (eval(isClear)) {
					$('#'+filedCd).val('');
				}
				if (fileEtc != ""){
					$('#'+fileEtc).val('');
				}
				$('#'+filedNm).val('');

				/* NEW CODE
				if (eval(isClear)) {
					$('#'+filedCd).val('');
					$('#'+filedNm).val('');
					$('#'+fileEtc).val('');
				}
				if (fileEtc != ""){
					if (eval(isClear)) {
						$('#'+fileEtc).val('');
					}
				}
				*/

			}else{
				$("#"+filedCd).val(code);
				$('#'+filedNm).val(data.codeName);
				if (fileEtc != ""){
				    $('#'+fileEtc).val(data.codeEtc);
				}

				// 2014.2.5  Modify by Yoonja,Yi : Remove dash character in company tin.
			 	if (filedCd.indexOf("Tin") >= 0 && $('#'+filedCd).val().indexOf("-") > 0) {
			 		$('#'+filedCd).val($('#'+filedCd).val().replace(/-/gi, ''));
			 	}

				//2013.11.28 추가: [Declaration Amendment]에서 HS코드 조회하는 경우에 사용. :: additional: use it when HS code is searched in [Declaration Amendment]
				//console.log( codeType + ":" + $('#i_hs4Cd').length );
				if( codeType=="HS"   &&   $('#i_hs4Cd').length > 0 )
					$('#i_hs4Cd').val('0000');

				if(codeType == "CompanyCode"){
				    if(typeof(getCompanyCode) == "function") {
				    	getCompanyCode(data.companyCd);
					}
				}
			}
		});
	}
};


/**
 * Apply a function in case of an onblur exception
 * codeType : 명칭을 가져올 코드 Type :: Code to bring in the name 
 * isClear : 초기화할지 여부 :: Status of whether to reset or not 
 * sync : sync 여부 :: status 
 * filedCd : 코드객체명 :: code object name
 * filedNm : 이름객체명 :: name object name 
 * param1 : 코드와 명을 제외한 객체명1 :: object name without code and name1
 * param2 : 코드와 명을 제외한 객체명2 :: object name without code and name2
 * param3 : 코드와 명을 제외한 객체명3 :: object name without code and name3
 * param4 : 코드와 명을 제외한 객체명4 :: object name without code and name4
 * param5 : 코드와 명을 제외한 객체명5 :: object name without code and name5
 *
 */
var getCodeNameEtc = function(codeType, isClear, sync, filedCd, filedNm, param1, param2, param3, param4, param5){
	if(!filedNm) {
		filedNm = filedCd;
	}

	if(getUnmaskValue(filedCd)){
		var dataOptions = {
			parameters : $.param({
				codeType : codeType,
				code : getUnmaskValue(filedCd),
			}),
			async : sync ? false : true
		};

		ajaxUtil.ajaxJsonRequest('/co/selectCodeNameEtc.do', dataOptions, function(data) {
			//if(!data.name) {
			if(data == null) {
				if (eval(isClear)) {
					$('#'+filedCd).val('');
				}
				$('#'+filedNm).val('');

				param1 ? $('#'+param1).val('') : '';
				param2 ? $('#'+param2).val('') : '';
				param3 ? $('#'+param3).val('') : '';
				param4 ? $('#'+param4).val('') : '';
				param5 ? $('#'+param5).val('') : '';

			}else{
				$('#'+filedNm).val(data.name);

				param1 ? $('#'+param1).val(data.param1) : '';
				param2 ? $('#'+param2).val(data.param2) : '';
				param3 ? $('#'+param3).val(data.param3) : '';
				param4 ? $('#'+param4).val(data.param4) : '';
				param5 ? $('#'+param5).val(data.param5) : '';
			}
		});
	} else {
		$('#'+filedNm).val('');
		param1 ? $('#'+param1).val('') : '';
		param2 ? $('#'+param2).val('') : '';
		param3 ? $('#'+param3).val('') : '';
		param4 ? $('#'+param4).val('') : '';
		param5 ? $('#'+param5).val('') : '';
	}
};



/*
 * Ajax 유틸리티::Utility
 */
var ajaxUtil = {

	ajaxBasicRequest : function(url, target, form, options) {
		var _options = {
			url : url,
			data : '',
			type : 'POST',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			dataType : 'html',
			target : target,
			beforeSend : this.beforeSendCallback,
			error : this.errorCallback,
			success : function(data, textStatus, XMLHttpRequest) {
				ajaxUtil.successCallback(this.target, data, textStatus, XMLHttpRequest);
			},
			complete : this.completeCallback
		};

		$.extend(true, _options, options);

		if (form && $(form).size() > 0) {
			_options.data += (_options.data ? '&' : '') + $(form).serialize();
		}

		if (_options.data.indexOf('decorator=noBody') == -1) {
			_options.data += (_options.data ? '&' : '') + 'decorator=noBody';
		}

		$.ajax(_options);
	},

	ajaxSubmitRequest : function(url, target, form, options) {
		var index = url.indexOf('decorator=noBody');
		if (index == -1) {
			url += (url.indexOf('?') >= 0) ? '&' : '?';
			url += 'decorator=noBody';
		}

		var _options = {
			url : url,
			data : '',
			type : 'post',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			dataType : null,
			resetForm : false,
			clearForm : false,
			target : target,
			beforeSubmit : this.beforeSendCallback,
			success : function(data, textStatus, XMLHttpRequest) {
				ajaxUtil.successCallback(this.target, data, textStatus, XMLHttpRequest);
			},
			complete : this.completeCallback
		};

		$.extend(true, _options, options);

		$(form).ajaxSubmit(_options);
	},

	ajaxJsonRequest : function(url, dataOptions, successCallback, callbackOptions) {
		var data = '';
		if (dataOptions) {
			if (dataOptions.parameters) {
				// data += dataOptions.parameters;
				data = dataOptions.parameters;
			}

			if (dataOptions.formId && $('#' + dataOptions.formId).get(0)) {
				data += (data ? '&' : '') + $('#' + dataOptions.formId).serialize();
			}
		}

		var _options = {
			url : url,
			data : data,
			type : 'POST',
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			beforeSend : this.beforeSendCallback,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (callbackOptions && callbackOptions.error) {
					callbackOptions.error();
				} else {
					var errorMsg = XMLHttpRequest.responseText;
					var iPosition01 = errorMsg.indexOf("errorMsgStart");
					var iPosition02 = errorMsg.indexOf("errorMsgEnd");
					var sessionExpired = errorMsg.indexOf("Session is expired");

					if(iPosition01 > 0){
						alert('Error: ' + errorMsg.substring(iPosition01+16, iPosition02-9).replace(/<\/br>/gi, "").replace(/ /gi, "") + "If you fail again, please contact system administrator.");
					}else if(sessionExpired > 0) {
						alert("Session is expired!!.");
	                    window.location.href = "/login/login.do";
					}
				}
			},
			success : function(data, textStatus, XMLHttpRequest) {
				CmmTimer.initTime(30); // Session Timer initialize
				successCallback(data, callbackOptions);
			},

			complete : this.completeCallback
		};

		$.ajax(_options);

	},

	ajaxJsonRequest2: function (url, dataOptions, successCallback, callbackOptions) {
        //var data = '';
        // if (dataOptions) {
        //  if (dataOptions.parameters) {
        //      data += dataOptions.parameters;
        //  }

        //  if (dataOptions.formId && $('#' + dataOptions.formId).get(0)) {
        //      data += (data ? '&' : '') + $('#' + dataOptions.formId).serialize();
        //  }
        // }

        var _options = {
            url: url,
            data: JSON.stringify(dataOptions),
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: this.beforeSendCallback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (callbackOptions && callbackOptions.error) {
                    callbackOptions.error();
                } else {
                    var errorMsg = XMLHttpRequest.responseText;
                    var iPosition01 = errorMsg.indexOf("errorMsgStart");
                    var iPosition02 = errorMsg.indexOf("errorMsgEnd");
                    var sessionExpired = errorMsg.indexOf("Session is expired");

                    if (iPosition01 > 0) {
                        alert('Error: ' + errorMsg.substring(iPosition01 + 16, iPosition02 - 9).replace(/<\/br>/gi, "") + "If you fail again, please contact system administrator.");
                    } else if (sessionExpired > 0) {
                        alert("Session is expired!!.");
                        window.location.href = "/login/login.do";
                    }
                }
            },
            success: function (data, textStatus, XMLHttpRequest) {
                successCallback(data, callbackOptions);
            },

            complete: this.completeCallback
        };

        $.ajax(_options);
    },

	ajaxMultipartRequest : function(url, dataOptions, successCallback, callbackOptions) {
		var _options = {
			url : url,
			data : dataOptions,
			type : 'post',
			dataType : 'json', // json <-text
			processData: false,
			contentType: false,
			beforeSend : this.beforeSendCallback,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (callbackOptions && callbackOptions.error) {
					callbackOptions.error();
				} else {
					var errorMsg = XMLHttpRequest.responseText;
					var iPosition01 = errorMsg.indexOf("errorMsgStart");
					var iPosition02 = errorMsg.indexOf("errorMsgEnd");
					var sessionExpired = errorMsg.indexOf("Session is expired");

					if(iPosition01 > 0){
						alert('Error: ' + errorMsg.substring(iPosition01+16, iPosition02-9).replace(/<\/br>/gi, "").replace(/ /gi, "") + "If you fail again, please contact system administrator.");
					}else if(sessionExpired > 0) {
						alert("Session is expired!!.");
	                    window.location.href = "/login/login.do";
					}
				}
			},
			success : function(data, textStatus, XMLHttpRequest) {
				//var jsondata = JSON.parse(data);
				var jsondata = data;
				successCallback(jsondata, callbackOptions);
			},

			complete : this.completeCallback
		};

		$.ajax(_options);
	},

	beforeSendCallback : function(data) {
		// $.blockUI();
		$(".icums_loading").css('display', '');
	},

	errorCallback : function(XMLHttpRequest, textStatus, errorThrown) {
		var errorMsg = XMLHttpRequest.responseText;
		var iPosition01 = errorMsg.indexOf("errorMsgStart");
		var iPosition02 = errorMsg.indexOf("errorMsgEnd");
		var sessionExpired = errorMsg.indexOf("Session is expired");

		if(iPosition01 > 0){
			alert('Ajax Error: ' + errorMsg.substring(iPosition01+16, iPosition02-9).replace(/<\/br>/gi, "").replace(/ /gi, "") + "If you fail again, please contact system administrator.");
		}else if(sessionExpired > 0) {
			alert("Session is expired!!.");
            window.location.href = "/login/login.do";
		}
		// $.unblockUI();
		$(".icums_loading").css('display', 'none');
	},

	successCallback : function(target, data, textStatus, XMLHttpRequest) {
		if (target) {
			$(target).html(data);
		}
		$.unblockUI();
		$(".icums_loading").css('display', 'none');
	},

	completeCallback : function(XMLHttpRequest, textStatus) {
		$.unblockUI();
		$(".icums_loading").css('display', 'none');
	},

	// use at ajax navigation
	miv_changePageSizeAjax: function(psize, url, target, clearTarget, formid) {
		var options = {
				data : $.param({miv_pageSize : psize, miv_pageNo : 1})
		};
		ajaxUtil.miv_goAjax(options, url, target, clearTarget, formid);
	},

	miv_goPageAjax: function(pno, url, target, clearTarget, formid) {
		var options = {
				data : $.param({miv_pageNo : pno})
		};
		ajaxUtil.miv_goAjax(options, url, target, clearTarget, formid);
	},

	miv_goAjax: function(options, url, target, clearTarget, formid) {
		if(clearTarget.trim() != "") {
			var arrTarget = clearTarget.split(",");
			for(var n=0; n<arrTarget.length; n++) {
				if(arrTarget[n] != ""){
					$('#' + arrTarget[n]).empty();
				}
			}
		}
		ajaxUtil.ajaxBasicRequest(url, '#' + target, '#' + formid, options);
	}

};

/**
 * DatePicker
 */
var datepicker = {

	setDateRange : function(object, dateText) {
		var instance = $(object).data('datepicker');
		var date = $.datepicker.parseDate(instance.settings.dateFormat ||
				   $.datepicker._defaults.dateFormat, dateText,	instance.settings);

		if ($(object).attr('fromto') == 'from') {
			$(object).nextAll('input').datepicker('option', 'minDate', date);
		} else if ($(object).attr('fromto') == 'to') {
			$(object).prevAll('input').datepicker('option', 'maxDate', date);
		}
	},

	controlDateDef : function(fromId, toId, value) {
		if($('#' + fromId).val() == ''  ) {
			datepicker.controlDate(fromId, toId, value);
		}
	},

	controlDate : function(fromId, toId, value) {
		if(value == 'today'){
			if(fromId){
				$('#' + fromId).datepicker('setDate', new Date());
			}
			$('#' + toId).datepicker('setDate', new Date());

		} else if(value == 'unlimited') {
			if(fromId){
				$('#' + fromId).datepicker('setDate', this.firstDay);
			}
			$('#' + toId).datepicker('setDate', this.lastDay);
		} else if(value == 'thisterm') {
			if(fromId){
				$('#' + fromId).datepicker('setDate', '-7d');
			}
			$('#' + toId).datepicker('setDate', '+7d');
		} else {
			if(!value.indexOf('-')){
				if(fromId){
					$('#' + fromId).datepicker('setDate', value);
				}
				$('#' + toId).datepicker('setDate', new Date());
			}else {
				if(fromId){
					$('#' + fromId).datepicker('setDate', new Date());
				}
				$('#' + toId).datepicker('setDate', value);
			}
		}
	}

};

/**
 * Block UI
 */
var blockUI = {
	setBlockUI: function() {
		var processRequest;

		var resolution = 1024;
		var windowWidth =  $(window).width();
		if(resolution <= windowWidth){
			processRequest='<div id=\"spinnerElement\" class=\"spinner\" style=\"background-color:white; font-size:30px;\"><img src=\"/images/common/ajax_loading2.gif\"/>process request...</div>';
		}else{
			processRequest='<div id=\"spinnerElement\" class=\"spinner\" style=\"background-color:white;\"><img src=\"/images/common/ajax_loading.gif\"/>process request...</div>';
		}

		if ($.blockUI) {
			$.blockUI.defaults = {
				// message displayed when blocking (use null for no message)
					message:  processRequest,

			    // styles for the message when blocking; if you wish to disable
			    // these and use an external stylesheet then do this in your code:
			    // $.blockUI.defaults.css = {};
			    css: {
			        padding:        0,
			        margin:         0,
			        top:            '50%',
			        left:           '50%',
			        textAlign:      'center',
			        color:          '#000',
			        border:         '1px solid #eee',
			        backgroundColor:'#eee',
			        cursor:         'cursor'
			    },

			    // styles for the overlay
			    overlayCSS:  {
			        backgroundColor: '#fff',
			        opacity:         0.3,
			        cursor:         'cursor'
			    },

			    // styles applied when using $.growlUI
			    growlCSS: {
			        width:    '350px',
			        top:      '10px',
			        left:     '',
			        right:    '10px',
			        border:   'none',
			        padding:  '5px',
			        opacity:   0.6,
			        cursor:    null,
			        color:    '#fff',
			        backgroundColor: '#000',
			        '-webkit-border-radius': '10px',
			        '-moz-border-radius':    '10px'
			    },

			    // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			    // (hat tip to Jorge H. N. de Vasconcelos)
			    iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

			    // force usage of iframe in non-IE browsers (handy for blocking applets)
			    forceIframe: false,

			    // z-index for the blocking overlay
			    baseZ: 1000,

			    // set these to true to have the message automatically centered
			    centerX: true, // <-- only effects element blocking (page block controlled via css above)
			    centerY: true,

			    // allow body element to be stetched in ie6; this makes blocking look better
			    // on "short" pages.  disable if you wish to prevent changes to the body height
			    allowBodyStretch: true,

			    // enable if you want key and mouse events to be disabled for content that is blocked
			    bindEvents: true,

			    // be default blockUI will supress tab navigation from leaving blocking content
			    // (if bindEvents is true)
			    constrainTabKey: true,

			    // fadeIn time in millis; set to 0 to disable fadeIn on block
			    fadeIn:  100,

			    // fadeOut time in millis; set to 0 to disable fadeOut on unblock
			    fadeOut:  300,

			    // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			    timeout: 0,

			    // disable if you don't want to show the overlay
			    showOverlay: true,

			    // if true, focus will be placed in the first available input field when
			    // page blocking
			    focusInput: true,

			    // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			    applyPlatformOpacityRules: true,

			    // callback method invoked when unblocking has completed; the callback is
			    // passed the element that has been unblocked (which is the window object for page
			    // blocks) and the options that were passed to the unblock call:
			    //     onUnblock(element, options)
			    onUnblock: null,

			    // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			    quirksmodeOffsetHack: 4
			};
		}

		if($('#body').get(0)) {
			layout = $('#body').layout(layoutSettings);
		}
	}
};

var textUpperCase = function(){
	$('input[type=text].uppercase').map(function() {
	    $("input[name="+this.name+"]").val($("input[name="+this.name+"]").val().toUpperCase());
	});

};
/**
 * 함수설명 : 화면 중앙에 팝업창 :: Function explanation : pop up in the center of the screen 
 * 예제::problem     : nmPopupCenter(url, object,windowWidth, windowHeight, windowFeatures);
* @ parameter : sTargetPath : 해당 popup창의 실제 페이지 경로 :: the actual page route of the popup screen
                              object          : popup창으로 넘길 object :: it will be passed to a screen
                              windowWidth     : 창의 넓이 :: width of the screen
                              windowHeight    : 창의 높이 :: height of the screen
                              windowFeatures  : 창의 속성 :: character of the screen 
 */
var openWinC = function (url, windowName, sParam, windowWidth, windowHeight, windowFeatures)
{

    try {
        if( windowFeatures == null || windowFeatures == "" ) {
            windowFeatures = "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,menubar=no";
        }
        //windowFeatures="";
        //alert(windowFeatures);

        if(navigator.appVersion.indexOf("Safari") > 0 && navigator.appVersion.indexOf("Chrome") < 0 && navigator.appVersion.indexOf("Version/5.1") > 0) {
            windowHeight = parseInt(windowHeight) - 61;
        }

        if(navigator.appVersion.indexOf("Chrome") > 0) {
            windowHeight = parseInt(windowHeight) + 58;
        }

        var xPos = (screen.availWidth  - windowWidth) / 2;
        var yPos = (screen.availHeight - windowHeight) / 2;
        var feature =  "top=" + yPos + ",left=" + xPos + ",width=" + windowWidth + ",height=" + windowHeight +  "," + windowFeatures;
        if(!windowName) {
        	//windowName = "_blank";
        	windowName = "NCS_POP";
        }
        var newUrl = url;
        if(sParam) {
        	newUrl = newUrl+"?"+sParam;
        }
        var oWin = window.open( newUrl , windowName, feature );

        //oWin.moveTo(xPos, yPos);
        oWin.focus();
        return oWin;
    } catch(errorObject) {
		alert("Opening a pop-up window was blocked. Please allow opening a pop-ups  for this site");
    }
};

/**
 * date format validation
 */
var checkDate = {
    isValidDate:function(id, value, dvalue){
        var b = checkDate.checkDateType(value);
        if(!b){
        	checkDate.setDateValue(id, dvalue);
        }
    },
    checkDateType:function(d){
        var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var dateToken = d.split('/');
        var day = Number(dateToken[0]);
        var month = Number(dateToken[1]);
        var year = Number(dateToken[2]);

        if(day == 0) {
            return false;
        }

        var isValid = false;

        if(checkDate.isLeaf(year)) {
            if(month == 2) {
                if(day <= month_day[month-1] + 1) {
                    isValid = true;
                }
            } else {
                if(day <= month_day[month-1]) {
                    isValid = true;
                }
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }

        return isValid;
    },
    isLeaf:function (year) {
        var leaf = false;

        if(year % 4 == 0) {
            leaf = true;

            if(year % 100 == 0) {
                leaf = false;
            }

            if(year % 400 == 0) {
                leaf = true;
            }
        }

        return leaf;
    },
    compare:function (fdate, edate, type, dvalue){
        var fval = $("#" + fdate).val();
        var endval = $("#" + edate).val();

        var regEx = new RegExp(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/, "ig");

        var val1 = fval.replace(regEx, '$3$2$1');
        var val2 = endval.replace(regEx, '$3$2$1');

        if(val1 > val2 && val1.length > 5 && val2.length > 5) {
            alert('From-Date should be equal or earlier than To-Date.');
            if (type == 1) {
                checkDate.setDateValue(fdate, dvalue);
            } else {
                checkDate.setDateValue(edate, dvalue);
            }
        }

    	/* OLD CODE 2021-01-26
    	if(fval != '' && endval != ''){
	    	var dateToken = fval.split('/');
	        var day = Number(dateToken[0]);
	        var month = Number(dateToken[1]);
	        var year = Number(dateToken[2]);

	    	var fd = new Date(year, month, day, 0, 0, 0);

	        dateToken = endval.split('/');
	        day = Number(dateToken[0]);
	        month = Number(dateToken[1]);
	        year = Number(dateToken[2]);

	    	var ed = new Date(year, month, day, 0, 0, 0);
	    	if(fd.getTime() > ed.getTime()){
	    		alert('From-Date should be equal or earlier than To-Date.');
	    		if(type == 1){
	    			checkDate.setDateValue(fdate, dvalue);
	    		}else{
	    			checkDate.setDateValue(edate, dvalue);
	    		}
	    	}
    	}
    	*/
    },
    setDateValue:function(id, dvalue){
    	var tmpValue = "";
    	if(dvalue != undefined && dvalue != ''){
        	if(dvalue.length == 8){
                tmpValue = dvalue.substring(0,2) + '/' + dvalue.substring(2,4) + '/' + dvalue.substring(4);
        	}else if(dvalue.length == 10){
        		tmpValue = dvalue;
            }
    	}
        $("#"+id).val(tmpValue);
    }
};

var duration = {
	//  used in ready() script to validate start date is earlier that end date
    validateDuration:function(startDateInputName, endDateInputName, message){
    	$("input[name="+ startDateInputName +"],input[name="+ endDateInputName +"]").change(function() {
            var date1 = $("input[name="+ startDateInputName +"]").datepicker('getDate');
            var date2 = $("input[name="+ endDateInputName +"]").datepicker('getDate');
            if (date1 == null || date2 == null) {
              return false;
            }
            if (date2 - date1 < 0) {
                alert(message);
                $(this).val("");
                return false;
            }
        });
	}
};

var focus = {
	// inputName : element name, max : maxlength of this input element
	nextFocusWithName:function(inputName, max){
		$("input[name="+inputName+"]").keyup(function(e) {
			if($(this).val().length == max) {
				$(this).nextAll(":input").first().focus();
			}
		});
	}
};

var inReady = {
	upperCase:function(){
		$("input:text[upperCase]").keyup(function() {
			var cursorcaretposition	=	$(this).caret_cursor();
			$(this).val( $(this).val().toUpperCase());
			$(this).caret_cursor(cursorcaretposition);
			if($(this).hasClass('_nextFocus')){
				// for auto focus to the next input text
				if($(this).val().length == $(this).attr('maxlength')) {
					$(this).nextAll(":input").first().focus();
				}
			}
		});

		$(":text[class*=upperCase]").keyup(function() {
			var cursorcaretposition	=	$(this).caret_cursor();
			$(this).val( $(this).val().toUpperCase());
			$(this).caret_cursor(cursorcaretposition);
			if($(this).hasClass('_nextFocus')){
				// for auto focus to the next input text
				if($(this).val().length == $(this).attr('maxlength')) {
					$(this).nextAll(":input").first().focus();
				}
			}
		});


	    // [2013-09-02]textarea add
	    // [2013-09-02]caret name changed
		$("input:textarea[upperCase]").keyup(function() {
			var cursorcaretposition	=	$(this).caret_cursor();
			$(this).val( $(this).val().toUpperCase());
			$(this).caret_cursor(cursorcaretposition);
		});
	},

	nextFocus:function(){
		$("input._nextFocus").keyup(function(e) {
			if($(this).val().length == $(this).attr('maxlength')) {
				$(this).nextAll(":input").first().focus();
			}
		});
	},
	// according to the class of input text, automatically the special character padded in left .
	// ex> class="lpad4_0"
	//  - '4' : length
	//  - '0' : padding character
	lpad : function () {
		$(":text[class*=lpad]").change(function(e) {
			var source, fillChar, length;
			var _class= ($(this).attr('class'));
			var _array = _class.match(/\blpad(\d+)(\_\w+)\b/g);
			var _option= _array[0].substring(4);
			if(/^\d+\_\w+$/.test(_option)){
				var _array2 = _option.split("\_");
				length= _array2[0];
				fillChar= _array2[1];
				source= $(this).val();
				var appendStr = "";
				source = source.toString();
				if ('' != source && source.length < length) {
					var len = length - source.length;
					for (var i = 0; i < len; i++) {
						appendStr += fillChar;
					}
					$(this).val(appendStr + source);
				}
			}
		});
	}
};

/*
 * Auto numeric - (masking and setting ',')
 *  ex> class="pautoNumeric14_4"
 * */
function applyAutoNumeric(){
	$('[class*=autoNumeric]').each(function(){
		var _class= ($(this).attr('class'));
		var hasComma = /\bnoComma\b/.test(_class)?false:true;
        var _array = _class.match(/\b(p)?autoNumeric(\d+)?(\_\d+)?\b/g);
		  var _format = '';
		  var _vMin = '';
			  if(/^pautoNumeric/.test(_array[0])){
	           _format = _array[0].substring(12);
				 _vMin = '0';
	          }else{
	           _format = _array[0].substring(11);
			  }

	        if(/^\d+\_\d+$/.test(_format)){
	         var array = _format.split("\_");
				 var _vMax = "";
				 for( i=0; i < array[0]; i++){
					_vMax = _vMax + "9";
				  }
			      _vMax = _vMax + ".";
				  for( i=0; i < array[1]; i++){
					_vMax = _vMax + "9";
				  }
				  if(_vMin == '') _vMin = '-'+_vMax;
				  var _option = hasComma?{vMin: _vMin, vMax: _vMax, aPad: false}:{vMin: _vMin, vMax: _vMax, aPad: false, aSep:''} ;
				  $(this).autoNumeric('init', _option);
			  }else if(/^\d+$/.test(_format)){
				  var _vMax = "";
				  for( i=0; i < _format; i++){
						_vMax = _vMax + "9";
				  }
				  if(_vMin == '') _vMin = '-'+_vMax;
				  var _option = hasComma?{vMin: _vMin, vMax: _vMax, aPad: false}:{vMin: _vMin, vMax: _vMax, aPad: false, aSep:''} ;
				  $(this).autoNumeric('init', _option);

			  }else {
				  var _option = hasComma?{aPad: false}:{aSep:'', aPad: false} ;
				  $(this).autoNumeric('init', _option);
			  }
	 });
}

/*
 * textarea에서의 글자수 제한시 사용 onblur에 적용한다. :: if the Line limits the number of character, apply onblur to it 
 * obj : textarea object
 * max : maxlength
 */
function limitMaxLength(obj, max){
    var val = "";
    try{
        if(!obj) return;
        val = obj.value;
    } catch(e){}
    if(!val || val == "") return;

    var len = 0;
    var rtn = "";

    for (var inx = 0; inx < val.length; inx++) {

        var old = val.charAt(inx);
        var chr = escape(val.charAt(inx));

        if(old == '<' || old == '>'){ // &lt;  &gt;
            len = len + 4;
        }  else if(old == '"'){ // &quot;
            len = len + 6;
        } else if (old == '\''){ // &#39;
            len = len + 5;
        } else if (old == '\n'){
            len = len + 1;
        } else if (old == '\r'){
            len = len + 1;
        } else if (chr.indexOf("%u") != -1) { // unicode
            len += 3;
        } else {
            len ++;
        }

        if(len <= max){
            rtn = val.substring(0, inx+1);
        } else {
            break;
        }
    }
    obj.value = rtn;
}

function textLimitMax(obj, max) {
	var maxLength = max - 1 ;

	if(obj.value.length > maxLength) {
		obj.value = obj.value.substring(0, maxLength);
	}
}


/**
 * If the code field is empty then delete the name field.  Use at CodeInputTag
 * @param filedCd
 * @param filedNm
 */
function setBlankName(filedCd, filedNm) {
	var value = $('#'+filedCd).val();
	var fileEtc = "";

	if(filedCd.indexOf('Tin') != -1){
		fileEtc = filedCd.replace("Tin","Addr");
	}else if(filedCd.indexOf('hsCd') != -1){
		fileEtc = filedCd + "Etc";
	}

	if(value == "") {
		$('#'+filedNm).val('');
	}
	if(fileEtc != ""){
	$('#'+fileEtc).val('');
	}


}

function setBlankNameTwo(codeCd, codeNm, codeAddr) {
	if($('#'+codeCd).val().length < 11) {
		$('#'+codeCd).val('');
		$('#'+codeNm).val('');
		$('#'+codeAddr).val('');
	}
}

function getUnmaskValue(maskedTargetId) {
	var maskedTarget = $('#' + maskedTargetId);
	var maskedValue = maskedTarget.val();
	var unmaskedValue;

	// HS Code
	if (maskedTarget.hasClass('hsMask')) {
		unmaskedValue = maskedValue.replace(/\D/gi, '');
	}
	// Date
	else if (maskedTarget.hasClass('dateMask')) {
		unmaskedValue = maskedValue.replace(/\//gi, '');
	}
	// Formatted Number
 	else if (maskedTarget.hasClass('priceFormat') || maskedTarget.hasClass('priceFormat1') || maskedTarget.hasClass('priceFormat2') || maskedTarget.hasClass('priceFormat3') || maskedTarget.hasClass('priceFormat4')) {
 		unmaskedValue = maskedTarget.autoNumeric('get');
 	}
	// Company Tin
 	else if (maskedValue && maskedTargetId.indexOf("Tin") >= 0 && maskedValue.indexOf("-") > 0) {
 		unmaskedValue = maskedValue.replace(/-/gi, '');
 	}
	// Etc
	else {
		unmaskedValue = maskedTarget.val();
	}

	return unmaskedValue;
}

/**
 * Jasper
 * @param filedCd
 * @param filedNm
 */
function printTiss(formName, billNo){
	var param = '?billNo=' + billNo;
	var url = '/co/reports/printTiss.do'+param;
	$('form[name='+formName+']').attr('action',url);
	$('form[name='+formName+']').submit();

	stopProgressSpin();
}

function printReceipt(formName, billNo, receiptNo) {
    var param = '?billNo=' + billNo + '&receiptNo=' + receiptNo;
    var url = '/co/reports/printReceipt.do' + param;

    $('form[name=' + formName + ']').attr('action', url);
    $('form[name=' + formName + ']').submit();

    stopProgressSpin();
}

function printAssessment(formName, customsOfficeCd, tansadYy, tansadSerialNo, sequence, tansadVersion){
	var param = '?customsOfficeCd=' + customsOfficeCd;
		param += tansadYy ? '&tansadYy=' + tansadYy : '';
		param += tansadSerialNo ? '&tansadSerialNo=' + tansadSerialNo : '';
		param += sequence ? '&sequence=' + sequence : '';
		param += tansadVersion ? '&tansadVersion=' + tansadVersion : '';
	var url = '/co/reports/printAssessment.do'+param;
	$('form[name='+formName+']').attr('action',url);
	$('form[name='+formName+']').submit();

	stopProgressSpin();

}

function printPayment(formName, customsOfficeCd, tansadYy, tansadSerialNo){
	var param = '?customsOfficeCd=' + customsOfficeCd;
		param += tansadYy ? '&tansadYy=' + tansadYy : '';
		param += tansadSerialNo ? '&tansadSerialNo=' + tansadSerialNo : '';
	var url = '/co/reports/printIssuePaymentNote.do'+param;
	$('form[name='+formName+']').attr('action',url);
	$('form[name='+formName+']').submit();

	stopProgressSpin();

}

function printSecurityInfo(formName, securityId){
	var param = '?securityId=' + securityId;
	var url = '/co/reports/printSecurityInfo.do'+param;

	$('form[name='+formName+']').attr('action',url);
	$('form[name='+formName+']').submit();

	stopProgressSpin();
}

/**
 * cargoTracking open popup
 * @param blNo
 * @returns
 */
function goCargoTrackingInfoPopup(blNo){
	var params = $.param({
	    searchType : "BL",
		searchBlNo : blNo
	});

	var url = '/cm/ct/cargoTracking/popup/selectCargoTrackingInfo.do?' + params;

	$(this).checkOpenWindow({
	resizable : "yes",
	width : "1000",
	height : "800",
	url : url,
	name : "Cargo Tracking"
	})
}

/**
 * Show ImageView
 * @param documentId
 */
function showImageView(documentId) {
	$.ajax({
		type: "POST",
		url: "/co/popup/getDocumentInfo.do",
		async: false,
		data: {documentId: documentId},
		success: function(data) {
			var image = new Image();
			image.src = "data:image/"+data.fileExtensionNm+";base64,"+data.base64String;

			var viewer = new Viewer(image, {
				hidden: function () {
					viewer.destroy();
				},
				title: function (image) {
					return data.originalFileName;
				},
				toolbar: {
					prev: false,
					play: false,
					next: false,
					oneToOne: 4,
					zoomIn: 4,
					zoomOut: 4,
					oneToOne: 4,
					reset: 4,
					rotateLeft: 4,
					rotateRight: 4,
					flipHorizontal: 4,
					flipVertical: 4
				}

			});
			viewer.show();
		}
	});
}

/**
 * Show PDFView
 * @param documentId
 */
function showPDFView(docid) {
  $(this).checkOpenWindow({
    resizable : "yes",
    width : "1250",
    height : "900",
    url : "/co/popup/pdfViewer.do?documentId="+docid,
    name : "pdfViewWindow"
    });
};

/**
 * Show MS OFFICE Viewer
 * @param documentId
 */
function showOfficeView(docid) {
  $(this).checkOpenWindow({
    resizable : "yes",
    width : "1250",
    height : "900",
    url : "/co/popup/officeViewer.do?documentId="+docid,
    name : "OfficeViewer"
    });
};

function deparam(querystring) {
    querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
    var params = [], pair, d = decodeURIComponent, i;

    for (i = querystring.length; i > 0;) {
        pair = querystring[--i].split('=');
        if (d(pair[0])) {
            params.push({ "name":d(pair[0]), "value":d(pair[1]) });
        }
    }

    return params;
}


/* window popup add */
$(function(){
    var OpenWindow = function(element, options) {
        this.init(element, options)
    };
    OpenWindow.DEFAULTS = {
        resizable: "no",
        scrollbars: "yes",
        status: "yes",
        width: 1000,
        height: 650
    };
    OpenWindow.prototype.init = function(element, options){
        this.element        = $(element);
        this.options        = options;
        if(this.options.url){
            this.href       = this.options.url;
        } else{
            this.href        = this.element.attr("url");
        }
        var setWindow, windowLeft, windowTop;

        if(this.options.left){
            windowLeft = this.options.left;
        } else{
            var popWidth  = this.options.width; // 파업사이즈 너비 :: pop up size width 
            var winWidth  = window.innerWidth || document.body.clientWidth;  // 현재창의 너비 :: width of the current screen 
            var winX      = window.screenX || window.screenLeft || 0;// 현재창의 x좌표 :: x value of the current screen
            windowLeft = winX + (winWidth - popWidth) / 2;
        }

        if(this.options.top){
            windowTop= this.options.top
        } else{
            var popHeight = this.options.height; // 팝업사이즈 높이 :: height of the pop up size 
            var winHeight = window.innerHeight || document.body.clientHeight ; // 현재창의 높이 :: height of the current screen 
            var winY      = window.screenY || window.screenTop || 0; // 현재창의 y좌표 :: y value of the current screen
            windowTop = winY + (winHeight - popHeight) / 2;
        }

        setWindow = "menubar=no, ";
        setWindow += "location=no, ";
        setWindow += "resizable=" + this.options.resizable + ", ";
        setWindow += "scrollbars=" + this.options.scrollbars + ", ";
        setWindow += "status=" + this.options.status + ", ";
        setWindow += "width=" + this.options.width + ", ";
        setWindow += "height=" + this.options.height + ", ";
        setWindow += "left=" + windowLeft + ", ";
        setWindow += "top=" + windowTop;

        if (this.href.indexOf("/cm/") != -1 && this.href.indexOf("validMessageList") != -1) { // Cargo ValidMessageList Popup

            var url = this.href.split('?', 2)[0];
            var params = deparam(this.href);

            console.log('-----> Cargo validMessageList Popup');
            console.log('URL:', url);
            console.log('params:', params);

            var formObj = $("<form>", {"id":"popForm"});
            for (var x=0 ; x < params.length; x++) {
                formObj.append($("<input>", {"type":"hidden", "name":params[x].name, "value":params[x].value}));
            }
            $(document.body).append(formObj);

            var winName = "popWindow_"+Date.now();
            windowObjectReference = window.open("", winName, setWindow);

            var form = $("#popForm");
            form[0].target = winName;
            form[0].action = url;
            form[0].method = "post";
            form[0].submit();

            form.remove();

        } else {
            var name = this.options.name || "";
            windowObjectReference = window.open(this.href, name, setWindow);
        }
    };
    function openwindowPlugin(option){
        var $this = $(this);
        var data  = $this.data('windowOp');
        //var options = typeof option === 'object' && option;
        var options = $.extend({}, OpenWindow.DEFAULTS, $this.data(), typeof option === 'object' && option);
        $this.data('openwindow', (data = new OpenWindow(this, options)));
        if (typeof option === 'string') data[option]()
    }
    $.fn.checkOpenWindow             = openwindowPlugin;
});

(function ($) {
    var originalVal = $.fn.val;
    $.fn.val = function (value) {
        var res = originalVal.apply(this, arguments);

        if (this.is('textarea') && arguments.length >= 1) {
            // this is input type=text setter
            this.trigger("textarea");
        }

        return res;
    };
})(jQuery);

function boeSummaryInfoPopup(boeNo){
	var params = $.param({
		boeNo : boeNo
	});

	var url = '/cl/dl/boe/popup/selectBoeSummaryInfo.do?' + params;

	$(this).checkOpenWindow({
	resizable : "yes",
	width : "800",
	height : "750",
	url : url,
	name : "BOE Summary Information"
	})
}

function goProcessingProgressPopup(){
    var url = '/co/popup/selectProcessingProgress.do';
    var option={
		resizable : "yes",
		width : '1200px',
		height: '800px'
	};
	popup.openWindowPopup(url, "Processing_Progress_Popup", option);
}

function goPmdProcessingPopup(){
	var url = '/co/popup/selectPmdProcessing.do';
    var option={
		resizable : "yes",
		width : '1200px',
		height: '800px'
	};
	popup.openWindowPopup(url, "PMD_Processing_Popup", option);
}

function calcIntervalDate (startDate, endDate) {
	var startDateval = $("#"+startDate).val();
	var endDateval   = $("#"+endDate).val();
	var date1;
    var date2;
    var interval;

    startDateval = startDateval.split("/").join("");
    endDateval = endDateval.split("/").join("");

    if(startDateval != "" && endDateval != "") {
        date1 = new Date(startDateval.substring(4), startDateval.substring(2, 4), startDateval.substring(0, 2));
        date2 = new Date(endDateval.substring(4), endDateval.substring(2, 4), endDateval.substring(0, 2));
        interval = (date2.getTime()-date1.getTime())/(1000*60*60*24);
        return interval;
    }else{
    	return null;
    }
}

