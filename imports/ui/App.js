import React, { Component } from 'react';
import * as d3 from "d3";

export default class App extends Component {

  componentDidMount(){
      Meteor.call("getRoute", (err, result) => {
          if(err){
              throw err;
          }
          else{
            let selectedRoute = result.route[0];
            let buses = [];
            for (let bus of selectedRoute.tr) { 
                let route = bus.stop.filter((d) => d.content!=="--");
                route.forEach((d) => d.date = new Date(+d.epochTime));    
                buses.push(route);
            }
            
            console.log(buses);

            this.height = 600;
            this.svg = d3.select();;
          }
      });

  }
  render() {
    return (
      <div>
          <h1>Parcial 2 </h1>
          <div>
              <svg ref={(svg) => this.svg}>
              </svg>
          </div>
      </div>
    )
  }
}
