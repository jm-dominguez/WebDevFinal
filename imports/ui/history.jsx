import {Meteor} from "meteor/meteor";
import { Session } from 'meteor/session';
import React, { Component } from 'react'
import "./app.css";
import {Searchs} from  "../api/searchs.js";
import HistoryElement from "./historyElement.jsx";
import { withTracker } from 'meteor/react-meteor-data';

class History extends Component {
    constructor(props){
        super(props);
        this.renderElements = this.renderElements.bind(this);
        Session.set({
            historyLimit: 5,
            historyPage: 0
        })
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleFrontClick = this.handleFrontClick.bind(this);
    }
    renderElements(){
        return this.props.searchs.map((search, i) => (
            <HistoryElement search={search} key= {i} />
        ));
    }
    handleBackClick(){
        let page = Session.get("historyPage");
        if(page === 0){
            alert("you're already in the first page");
        }
        else{
            page --;
            Session.set({
                historyPage: page
            });
        }
    }
    handleFrontClick(){
        let page = Session.get("historyPage");
        let limit = Session.get("historyLimit");
        let count = this.props.count;
        if(page*limit >= count){
            alert("you're already in the last page");
        }
        else{
            page ++;
            Session.set({
                historyPage: page
            });
        }
    }
  render() {
    return (
      <div id="hist">
          <div className="row">
            <div className="col-sm-12">
                <div id="history-title">
                    <h2> Search History </h2>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
                {this.renderElements()}
            </div>
          </div>
          <div className = "row">
            <div className="col-sm-6">
                <p id="history-back" onClick={this.handleBackClick}>
                &lt; &lt;
                </p> 
            </div>
            <div className="col-sm-6">
                <p id="history-next" onClick={this.handleFrontClick}>
                &gt; &gt;
                </p>
            </div>
          </div>
      </div>
    )
  }
}

export default withTracker(() => {
    Meteor.subscribe("searchs");
    let pLimit = Session.get("historyLimit");
    let pPage = Session.get("historyPage");
    let skip = pLimit * pPage;
    return {
      searchs: Searchs.find({}, {skip:skip, limit: pLimit, sort: { createdAt: -1 }}).fetch(),
      count: Searchs.find({}).count(),
    };
  })(History);
