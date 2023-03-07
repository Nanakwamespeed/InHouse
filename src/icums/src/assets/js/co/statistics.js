
/** Chart Option
    // caption: "Average Fastball Velocity", // Title
    // yaxisname: "Velocity (in mph)", // Y axis name :: Y축명
    // subcaption: "[2005-2016]", // subTitle
    // yAxisMinValue   : Specify the starting value for the y-axis :: Y축의 시작값을 지정
    // yAxisMinValue: minValue,
    yAxisMaxValue: maxValue,
    // yAxisValuesStep: "1",
    thousandSeparator: ",",
    // yAxisMaxValue  : Specify the last value of the y-axis (MIN, MAX) to be the range of the y-axis. ) :: Y축의 마지막값을 지정 (MIN, MAX로 설정하면 Y축의 범위 지정이 된다. )
	// lineThickness  : Thickness of Default Lines :: 기본 선의 두께
	// showValues  : "1", // Whether to text or not each point's value (0/1). :: 각 지점들의 값을 텍스트로 표시할것인지 말것인지 (0/1)
	// anchorRadius : Size of round dots at each point. :: 각 지점들의 둥근 점의 크기.
	// labelStep     : Determining how many steps to display the label on the X- :: 몇step에 한번씩 X축의 Label을 표시할것인지 결정
    showhovereffect: "1",
    // numbersuffix: " mph", // Y-Axis Unit :: Y축 단위
    drawcrossline: "1",
    // rotatelabels: "1", // Rotate the X-axis Label :: X축 라벨 회전
    setadaptiveymin: "1",
    plottooltext: "$seriesName: <b>$displayValue</b>",
    showLegend: "0", // Legend showable
    baseFontSize: "12",
    theme: "fusion"
    chartBottomMargin: "1",
    // captionPadding: "1",
    // xAxisNamePadding: "1",
    // yAxisNamePadding: "1",
    // yAxisValuesPadding: "1",
    // labelPadding: "1",
    // valuePadding: "1",
    // canvasPadding: "1",
    // canvasBottomPadding: "1"
**/
/*****************************************************
* Number of export reports compared to the number of import reports per month :: 월별 수입신고건수 대비 수출신고건수
******************************************************/
function stat_selectImExList() {
	$.ajax({
        type: "POST",
        url: '/cmm/stat/selectImExList.do',
        success: function(data) {
            if(ObjectUtil.isEmpty(data.statJList)) {
                console.log('Dev Mode is no Chart.');
                return;
            }         
        	var labelList = [];
        	var importList = [];
        	var exportList = [];
        	var minValue = 1000;
        	var maxValue = 0;
        	for(var i=0; i<data.statJList.length; i++){
        		labelList.push({label: data.statJList[i].yyyymm});
        		importList.push({value: data.statJList[i].im, displayValue: StringUtil.numComma(data.statJList[i].im)});
        		exportList.push({value: data.statJList[i].ex, displayValue: StringUtil.numComma(data.statJList[i].ex)});

        		// minValue
        		/*if(minValue > data.statJList[i].im){
        			minValue = parseInt(data.statJList[i].im);
        		}
        		if(minValue > data.statJList[i].ex){
        			minValue = parseInt(data.statJList[i].ex);
        		}

        		// maxValue
        		if(maxValue < data.statJList[i].im){
        			maxValue = parseInt(data.statJList[i].im);
        		}
        		if(maxValue < data.statJList[i].ex){
        			maxValue = parseInt(data.statJList[i].ex);
        		}*/
        	}

        	// maxValue = Math.ceil(maxValue*0.002)*500;
        	// minValue = minValue < 500? 0 : minValue-500;

        	const dataSource = {
        		chart: {
    			    // yAxisMaxValue: maxValue,
    			    drawcrossline: "1",
    			    rotatelabels: "1", // Rotate the X-axis Label :: X축 라벨 회전
    			    setadaptiveymin: "1",
    			    plottooltext: "$seriesName: <b>$displayValue</b>",
    			    showLegend: "0", // Legend showable
    			    baseFontSize: "12",
    			    chartTopMargin: "5",
    			    chartBottomMargin: "1",
    			    theme: "fusion",
    			    numVisiblePlot: "12",
    			    scrollToEnd:"1"
    			    // flatscrollbars: "0"
    			    // palettecolors: "ff0000,00ff00,0000ff"
				},
				categories: [{ category: labelList}],
				dataset: [
					{seriesname: "Import", data: importList},
					{seriesname: "Export", data: exportList}
				]
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "scrollline2d",	//msline
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			    dataFormat: "json",
      			    dataSource
      			  }).render();
			});
        }
     });

}

