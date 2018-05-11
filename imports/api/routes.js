import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Schedule = new Mongo.Collection("schedule");

Meteor.methods({
    "getRoute"(){
        let result = HTTP.call("GET","http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=sf-muni&r=N");
        let schedule = JSON.parse(result.content);
        return schedule;
    }
});