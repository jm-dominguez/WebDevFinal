import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import {Emojis} from "../api/emojis.js";
import EmojiComponent from "./EmojiComponent.jsx";

class Comment extends Component {
  constructor(props){
    super(props);
    Session.set({
      "id": this.props.comment._id
    });
    this.handleCreate = this.handleCreate.bind(this);
  }

  

  handleCreate(){
    let text = this.refs.addemoji.value;
    if(text === ""){
      alert("You must include 1 emoji");
    }
    else{
      let id = this.props.comment._id;
      Meteor.call("addEmoji", text, id);
    }
    this.refs.addemoji.value="";
  }
  render() {
    return (
      <div>
          <div className="card" width="100%">
            <div className="card-body">
                <h5 className="card-title"> <b>{this.props.comment.user.address} </b> said</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.comment.createdAt.toString()}</h6>
                <p className="card-text">{this.props.comment.comment}
                <br/>
                  agency: {this.props.comment.agency}
                <br/>
                 route: {this.props.comment.route}
                </p>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <input type="text" ref="addemoji" placeholder="Add a Emoji e.g :blush:"/>
              </div>
              <div className="col-sm-3">
                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleCreate}>+</button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="row">
                  {this.props.emojis.map((emoji, i)=>(
                    emoji.comment === this.props.comment._id ? <EmojiComponent key={i} text={emoji.text} emo={emoji._id} votes = {emoji.votes}/> : ""
                  ))}
                </div>
              </div>
            </div>
        </div>
        
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe("emojis");
  return {
    emojis: Emojis.find().fetch()
  };
})(Comment);
