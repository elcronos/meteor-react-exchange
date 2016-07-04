import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'

import Nav from '/imports/ui/components/Nav'
import Chat from '/imports/ui/components/Chat'
import MainLayout from '/imports/ui/MainLayout'
import ChatPage from '/imports/ui/pages/ChatPage'
import Camera from '/imports/ui/components/Camera'
import NavMenu from '/imports/ui/components/NavMenu'
import FancyBox from '/imports/ui/components/FancyBox'
import LoginForm from '/imports/ui/pages/LoginForm'
import ListUsers from '/imports/ui/pages/ListUsers'
import SignupForm from '/imports/ui/pages/SignupForm'
import RegisterProfile from '/imports/ui/pages/RegisterProfile'
import RegisterLanguageKnown from '/imports/ui/pages/RegisterLanguageKnown'
import RegisterLanguagePractice from '/imports/ui/pages/RegisterLanguagePractice'

// TO DO - NOT FOUND Page

const authenticatedRoutes = FlowRouter.group(
  { name: 'authenticated',
    triggersEnter: [function(context, redirect) {
      //Not Authorized
      if(!Meteor.userId()){
        FlowRouter.go('/login')
      }
    }]}
);

//Public Routes
FlowRouter.route('/login',{
  action(){
    mount(MainLayout,{
      nav: () => (''),
      content: () => (<LoginForm />)
    })
  }
})

/*
* Register
*/

//Step 0:
FlowRouter.route("/signup", {
  action: function() {
    mount(MainLayout, {
      nav: () => (''),
      content: () => (<SignupForm />)
    });
  }
});
//Authenticated Routes
//Step 1:
authenticatedRoutes.route("/registerprofile", {
  action: function() {
    mount(MainLayout, {
      nav: () => (<Nav rightnav='/registerlangknown'/>),
      content: () => (<RegisterProfile />)
    });
  }
});
//Step 2:
authenticatedRoutes.route("/registerlangknown", {
  action: function() {
    mount(MainLayout, {
      nav: () => (<Nav leftnav='/registerprofile' rightnav='/registerlangpractice'/>),
      content: () => (<RegisterLanguageKnown />)
    });
  }
});
//Step 4:
authenticatedRoutes.route("/registerlangpractice", {
  action: function() {
    mount(MainLayout, {
      nav: () => (<Nav leftnav='/registerlangknown'/>),
      content: () => (<RegisterLanguagePractice />)
    });
  }
});

authenticatedRoutes.route("/signout", {
  triggersEnter: [function(context, redirect) {
    Meteor.logout(() =>{
         FlowRouter.go("/login")
    });
  }]
});

authenticatedRoutes.route("/", {
  name: 'home',
  action: function() {
    if(Meteor.loggingIn() || Meteor.userId()){
      mount(MainLayout, {
        nav: () => (<NavMenu navigation='/'/>),
        content: () => (<ListUsers />)
      });
    }else{
      FlowRouter.go('/login')
    }
  }
});

authenticatedRoutes.route('/config', {
  action: function() {
    mount(MainLayout, {
      nav: () => (<NavMenu navigation='/'/>),
      content: () => (<Chat />)
    });
  }
});
authenticatedRoutes.route('/chat', {
  action: function() {
    mount(MainLayout, {
      nav: () => (<NavMenu navigation='/'/>),
      content: () => (<ChatPage />)
    });
  }
});

authenticatedRoutes.route('/camera', {
  action: function() {
    mount(MainLayout, {
      nav: () => (<NavMenu navigation='/'/>),
      content: () => (<Camera />)
    });
  }
});

authenticatedRoutes.route('/fancy', {
  action: function() {
    mount(MainLayout, {
      nav: () => (<NavMenu navigation='/'/>),
      content: () => (<FancyBox />)
    });
  }
});
