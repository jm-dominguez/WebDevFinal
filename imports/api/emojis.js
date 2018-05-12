import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Emojis = new Mongo.Collection("emojis");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("emojis", function emojiPublication() {
      return Emojis.find();
    });
  }

Meteor.methods({
    "addEmoji"(text, comment){
        check(text, String);
        check(comment, String);

        Emojis.insert({
            text,
            comment,
            votes: 1
        });
    },
    "updateEmoji"(id){
        check(id, String);

        Emojis.update(id, {$inc:{votes: 1}});
    }
});