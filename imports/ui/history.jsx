import {Meteor} from "meteor/meteor";
import React, { Component } from 'react'
import "./app.css";
import {Searchs} from  "../api/searchs.js";
import { withTracker } from 'meteor/react-meteor-data';

class History extends Component {
  render() {
    console.log(this.props.searchs);
    return (
      <div id="hist">
          <div className="row">
            <div className="col-sm-12">
                <div id="history-title">
                    <h2> Search History </h2>
                </div>
            </div>
          </div>
      </div>
    )
  }
}

export default withTracker(() => {
    Meteor.subscribe("searchs");
    return {
      searchs: Searchs.find({}).fetch(),
    };
  })(History);
