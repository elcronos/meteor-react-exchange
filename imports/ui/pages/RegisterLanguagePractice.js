import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'

export default class RegisterLanguagePractice extends React.Component{
  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
    this.updateProfile = this.updateProfile.bind(this)

    this.state = {
      myLanguagesPractice : !!Session.get('mylanguagespractice') ?
                           Session.get('mylanguagespractice') : []
    }
  }

  componentDidMount(){
    this.state.myLanguagesPractice.map((practice) => {
      $('#'+practice.id).addClass('layer-flag')
    })
  }

  updateProfile(){
    let profile = {
      name: Session.get('name'),
      surname: Session.get('surname'),
      birthday: Session.get('date'),
      country: Session.get('country'),
      city: Session.get('city'),
      gender: Session.get('gender'),
      mylanguagesknown : Session.get('mylanguagesknown'),
      mylanguagespractice: Session.get('mylanguagespractice')
    }
    Meteor.call('updateUser', Meteor.userId(), profile, (err, result) => {
      if(err){
        Bert.alert(
          err.reason,
          'danger', 'growl-top-left', 'fa-frown-o'
        )
      }else{
        FlowRouter.go('home');
        setTimeout(function() {
					Bert.alert('Welcome ' + Meteor.user().profile.name, 'success');
				}, 750);
      }
    })
  }
  onClick(event){
    console.log('OnClick')
    console.log('Event Target ID:'+ event.target.id)
    let practice = this.state.myLanguagesPractice
    let lang = this.getObjectByKey('id',event.target.id,practice)
    console.log('practice:'+practice)
    console.log('lang:'+lang)
    //If it finds an item
    if(lang != -1){
      $('#'+event.target.id).removeClass('layer-flag')
      this.removeValue('id', event.target.id)

    }else{
      $('#'+event.target.id).addClass('layer-flag')
      practice.push(
        {
          id: event.target.id,
          language: this.getLanguage(event.target.id)
        }
      )
      Session.setPersistent('mylanguagespractice',practice)
      this.setState({myLanguagesPractices: Session.get('mylanguagespractice')})
    }
  }

  getObjectByKey(key, value, data){
    var i, len = data.length;
    for (i = 0; i < len; i++) {
        if (data[i] && data[i].hasOwnProperty(key)) {
            if(data[i][key] == value){
              return data[i];
            }
        }
    }
    return -1;
  }

  removeValue (name, value){
     data = this.state.myLanguagesPractice
     let array = $.map(data, function(v,i){
        return v[name] === value ? null : v;
     });
     data.length = 0; //clear original array
     data.push.apply(data, array); //push all elements except the one we want to delete
     Session.setPersistent('mylanguagespractice',data)
     this.setState({myLanguagesPractice: Session.get('mylanguagespractice')})
  }
  render(){
    return(
      <div className="container-fluid">
        <div className="row-fluid">
          <br/>
          <div className="centering text-center">
              <h3>What languages do you want to practice?</h3>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-md-3 col-xs-3 centering text-center">
              <a onClick={this.onClick}>
              <img id="fr" src="img/fr.svg" className="ui avatar image"/></a>
              <br></br>
              French
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="it" src="img/it.svg" className="ui avatar image"/></a>
            <br></br>
            Italian
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="sp" src="img/es.svg" className="ui avatar image"/></a>
            <br></br>
            Spanish
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
              <img id="pt" src="img/pt.svg" className="ui avatar image"/></a>
              <br></br>
            Portuguese
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="en" src="img/en_gb.svg" className="ui avatar image"/></a>
            <br></br>
            English
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="de" src="img/de.svg" className="ui avatar image"/></a>
            <br></br>
            German
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="du" src="img/du.svg" className="ui avatar image"/></a>
            <br></br>
            Dutch
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="ru" src="img/ru.svg" className="ui avatar image"/></a>
            <br></br>
            Russian
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="il" src="img/il.svg" className="ui avatar image"/></a>
            <br></br>
            Hebrew
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="in" src="img/in.svg" className="ui avatar image"/></a>
            <br></br>
            Hindi
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="jp" src="img/jp.svg" className="ui avatar image"/></a>
            <br></br>
            Japanese
          </div>
          <div className="col-md-3 col-xs-3 centering text-center">
            <a onClick={this.onClick}>
            <img id="kr" src="img/kr.svg" className="ui avatar image"/></a>
            <br></br>
            Korean
          </div>
        </div>
        <div className="row-fluid">
          <div className="centering text-center">
              <button id="saveProfile" onClick={this.updateProfile}
                className="buttonRounded btnColorPrimary roboto-font">SAVE PROFILE
              </button>
          </div>
        </div>
      </div>
    )
  }

  getLanguage(id){
    let languageSelected = ''
    switch(id){
      case 'fr':
        languageSelected = 'French'
        break;
      case 'it':
        languageSelected = 'Italian'
        break;
      case 'sp':
        languageSelected = 'Spanish'
        break;
      case 'pt':
        languageSelected = 'Portuguese'
        break;
      case 'en':
        languageSelected = 'English'
        break;
      case 'de':
        languageSelected = 'German'
        break;
      case 'du':
        languageSelected = 'Dutch'
        break;
      case 'ru':
        languageSelected = 'Russian'
        break;
      case 'il':
        languageSelected = 'Hebrew'
        break;
      case 'in':
        languageSelected = 'Hindi'
        break;
      case 'jp':
        languageSelected = 'Japanese'
        break;
      case 'kr':
        languageSelected = 'Korean'
        break;
    }
    return languageSelected;
  }
}
