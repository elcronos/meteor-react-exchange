import React from 'react'
import Rating from '/imports/ui/components/Rating'
//import ListLangKnown from '/imports/ui/components/ListLangKnown'

export default class RegisterLanguageKnown extends React.Component{
  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {
      id: ''
    }
  }
  componentDidMount(){
    if(!Session.get('mylanguagesknown')){
      Session.setPersistent('mylanguagesknown',[])
    }
    Session.get('mylanguagesknown').map((known) => {
      $('#'+known.id).addClass('layer-flag')
    })
  }
  onClick(event){
    event.preventDefault();
    this.setState({id:event.target.id})
    //$('#'+event.target.id).addClass('layer-flag')
    $('#myModal').modal('show');
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row-fluid">
          <br/>
          <div className="centering text-center">
              <h3>What languages do you already know?</h3>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-md-3 col-xs-3 centering text-center">
              <a onClick={this.onClick}>
                <img id="fr" src="img/fr.svg" className="ui avatar image"/>
              </a>
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

        <Rating selected={this.state.id}/>

      </div>
    )
  }
}
