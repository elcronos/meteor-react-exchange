import React from 'react'

export default class Chat extends React.Component{
  constructor(){
    super()
  }

  render(){
    return (
       <li id="mymsg">
            <img width="40" height="40" src="img/imguser.jpeg" alt="" className="circle"/>
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
