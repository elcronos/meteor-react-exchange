import { Meteor } from 'meteor/meteor'
import { Countries } from '/models/collections.js'
import { Message } from '/models/message.js'
import { Avatars } from '/models/collections'
//import { Counts } from 'meteor/tmeasday:publish-counts'

if(Meteor.isServer){
  Meteor.publish("countries", function () {
      return Countries.find({}, {sort: {label: 1}, limit: 5});
  });

  Meteor.publish("users", function () {
    return Meteor.users.find({});
  });

  Meteor.publish('messages', () =>{
    return Message.find({})
  })

  Meteor.publish('userPhoto', ()=>{
    return Avatars.find()
  })

  

}
