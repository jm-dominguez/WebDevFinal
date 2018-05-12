import {Meteor} from "meteor/meteor";
import React, { Component } from 'react';
import Emoji from 'react-emoji-render';

export default class EmojiComponent extends Component {
  constructor(props){
      super(props);

      this.handleVote = this.handleVote.bind(this);
  }
  handleVote(){
      Meteor.call("updateEmoji", this.props.emo);
  }
  render() {
    return (
      
        <div className="col-sm-2">
            <div id="emoji-container" onClick={this.handleVote}>
                <Emoji text={this.props.text} />
                {this.props.votes}
            </div>
      </div>
    )
  }
}
