import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import * as d3 from "d3";
 
import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
