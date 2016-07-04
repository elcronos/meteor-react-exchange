import React from 'react'
import ReactDOM from 'react-dom';

import Logo from '/imports/ui/components/Logo'
import { Bert } from 'meteor/themeteorchef:bert'

//Componente para Login
export default class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    Meteor.subscribe('users')
    this.state = {
      username: '',
      password: ''
    };
    //CSS Background Logic
    changeBackground();

  }
  handleOnChange(event){
    if(this.refs.username.value.length > 16){
      Bert.alert(
        'Username cannot be longer than 16 characters ',
        'info', 'fixed-top', 'fa-info'
      );
      this.refs.username.value = this.refs.username.value.substring(0,16)
    }
    this.setState({username: this.refs.username.value,
                   password: this.refs.password.value})
  }

  handleLogin(event){
    user = this.refs.username.value;
    password = this.refs.password.value;
    if (user && password){
      Meteor.loginWithPassword(user, password, (err, result) => {
        if (err) {
          Bert.alert(
            'Username or Password are incorrect ',
            'danger', 'growl-top-left', 'fa-frown-o'
          )
        } else {
          //CSS Background Logic
            $('body').addClass('background-white');

            if($('body').hasClass('background-blue')) {
              $('body').removeClass('background-blue');
            }
            //Clear Session
            Session.clear()
            Session.clearTemp()
            Session.clearPersistent()
            FlowRouter.go("/");
        }
      });
    }
  }
  handleSignup(event){
    FlowRouter.go("/signup");
  }
  render(){
    return(
      <div id="content-login">
          <div className="container-fluid">
              <div className="row-fluid">
                <div className="centering text-center">
                    <Logo />
                </div>
              </div>
              <div className="row-fluid">
                  <div className="centering text-center">
                    <input ref="username" className="rounded username btn-responsive"
                      onChange={this.handleOnChange}
                      placeholder="Username"
                      />
                  </div>
              </div>
              <div className="row-fluid">
                <div className="centering text-center">
                    <input type="password" maxLength="20" ref="password" className="rounded password btn-responsive"
                      onChange={this.handleOnChange}
                      placeholder="Password"/>
                </div>
              </div>
                <br></br>
              <div className="row-fluid">
                  <div className="centering text-center">
                    <button onClick={this.handleLogin}
                      className="buttonRounded buttonSolid">LOG IN
                    </button>
                  </div>
              </div>
              <br></br>
              <div className="row-fluid">
                <div className="centering text-center">
                    <button onClick={this.handleSignup}
                      className="buttonRounded buttonSolid">CREATE NEW PROFILE
                    </button>
                </div>
              </div>
          </div>
      </div>
    );
  }
}
/*
function transition(path){
  $("#content-layout").hide();
  $("#spinner").show();
  setTimeout(function() {
    window.location.href = path;
  }, 1000);
}
*/
function changeBackground(){
  //CSS Background Logic
  $('body').addClass('background-blue');

  if($('body').hasClass('background-white')) {
    $('body').removeClass('background-white');
  }
}
