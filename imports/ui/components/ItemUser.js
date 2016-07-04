import React from 'react'

export default class ItemUser extends React.Component{
  constructor(){
    super()
    this.goToChat = this.goToChat.bind(this)
  }
  goToChat(){
    Session.setPersistent('chatUserId', this.props.userid)
    console.log('CharUserID:'+Session.get('chatUserId'))
    FlowRouter.go('/chat')
  }
  render(){
    return(
      <div className="item">
          <div className="right floated content">
            <a onClick={this.goToChat}><i className="customicon fa fa-comments-o fa-2x"></i></a>
          </div>
          <img className="ui avatar image" src="/img/imguser.jpeg"/>
          <div className="middle aligned content">
            <a className="header">{this.props.username}</a>
            <div className="description">{this.props.city}, {this.props.country}</div>
          </div>
          <br/>
      </div>
    )
  }
}
