import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
      <div>
          <div className="card" width="100%">
            <div className="card-body">
                <h5 className="card-title"> <b>{this.props.comment.user.address} </b> said</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.comment.createdAt.toString()}</h6>
                <p className="card-text">{this.props.comment.comment}</p>
            </div>
        </div>
        
      </div>
    )
  }
}
