import React from 'react'
import { Avatars } from '/models/collections'

export default class ChatCurrent extends React.Component{
  constructor(){
    super()
    //this.getPhoto= this.getPhoto.bind(this)
    Meteor.subscribe('userPhoto')
    this.state = {
      photo: ''
    }

  }
  /*
  getPhoto(userId){
    let photo = Avatars.findOne({'metadata.userId':userId})
    let url= '/uploads/avatars-'+photo._id+'-undefined'
    console.log(url)
    return url
  }
  */
  render(){
    return (
       <li id="mymsg" className="current-user">
            <img width="40" height="40" src="/img/imguser.jpeg" alt="" className="circle"/>
            <div className="bubble">
            <a id="mymsgusername" className="user-name" href="#">{this.props.name}</a>
            <p className="message">
                {this.props.content}
            </p>
            <p className="time">
                <strong>{this.props.date}</strong>
            </p>
            </div>
       </li>
    )
  }
}
