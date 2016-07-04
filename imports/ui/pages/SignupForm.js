import React from 'react'
import {Accounts} from 'meteor/accounts-base';
//Componente para Login
export default class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: ''
    };

    //Change Background
    changeBackground();

  }
  componentDidMount(){
    $("#spinner").hide();
  }
  handleOnChange(){
    //Username maxlength alert
    if(this.refs.username.value.length > 16){
      Bert.alert(
        'Username cannot be longer than 16 characters ',
        'danger', 'fixed-top', 'fa-frown-o'
      );
      this.refs.username.value = this.refs.username.value.substring(0,16)
    }
  }
  handleLogin(event){
    FlowRouter.go('/login');
  }
  handleSignup(){

    username= this.refs.username.value;
    email = this.refs.email.value;
    password = this.refs.password.value;
    confirm = this.refs.confirm.value
    let userObject = {
      username: username,
      email: email,
      password: password
    }

    if(password.length <= 6 && confirm.length <= 6){
      Bert.alert(
        'Your password must be longer than 6 characters','info','fixed-top','fa-info'
      )
    }else if(password !== confirm){
      Bert.alert(
        'Password and Confirm password do not match','info','fixed-top','fa-info'
      )
    }else{
      //Create User
      Accounts.createUser(userObject, (err, result) => {
        console.log('result:'+result)
        if(!!err){
          console.log('Error')
          Bert.alert(
            err.reason,'info','fixed-top','fa-info'
          )
        }
        else{
          console.log('Usuario Valido')
          //CSS Background Color Logic
          $('body').addClass('background-white');

          if($('body').hasClass('background-blue')) {
            $('body').removeClass('background-blue');
          }
          //Clear Session
          Session.clear()
          Session.clearTemp()
          Session.clearPersistent()
          FlowRouter.go('/registerprofile');
        }
      })
    }
  }
  render(){
    return(
      <div>
          <div className="container-fluid">
              <div className="row-fluid">
                <div className="centering text-center">
                    <Logo />
                </div>
              </div>
              <div className="row-fluid">
                    <div className="centering text-center">
                      <input ref="username" className="rounded username-signup btn-responsive"
                        onChange={this.handleOnChange}
                        placeholder="Username"
                        />
                    </div>
                    <div class="help-block with-errors"></div>
                </div>
                <div className="row-fluid">
                    <div className="centering text-center">
                      <input ref="email" type="email" className="rounded email-signup btn-responsive"
                        onChange={this.handleOnChange}
                        placeholder="email@example.com"
                        />
                    </div>
                </div>
                <div className="row-fluid">
                  <div className="centering text-center">
                      <input id="mypass" type="password" ref="password" className="rounded password-signup btn-responsive"
                        onChange={this.handleOnChange}
                        placeholder="Password"
                        />
                  </div>
                </div>
                <div>
                  <div className="centering text-center">
                    <span className="roboto-font text-signup">Please Confirm your password</span>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="centering text-center">
                      <input type="password" ref="confirm" className="rounded password-signup btn-responsive"
                        onChange={this.handleOnChange}
                        placeholder="Password"
                        />
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="centering text-center">
                      <button onClick={this.handleSignup}
                        className="buttonRounded buttonSolid roboto-font">CREATE NEW PROFILE
                      </button>
                  </div>
                </div>
          </div>
      </div>
    );
  }
}

function transition(path){
  $("#content-login").hide();
  $("#spinner").show();
  setTimeout(function() {
    window.location.href = path;
  }, 1000);
}

function changeBackground(){
  //CSS Background Logic
  $('body').addClass('background-blue');

  if($('body').hasClass('background-white')) {
    $('body').removeClass('background-white');
  }
}
