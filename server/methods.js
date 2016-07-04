import { Meteor } from 'meteor/meteor'
import { Message } from '/models/message.js'
import { Avatars } from '/models/collections'

Meteor.methods({
  updateUser: (id, data)=>{
    Meteor.users.update(id, {$set: {profile: data}})
  },
  createMessage: (message) =>{
    Message.insert(message)
  },
  messageCount: () =>{
    let count = Message.find().count()
    console.log('Contador:'+count)
    return count
  }
});
