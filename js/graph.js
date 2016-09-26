import * as d3 from 'd3';
import * as fb from './firebase.js';

var graphClass = 'graph-block';
var urlTimeLine = 'url-time-line';
var grey = '#333';

// Get the width of the block that will hold the visualisation when opened
var container = document.getElementById('vis-block');
var style = window.getComputedStyle(container);
var width = parseInt(style.getPropertyValue('width'));
var contentWidth = (width - 120) + 'px';

// Create a scale for visualising based on width of page.
var contentBlock = d3.select('#vis-block-content');
var graphScale = d3.scaleLinear().domain([0, 24]).range([0, contentWidth]);

// Initialise the firebase database, authenticate if needed
fb.initFirebase();

// Draw the URL visualisation graph.
URLTimeLine();

function URLTimeLine() {

	// Draw the outline of the graph with times
	contentBlock.append('div').attr('class', graphClass).attr('id', urlTimeLine);
	d3.select('#' + urlTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px');
	d3.select('#' + urlTimeLine).append('div')
		.style('background-color', grey)
		.style('height', '30px')
		.style('width', '3px')
		.style('transform', 'translate('+ graphScale(24) + ', -30px)')
		.style('position', 'absolute');
	d3.select('#' + urlTimeLine).append('h6')
		.style('transform', 'translate('+ (-20)+"px" + ', -0px)')
		.html("00:00am");
	d3.select('#' + urlTimeLine).append('h6')
		.style('transform', 'translate('+ ((parseInt(graphScale(24))-20)+"px") + ', -30px)')
		.style('position', 'absolute')
		.html("23:49pm");

	// Retrieve data from the firebase database and draw each point
	setTimeout(function delayDrawAllIPData() { 
		console.log("Drawing IP Data.");
		fb.IPData.forEach(function addIPDataItem(value) {
			time = value[0].split(':');
			hour = parseInt(time[0], 10);
			minute = parseInt(time[1], 10);
			second = parseInt(time[2], 10);
			var pos = hour + minute*0.01 + second*0.0001;
			d3.select('#' + urlTimeLine).append('div').attr('class', 'dataItem')
				.style('background-color', 'blue')
				.style('height', '10px')
				.style('width', '1px')
				.style('transform', 'translate('+ graphScale(pos) + ', -20px)')
				.style('position', 'absolute');
		});
	}, 5000);
}


