import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import Chat from '/imports/ui/components/Chat'
import ChatCurrent from '/imports/ui/components/ChatCurrent'
import { Message } from '/models/message.js'
//import { Counts } from 'meteor/tmeasday:publish-counts'
// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ChatPage extends TrackerReact(React.Component){
  constructor(){
    super()
    this.getMessages = this.getMessages.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.getMessagesCount = this.getMessagesCount.bind(this)
    this.state = {
      subscription: {
        messages: Meteor.subscribe('messages')
      },
      inputMessage: ''
    }
  }

  onChangeMessage(event){
    this.setState({inputMessage: this.refs.message.value})
  }

  sendMessage(){
    let message = {
      createdAt : new Date(),
      content : this.state.inputMessage,
      authorName : Meteor.user().username,
      authorId : Meteor.userId(),
      sentTo : Session.get('chatUserId')
    }
    this.setState({inputMessage:''})
    Meteor.call('createMessage',message)

  }
  scrollDown(){
    let isLastChild= $('#mychatlist li:last-child').offset()
    if(!!isLastChild){
      $('body,html').animate({
        scrollTop: isLastChild.top + 'px'
      }, 'slow');
    }
  }
  componentDidUpdate(){
    console.log('Updated')
    this.updateCounter()
    //Scrolldown when a new element is inserted
    this.scrollDown();
  }

  updateCounter() {
    console.log("this is the new count: ", Message.find().count())
  }

  componentWillUnmount(){
    this.state.subscription.messages.stop();
  }

  getMessages(){
    //return Message.find({},{sort: {createdAt: 1},limit:10}).fetch()
    return Message.find({
        $and:
        [ {$or:[{authorId: Meteor.userId()},{authorId:Session.get('chatUserId')}]},
          {$or:[{sentTo: Meteor.userId()},{sentTo: Session.get('chatUserId')}]}
        ]
    }).fetch()
  }

  getMessagesCount(){
    let count = Meteor.call('messageCount')

    console.log('Count:'+count)
    return count
  }

  render(){
    return (
      <div>
        <br/><br/><br/>
        <div className="widget-container scrollable chat">
          <div className="fluid-height">
          <div className="heading">
            <i className="icon-comments"></i>Chat<i className="icon-smile pull-right"></i>
          </div>
          <div className="widget-content padded">
            <ul id="mychatlist">
              {
                this.getMessages().map((message) => {
                  if(message.authorId == Meteor.userId()){
                    return <ChatCurrent key={message._id}
                          authorId = {message.authorId}
                          name=''
                          content={message.content}
                          date={message.MessageDate()}
                          />
                  }
                  return <Chat key={message._id}
                        authorId = {message.authorId}
                        name={message.authorName}
                        content={message.content}
                        date={message.MessageDate()}
                        />
                })
              }
            </ul>
          </div>
          <br/><br/><br/>
          <div className="post-message">
            <input onChange={this.onChangeMessage} value={this.state.inputMessage} ref="message" className="form-control" placeholder="Write your message here…" type="text"/>
            <a onClick={this.sendMessage} className="submit" id="send"><i className="fa fa-paper-plane"></i></a>
          </div>
        </div>
        </div>
      </div>
    )
  }

}