/*****************************************************
* Status of the top 10 national import reports per month :: 월별 국가 수입신고건수 상위10위 현황
******************************************************/
function stat_selectCountry10List(selectedMMYYYY) {
	$.ajax({
        type: "POST",
        url: '/cmm/stat/selectCountry10List.do',
        data: {declarationMon: selectedMMYYYY},
        success: function(data) {

        	var dataList = [];
        	for(var i=0; i<10; i++){
        		dataList.push({
        			label: data.statJList[i].cntryCd,
        			value: data.statJList[i].boeCnt,
        			tooltext: data.statJList[i].cntryNm + ': <b>$percentValue</b>'});
        	}

        	const dataSource = {
        		chart: {
    			    // plottooltext: "$display: <b></b>",
    			    showLegend: "0", // Legend showable
    			    showpercentvalues: "1",
    			    usedataplotcolorforlabels: "1",
    			    baseFontSize: "12",
    			    chartBottomMargin: "-10",
    			    chartTopMargin: "-20",
    			    theme: "fusion"
				},
				data: dataList
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "pie2d",
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			  	dataFormat: "json",
      			    dataSource
      			  }).render();
			});
        }
     });

}

/*****************************************************
* HS Top 5 Status of the Top 10 Countries in the Monthly Number of National Import Reporting :: 월별 국가 수입신고건수 상위10국가의 HS상위5위 현황
******************************************************/
function stat_selectHs5List(selectedMMYYYY) {
	$.ajax({
        type: "POST",
        url: '/cmm/stat/selectHs5List.do',
        data: {declarationMon: selectedMMYYYY},
        success: function(data) {

        	var dataList = [];
        	for(var i=0; i<5; i++){
        		// var hsCd = data.statJList[i].hsCd;
        		// hsCd = hsCd.substring(0, 5) + "<br>" + hsCd.substring(5, hsCd.length);
        		var label = data.statJList[i].hsDescriptionCn;
        		if(label.length < 60){
        			label = label.substring(0, 30) + "<br>" + label.substring(30, label.length);
        		}else{
        			label = label.substring(0, 30) + "<br>" + label.substring(30, 60) + "<br>" + label.substring(60, label.length);
        		}

        		dataList.push({
        			label: data.statJList[i].hsCd,
        			value: data.statJList[i].boeCnt,
        			tooltext: label + ': <b>$percentValue</b>'});
        	}

        	const dataSource = {
        		chart: {
        			// plottooltext: "$label: <b>$percentValue</b>",
    			    showLegend: "0", // Legend showable
    			    showpercentvalues: "1",
    			    usedataplotcolorforlabels: "1",
    			    baseFontSize: "12",
    			    chartBottomMargin: "-10",
    			    chartTopMargin: "-20",
    			    chartLeftMargin: "30",
    			    // showLabels: "0",
    			    theme: "fusion"
				},
				data: dataList
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "pie2d",
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			  	dataFormat: "json",
      			    dataSource
      			  }).render();
			});
        }
     });

}

/*****************************************************
* Monthly collection amount :: 월별 징수금액
******************************************************/
function stat_selectColList() {
	$.ajax({
        type: "POST",
        url: '/cmm/stat/selectColList.do',
        success: function(data) {

        	var labelList = [];
        	var colList = [];
        	for(var i=0; i<data.statJList.length; i++){
        		labelList.push({label: data.statJList[i].yyyymm});
        		colList.push({value: data.statJList[i].sum, displayValue: StringUtil.numComma(data.statJList[i].sum)});
        	}

        	const dataSource = {
        		chart: {
    			    // yAxisMaxValue: maxValue,
    			    drawcrossline: "1",
    			    rotatelabels: "1", // Rotate the X-axis Label :: X축 라벨 회전
    			    setadaptiveymin: "1",
    			    plottooltext: "$seriesName: <b>$displayValue</b>",
    			    showLegend: "0", // Legend showable
    			    baseFontSize: "12",
    			    chartBottomMargin: "1",
    			    theme: "fusion"
				},
				categories: [{ category: labelList}],
				dataset: [
					{seriesname: "Collection", data: colList}
				]
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "msline",
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			  	dataFormat: "json",
      			    dataSource
      			  }).render();
			});
        }
     });

}

