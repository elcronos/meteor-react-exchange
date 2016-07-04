import React from 'react'
import { Meteor } from 'meteor/meteor'
// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ItemUser from '/imports/ui/components/ItemUser'

export default class ListUsers extends TrackerReact(React.Component){
  constructor(){
    super()
    this.getUsers = this.getUsers.bind(this)
    this.state = {
      subscription: {
        users: Meteor.subscribe('user')
      }
    }
  }
  componentWillUnmount(){
    this.state.subscription.users.stop()
  }
  getUsers(){
    //All users but the current one
    let users = Meteor.users.find({_id:{$ne: Meteor.userId()}})
    return users.fetch()
  }

  render(){
    return(
    <div>
      <br/><br/><br/>
      <div className="ui big middle aligned animated divided list">
      {
        this.getUsers().map((user) => {
            if(!!user.profile){
              return <ItemUser key={user._id}
                    userid={user._id}
                    username={user.username}
                    city={user.profile.city}
                    country={user.profile.country}
                    />
            }
        })
      }
      </div>
    </div>
    )
  }
}
