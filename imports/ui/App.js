import React, { Component } from 'react';
import * as d3 from "d3";
import Graphic from "./graphic.jsx";
import "./app.css";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            agencies: [],
            routes: [],
            info: []
        }
        this.handleAgencyChange = this.handleAgencyChange.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    renderAgencies(){
        let agencias = this.state.agencies;
        
        return agencias.map((agencia, i) => (
            <option value = {agencia.tag} key = {i}/>
        ));
    }

    renderRoutes(){
        let routes = this.state.routes;
        
        return routes.map((ruta, i) => (
            <option value = {ruta.tag} key = {i}/>
        ));
    }

    handleAgencyChange(e){
         let agency = this.refs.agencies.value;
         Meteor.call("getRoutes", agency, (err, result)=>{
             if(err){
                 return err;
             }
             else{
                 this.setState({routes: result.route});
             }
         });
    }

    handleRouteChange(e){
        let agency = this.refs.agencies.value;
        let route = this.refs.routes.value;
        Meteor.call("getSchedule", agency, route, (err, result)=>{
            if(err){
                return err;
            }
            else{
                console.log(result);
                this.setState({
                    info: result
                });
            }
        });

    }

    handleReset(e){
        this.refs.graphic.handleReset();
        this.refs.agencies.value = "";
        this.setState({
            routes: [],
            info: []
        });
    }
    

  componentDidMount(){
      Meteor.call("getAgencies", (err, result)=>{
            this.setState({agencies: result.agency});
      })
  }
  render() {
    return (
      <div>
          <h1>Parcial 2 </h1>
          <div className="row">
            <div className="col-sm-8">
                <label>
                    1. Please select your bus agency
                    <input list="agencies" name="myAgencies" ref="agencies" />
                    <datalist id="agencies" >
                        {this.renderAgencies()}
                    </datalist>
                    <button type="button" className="btn btn-primary" onClick={this.handleAgencyChange}>OK</button>
                </label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
            {this.state.routes.length === 0 ? "":
            <label>
            2. Please select your route
            <input list="routes" name="myRoutes" ref="routes" />
            <datalist id="routes" >
                {this.renderRoutes()}
            </datalist>
            <button type="button" className="btn btn-primary" onClick={this.handleRouteChange}>Search</button>
            </label>
        }
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
            {this.state.routes.length === 0 ? "": <button type="button" className="btn btn-primary" onClick={this.handleReset}>Reset</button>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
            </div>
            <div className="col-sm-10">
                {this.state.info.lenght === 0 ? "": <Graphic ref="graphic" info={this.state.info}/>}
            </div>
          </div>
      </div>
    )
  }
}
