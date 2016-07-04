import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Inbox } from '/imports/ui/components/Inbox'
//Componente para Menu Burger and Navbar
export default class NavMenu extends React.Component{
  constructor(){
    super()
    this.onClickNav = this.onClickNav.bind(this)
    this.onChangeChecked= this.onChangeChecked.bind(this)
    this.onClickRight = this.onClickRight.bind(this)
    this.state = {
      checked: false,
      iconChecked: false
    }
  }
  onClickNav(){
    this.setState({checked: !this.state.checked})
  }
  onChangeChecked(){
    this.setState({checked: !this.state.checked})
  }
  onClickRight(){
    FlowRouter.go(this.props.navigation)
  }
  handleLogout(){
    //Clear Session
    Session.clear()
    Session.clearTemp()
    Session.clearPersistent()

    Meteor.logout(() =>{
        FlowRouter.go("/login")
    });
  }
  render(){
    return (
      <nav className="navbar-fixed-top">
        <div className="header-menu">
          <div className="title">Langx</div>
          <div className="inbox"><Inbox count='5'/></div>
          <div className="user"><a onClick={this.onClickRight}><i id="icon" className="fa fa-search fa-2x"></i></a></div>
        </div>
        <div className="outer-menu">
          <input ref="menu" checked={this.state.checked} onChange={this.onChangeChecked} className="checkbox-toggle" type="checkbox" />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu">
            <div>
              <div>
                <ul>
                  <li><a onClick={this.onClickNav} href="/registerprofile">Preferences</a></li>
                  <li><a onClick={this.handleLogout} >Sign Out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
