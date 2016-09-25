import * as d3 from "d3";

var container = document.getElementById('vis-block');
var style = window.getComputedStyle(container);
var width = parseInt(style.getPropertyValue('width'));
var contentWidth = (width - 120) + "px";

var contentBlock = d3.select('#vis-block-content');
var graphScale = d3.scaleLinear().domain([0, 24]).range([0, contentWidth]);
var graphClass = 'graph-block';
var appTimeLine = 'app-time-line';
var urlTimeLine = 'url-time-line';
var grey = '#333';

AppTimeLine();
URLTimeLine();

function AppTimeLine() {
	contentBlock.append('div').attr('class', graphClass).attr('id', appTimeLine);
	d3.select('#' + appTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px');
	d3.select('#' + appTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px')
		.style('transform', 'translate('+ graphScale(24) + ', -30px)')
		.style('position', 'absolute');
	d3.select('#' + appTimeLine).append('h6')
		.style('transform', 'translate('+ (-20)+"px" + ', -0px)')
		.html("00:00am");
	d3.select('#' + appTimeLine).append('h6')
		.style('transform', 'translate('+ ((parseInt(graphScale(24))-20)+"px") + ', -30px)')
		.style('position', 'absolute')
		.html("23:49pm");
}

function URLTimeLine() {
	contentBlock.append('div').attr('class', graphClass).attr('id', appTimeLine);
	d3.select('#' + appTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px');
	d3.select('#' + appTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px')
		.style('transform', 'translate('+ graphScale(24) + ', -30px)')
		.style('position', 'absolute');
	d3.select('#' + appTimeLine).append('h6')
		.style('transform', 'translate('+ (-20)+"px" + ', -0px)')
		.html("00:00am");
	d3.select('#' + appTimeLine).append('h6')
		.style('transform', 'translate('+ ((parseInt(graphScale(24))-20)+"px") + ', -30px)')
		.style('position', 'absolute')
		.html("23:49pm");
}


