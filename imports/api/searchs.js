import {Meteor} from "meteor/meteor";
import { Mongo } from 'meteor/mongo';
import {check} from "meteor/check";

export const Searchs = new Mongo.Collection('searchs');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('searchs', function searchPublication() {
      return Searchs.find();
    });
  }

Meteor.methods({
    "insertSearch"(agency, route){
        check(agency, String);
        check(route, String);

        let user = "unknown";
        if(Meteor.user()){
            user = Meteor.user().emails[0];
        }

        Searchs.insert({
            agency,
            route,
            createdAt: new Date(),
            user
        });


    }
});