/*****************************************************
* Export amount of exported goods in five main areas of interest :: 주요관심 5분야 수출물품 수출금액
******************************************************/
function stat_selectInterest5List(selectedMMYYYY) {
	$.ajax({
        type: "POST",
        url: '/cmm/stat/selectInterest5List.do',
        data: {declarationMon: selectedMMYYYY},
        success: function(data) {

        	var dataList = [];
        	for(var i=0; i<data.statJList.length; i++){
        		var label = data.statJList[i].specificSectors;
        		dataList.push({
        			label: label,
        			value: data.statJList[i].boeItemAmt,
        			tooltext: label + ': <b> $percentValue </b>'
        			// tooltext: label + ': <b>' + StringUtil.numComma(data.statJList[i].boeItemAmt) + '</b>'
        			});
        	}

        	const dataSource = {
        		chart: {
        			// plottooltext: "$label: <b>$percentValue</b>",
    			    showLegend: "0", // Legend showable
    			    showpercentvalues: "1",
    			    usedataplotcolorforlabels: "1",
    			    baseFontSize: "12",
    			    chartBottomMargin: "-10",
    			    chartTopMargin: "-20",
    			    chartLeftMargin: "30",
    			    // showLabels: "0",
    			    labelDisplay: "wrap",
    			    theme: "fusion"
				},
				data: dataList
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "pie2d",
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			  	dataFormat: "json",
      			    dataSource
      			  }).render();
			});

        	/*var labelList = [];
        	var intrst01List = [];
        	var intrst02List = [];
        	var intrst03List = [];
        	var intrst04List = [];
        	var intrst05List = [];
        	for(var i=0; i<12; i++){
        		labelList.push({label: data.statJList[i].yyyymm});
        		intrst01List.push({value: data.statJList[i].intrst01, displayValue: StringUtil.numComma(data.statJList[i].intrst01)});
        		intrst02List.push({value: data.statJList[i].intrst02, displayValue: StringUtil.numComma(data.statJList[i].intrst02)});
        		intrst03List.push({value: data.statJList[i].intrst03, displayValue: StringUtil.numComma(data.statJList[i].intrst03)});
        		intrst04List.push({value: data.statJList[i].intrst04, displayValue: StringUtil.numComma(data.statJList[i].intrst04)});
        		intrst05List.push({value: data.statJList[i].intrst05, displayValue: StringUtil.numComma(data.statJList[i].intrst05)});

        	}

        	const dataSource = {
        		chart: {
    			    // yAxisMaxValue: maxValue,
    			    drawcrossline: "1",
    			    // rotatelabels: "1", // Rotate the X-axis Label :: X축 라벨 회전
    			    setadaptiveymin: "1",
    			    plottooltext: "$seriesName: <b>$displayValue</b>",
    			    showLegend: "0", // Legend showable
    			    showsum: "1", // Show Total :: 합계 보이기
    			    baseFontSize: "12",
    			    drawcrossline: "1",
    			    chartBottomMargin: "1",
    			    theme: "fusion"
				},
				categories: [{ category: labelList}],
				dataset: [
					{seriesname: data.statJList[0].intrst01Nm, data: intrst01List},
					{seriesname: data.statJList[0].intrst02Nm, data: intrst02List},
					{seriesname: data.statJList[0].intrst03Nm, data: intrst03List},
					{seriesname: data.statJList[0].intrst04Nm, data: intrst04List},
					{seriesname: data.statJList[0].intrst05Nm, data: intrst05List}
				]
			};

			FusionCharts.ready(function() {
      			var myChart = new FusionCharts({
      			    type: "stackedcolumn2d",
      			    renderAt: "chart-container",
      			    width: "100%",
      			    height: "180",
      			  	dataFormat: "json",
      			    dataSource
      			  }).render();
			});*/
        }
     });

}
