TRIIBE WEB VISUALISATION
========================

This is part of the "TRIIBE(Tracking Indoor Information Behaviour) 
Smartphone App for Personalised Recommendations" Capstone Programming
Project for CSIT Students at RMIT, done during Semester 2, 2016.

This is used with the TRIIBE Android App, and when hosted, the app
should link to the website for visusalisation of that user.

Building
--------

To build and host the webapp, the git repo must first be cloned

	git clone http://github.com/mzhr/triibe-webapp

To build make sure the following are installed if using a unix system

+ npm
+ node

and build using the following

	npm run webpack-prod


Development
-----------

#### Building 
Static files such as css and html files can be changed at any time.
Anything in the js/ directory if changed must be rebuilt using

	npm run webpack

#### Architecture

The source has a main entry point being js/scripts.js which is minified
into js/scripts.min.js which is included in the html file.

The code will get jqeury as a dependency for d3.js which will be a
dependency for the visusalisation module.

The visualisation module js/graph.js will retrieve data from
firebase.js and create the user/session buttons and then
load data for that user.

#### Hosting

After building, host on a static hosting system such as github pages
as it is currently on or another websystem. 

Developing locally will not work as firebase connection is needed
and this will not work unless the connection is from a http or
https connection.

#### Javascript libraries used

+ webpack, for building
+ babel, for ES6
+ firebase, for firebase connection and data retrival
+ d3.js, for visusalisation methods
+ bootstrap, for stylesheet framework
+ jquery, dependency for bootstrap

