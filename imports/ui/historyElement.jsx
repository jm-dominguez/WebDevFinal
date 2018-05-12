import React, { Component } from 'react'

export default class HistoryElement extends Component {
  render() {
    return (
      <div>
        <div className="card" width="100%">
            <div className="card-body">
                <h5 className="card-title"> <b>{this.props.search.user.address} </b> searched</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.search.createdAt.toString()}</h6>
                <p className="card-text">Agency: {this.props.search.agency} Route: {this.props.search.route}</p>
            </div>
        </div>
        
      </div>
    )
  }
}
