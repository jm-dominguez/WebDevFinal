import {Meteor} from "meteor/meteor";
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import {Comentarios} from  "../api/comments.js";
import Comment from "./comment.jsx";
import { withTracker } from 'meteor/react-meteor-data';

class Comments extends Component {
  constructor(props){
      super(props);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      Session.set({
        commentsLimit: 5,
        commentsPage: 0,
        commentsAgency: props.agency,
        commentsRoute: props.route
    })
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleFrontClick = this.handleFrontClick.bind(this);
  }
  componentWillReceiveProps(nextProps){
    Session.set({
        commentsAgency: nextProps.agency,
        commentsRoute: nextProps.route
    });
  }
  handleBackClick(){
    let page = Session.get("commentsPage");
    if(page === 0){
        alert("you're already in the first page");
    }
    else{
        page --;
        Session.set({
            commentsPage: page
        });
    }
}
handleFrontClick(){
    let page = Session.get("commentsPage");
    let limit = Session.get("commentsLimit");
    let count = this.props.count;
    if(page*limit >= count){
        alert("you're already in the last page");
    }
    else{
        page ++;
        Session.set({
            commentsPage: page
        });
    }
}

  renderComments(){
      return this.props.comments.map((comment, i)=>(
          <Comment comment={comment} key={i}/>
      ));
  }

  handleCommentSubmit(){
      let comentario = this.refs.comentario.value;
        Meteor.call("addComment", this.props.agency, this.props.route, comentario, function(err, res){
            if (err){
                alert(err);
            }
        });
      this.refs.comentario.value="";
  }
  render() {
    return (
      <div id="comm">
        <div className="row">
            <div className="col-sm-12">
                <div id="comments-title">
                    <h2> Comments </h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <div id="add-comment">
                    <div className="row">
                        <div className="col-sm-12">
                            {(this.props.agency === "" || this.props.route ==="") ? <p className="warning">You need to be in a route to comment </p>
                            :
                            <textarea name="textarea" rows="5" cols="45" ref="comentario" placeholder="Comment this route here"></textarea>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {(this.props.agency === "" || this.props.route ==="") ? "": <button type="button" className="btn btn-primary" onClick={this.handleCommentSubmit}>Send</button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {this.renderComments()}
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
            </div>
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
    Meteor.subscribe("comments");
    let pLimit = Session.get("commentsLimit");
    let pPage = Session.get("commentsPage");
    let skip = pLimit * pPage;
    let agency = Session.get("commentsAgency");
    let routes = Session.get("commentsRoute");
    if(agency === "" && routes === ""){
        return {
            comments: Comentarios.find({}, {skip:skip, limit: pLimit, sort: { createdAt: -1 }}).fetch(),
            count: Comentarios.find({}).count(),
          };
    }
    else if(agency !== ""){
        return {
            comments: Comentarios.find({agency: agency}, {skip:skip, limit: pLimit, sort: { createdAt: -1 }}).fetch(),
            count: Comentarios.find({agency: agency}).count(),
          };   
    }
    else{
        return {
            comments: Comentarios.find({agency: agency, route: routes}, {skip:skip, limit: pLimit, sort: { createdAt: -1 }}).fetch(),
            count: Comentarios.find({agency: agency}).count(),
          };
    }
  })(Comments);