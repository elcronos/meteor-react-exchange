import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { MeteorCameraUI } from 'meteor/okland:camera-ui'
import { Avatars } from '/models/collections'
import { FS } from 'meteor/cfs:base-package'


export default class Camera extends React.Component{
  constructor(){
    super()
    this.takePhoto = this.takePhoto.bind(this)
    this.state = {
      photo: !!this.getUrlPicture() ? this.getUrlPicture() : 'img/avatarhere.png',
      subscription: {
        images: Meteor.subscribe('userPhoto')
      }
    }
  }
  takePhoto(){
    let cameraOptions = {
          width: 300,
          height: 300,
          correctOrientation: true,
          allowEdit: true
    };
    let self = this
    MeteorCameraUI.getPicture(cameraOptions, function (error, data) {
         if (!error) {
             //self.updatePhoto(data)
             let newFile = new FS.File(data)
             newFile.metadata = {
               userId: Meteor.userId()
             }
             self.savePhoto(newFile)
             self.setState({photo:self.getUrlPicture()})
             console.log('Mi estado '+self.state.photo)
         }else{
           console.log('error:'+error)
         }
    });
  }
  componentWillUnmount(){
    this.state.subscription.images.stop()
  }
  getPhoto(userId){
    photo = Avatars.findOne({'metadata.userId':userId})
    if(photo.isUploaded()){
      console.log('IsUploaded')
    }
    return
  }
  getUrlPicture(){
    let myUploaded = Avatars.findOne({'metadata.userId':Meteor.userId()})
    if(!myUploaded){return null}
    return 'cfs/files/avatars/'+myUploaded._id
  }
  savePhoto(photo){
    //File Object
    let fileObj = Avatars.insert(photo)
    this.setState({photo: photo})
  }
  render(){
    return(
      <div>
        <a id="photo" onClick={this.takePhoto} className="take-photo">
          <img className="myphoto" src={this.state.photo} width="80em" height="80em"/>
        </a>
      </div>
    )
  }
}
