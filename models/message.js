import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment';

export const Message = new Mongo.Collection('message');

Message.helpers({
  MessageDate(){
    return moment(this.createdAt).fromNow();
  }
})

MessageSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      }
    }
  },
  content: {
    type: String,
    min: 0,
    max: 250
  },
  authorName: {
    type: String
  },
  authorId:{
    type: String
  },
  sentTo: {
    type: String
  },
  isSeen:{
    type: Boolean,
    autoValue: function(){
      if(this.isInsert){
        return false;
      }
    }
  },
  dateSeen:{
    type: Date,
    optional: true
  }

})

Message.attachSchema(MessageSchema)
