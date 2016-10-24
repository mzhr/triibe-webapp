import * as d3 from 'd3';
import * as fb from './firebase.js';

var graphBlockId = 'graph-block';
var timeLineId = 'time-line';
var grey = '#333';

// Get the width of the block that will hold the visualisation when opened
var container = document.getElementById('vis-block');
var style = window.getComputedStyle(container);
var width = parseInt(style.getPropertyValue('width'));
// var contentWidth = (width - 120) + 'px';
var graphHeight = 600;

// Create a scale for visualising based on width of page.
var contentBlock = d3.select('#vis-block-content');
contentBlock.append('div').attr('id', graphBlockId);
var graphBlock = d3.select('#graph-block');
graphBlock.append('div').attr('id', timeLineId)
	.style('padding', '30px');
var timeLineBlock = d3.select('#time-line');
var graphScale = d3.scaleLinear().domain([0, 24]).range([graphHeight, 0]);

// Initialise the firebase database, authenticate if needed
fb.initFirebase();

// Draw the URL visualisation graph.
drawTimeLine();

function drawTimeLine() {
	// Draw timeline
	timeLineBlock.append('div')
		.style('background-color', grey)
		.style('height', '3px')
		.style('width', '20px');
	timeLineBlock.append('div')
		.style('background-color', grey)
		.style('height', graphHeight+'px')
		.style('width', '3px');
	timeLineBlock.append('div')
		.style('background-color', grey)
		.style('height', '3px')
		.style('width', '20px');

	// Draw times
	for (var i = 0; i < 25; i++) {
		var htmlValue = '';
		if (i < 10) {
			htmlValue = '0' + i + 'am';
		} else if (i < 12 && i > 9) {
			htmlValue = i + 'am';
		} else if (i == 24) {
			htmlValue = '00am';
		} else {
			htmlValue = i + 'pm';
		}
		graphBlock.append('h6')
			.style('transform', 'translate(-5px, -' + (graphScale(i)+50) + 'px) rotate(-20deg)')
			.style('position', 'absolute')
			.html(htmlValue);
	}

	// Draw First Timeline
	timeLineBlock.append('div')
		.style('background-color', grey)
		.style('height', '3px')
		.style('width', '40px')
		.style('transform', 'translate(60px, -'+ (graphHeight+6) + 'px)');
	timeLineBlock.append('div')
		.style('background-color', grey)
		.style('height', '3px')
		.style('width', '40px')
		.style('transform', 'translate(60px' + ', -6px)');

	var ipData = [];
	var dataInterval = setInterval(function getDataDelay() { 
		ipData = fb.getIPData('25-09-2016');
	}, 1000);
	var cancleInterval = setInterval(function cancleDataDelay() { 
		if (ipData.length != 0) { 
			clearInterval(dataInterval); 
			clearInterval(cancleInterval);
			console.log(ipData);
			ipData.sort(function(a,b){
				var stringA = a[0].split(':');
				var timeA = parseInt(stringA[0], 10) + 
					parseInt(stringA[1], 10)*0.01 + 
					parseInt(stringA[2], 10)*0.0001;
				var stringB = b[0].split(':');
				var timeB = parseInt(stringB[0], 10) + 
					parseInt(stringB[1], 10)*0.01 + 
					parseInt(stringB[2], 10)*0.0001;
				return timeA-timeB;
			});
			drawData(ipData);
		}
	}, 1000);
}

function drawData(dataSet) {
	// Retrieve data from the firebase database and draw each point
	var previousTime = 0.0;
	dataSet.forEach(function addIPDataItem(value) {

		var string = value[0].split(':');
		var time = parseInt(string[0], 10) + 
			parseInt(string[1], 10)*0.01 + 
			parseInt(string[2], 10)*0.0001;
		if (previousTime == time) {
			return;
		} else {
			console.log(value);
			timeLineBlock.append('div').attr('class', 'dataItem')
				.style('background-color', 'blue')
				.style('height', '0.5px')
				.style('width', '40px')
				.style('transform', 'translate(60px, -' + (graphScale(time)) + 'px)')
				.style('position', 'absolute');
			previousTime = time;
		}
	});
}


