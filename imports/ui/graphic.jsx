import React, { Component } from 'react'
import * as d3 from "d3";
export default class Graphic extends Component {
    constructor(props){
        super(props);
        this.height = 600;
        this.width = 858;
        this.margin = ({top: 20, right: 30, bottom: 30, left: 150});
        this.state = {
            
        }
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset(){
        d3.select(this.svg).html("");
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.info){
            let result = nextProps.info;
            if(result.route === undefined || result.route.length === 0){
                if(result.copyright){
                    alert("There are no schedules for this route");
                }
            }
            else{
                
                let selectedRoute = result.route[0];
                let buses = [];
                for (let bus of selectedRoute.tr) { 
                    let route = bus.stop.filter((d) => d.content!=="--");
                    route.forEach((d) => d.date = new Date(+d.epochTime));    
                    buses.push(route);
                }
                
        
    
                
                const svg = d3.select(this.svg);
                svg.html("");
                const minDate = d3.min(buses[0], d => d.date);
                const maxDate = new Date(minDate.getTime() + 22*60*60*1000); // minDate + 24 hours
                const x = d3.scaleTime()
                .domain([ minDate, maxDate ])
                .range([this.margin.left, this.width - this.margin.right]);
                const y = d3.scaleBand()
                .domain(d3.range(buses[1].length))
                .rangeRound([this.height - this.margin.bottom, this.margin.top]);
        
                const xAxis = g => g
                .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
                .call(d3.axisBottom(x))
                // .call(g => g.select(".domain").remove());
                const yAxis = g => g
                .attr("transform", `translate(${this.margin.left},0)`)
                .call(d3.axisLeft(y)
                    .tickFormat((d) => selectedRoute.header.stop[d].content));  
    
                const line = d3.line()
                    .x(d => x(d.date))
                    .y((d,i) => y(i) + y.bandwidth()/2);
    
                svg.append("g")
                    .call(xAxis);
    
                svg.append("g")
                    .call(yAxis);
                
                svg.selectAll(".routes")
                    .data(buses)
                    .enter()
                    .append("path")
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 2)
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("d", line);
                }

        }
    }
  render() {
    return (
      <div>
        <svg ref={(svg) => this.svg = svg} width={this.width} height={this.height}>
        </svg>
      </div>
    )
  }
}
