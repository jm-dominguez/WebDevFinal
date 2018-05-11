import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Schedule = new Mongo.Collection("schedule");

Meteor.methods({
    "getSchedule"(agency, route){
        check(agency, String);
        check(route, String);

        let peticion = "http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=";
        peticion += agency;
        peticion += "&r=";
        peticion += route;
        let result = HTTP.call("GET",peticion);
        let schedule = JSON.parse(result.content);
        return schedule;
    },
    "getAgencies" (){
        let result = HTTP.call("GET","http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList");
        let agencies = JSON.parse(result.content);
        return agencies;
    },
    "getRoutes"(agency){
        check(agency, String);
        let peticion = "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=";
        peticion += agency;
        let result = HTTP.call("GET",peticion);
        let agencies = JSON.parse(result.content);
        return agencies;
    }
});