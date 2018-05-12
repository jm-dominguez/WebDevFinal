import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Comentarios = new Mongo.Collection("comments");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("comments", function commentPublication() {
      return Comentarios.find();
    });
  }

Meteor.methods({
    "addComment"(agency, route, comment){
        check(agency, String);
        check(route, String);
        check(comment, String);

        if(Meteor.user()){
            let user = Meteor.user().emails[0];
            Comentarios.insert({
                agency,
                route,
                comment,
                user,
                createdAt: new Date()
            });
        }
        else{
            throw new Meteor.Error(403,"You need to be logged in to comment");
        }
    },
});