import React from 'react'

export default class Rating extends React.Component{
  constructor(){
    super()
    this.onClose = this.onClose.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.getLanguage = this.getLanguage.bind(this)
    this.printRating = this.printRating.bind(this)
    this.handleRatingEmpty = this.handleRatingEmpty.bind(this)
    this.handleRatingHas = this.handleRatingHas.bind(this)
    this.state = {
        myLanguagesKnown : !!Session.get('mylanguagesknown') ?
                             Session.get('mylanguagesknown') : [],
        mylevelmsg: '',
        mylevel: '',
        id: ''

    }
  }
  componentDidMount(){
    $('#mylevel').hide()
    $('#deleteBtn').hide()
  }
  componentWillReceiveProps(nextProps) {
    //Obtaining the most recent Props
    let obj= this.getObjectByKey('id', nextProps.selected, this.state.myLanguagesKnown)
    this.loadRating(obj)
  }
  onClose(){

  }
  onSave(){
    known= this.state.myLanguagesKnown
    known.push(
      {
        id: this.props.selected,
        language: this.getLanguage(this.props.selected),
        level: this.state.mylevel
      }
    )
    Session.setPersistent('mylanguagesknown',known)
    this.setState({myLanguagesKnown: Session.get('mylanguagesknown')})
    $('#'+this.props.selected).addClass('layer-flag')
  }

  onDelete(){
    this.removeValue('id',this.props.selected)
    $('#'+this.props.selected).removeClass('layer-flag')
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
     data = this.state.myLanguagesKnown
     let array = $.map(data, function(v,i){
        return v[name] === value ? null : v;
     });
     console.log(array)
     data.length = 0; //clear original array
     console.log(data)
     data.push.apply(data, array); //push all elements except the one we want to delete
     console.log(data)
     Session.setPersistent('mylanguagesknown',data)
     this.setState({myLanguagesKnown: Session.get('mylanguagesknown')})
  }

  render(){
    return(
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={this.onClose} type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Level | {this.getLanguage(this.props.selected)}</h4>
            </div>
            <div className="modal-body">
              <div id="native" className="centering text-center">
                <h3>Native</h3>
                <a onClick={this.onClickRating.bind(this)}><i id="level-5" className="fa fa-star-o fa-3x color-native" arian-hidden="true"></i></a>
              </div>
              <br/>
              <div id="mylevel" className="centering text-center">
                <h2>{this.state.mylevelmsg}</h2>
              </div>
              <div id="notnative" className="centering text-center">
                <h3>Is not {this.getLanguage(this.props.selected)} your first Language ?</h3>
                <a onClick={this.onClickRating.bind(this)}><i id="level-1" className="fa fa-star-o fa-3x color-gold" aria-hidden="true"></i></a>
                <a onClick={this.onClickRating.bind(this)}><i id="level-2" className="fa fa-star-o fa-3x color-gold" aria-hidden="true"></i></a>
                <a onClick={this.onClickRating.bind(this)}><i id="level-3" className="fa fa-star-o fa-3x color-gold" aria-hidden="true"></i></a>
                <a onClick={this.onClickRating.bind(this)}><i id="level-4" className="fa fa-star-o fa-3x color-gold" aria-hidden="true"></i></a>
              </div>
            </div>
            <div className="modal-footer">
              <button id="deleteBtn" onClick={this.onDelete} type="button" className="btn btn-default" data-dismiss="modal">Delete</button>
              <button id="saveBtn" onClick={this.onSave} type="button" className="btn btn-default" data-dismiss="modal">Save</button>
              <button onClick={this.onClose} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
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

  loadRating(obj){
      if(obj !== -1){
        console.log('Cargó')
        $('#saveBtn').hide()
        $('#deleteBtn').show()
        let id = obj['id']
        let language = obj['language']
        let level = obj['level']
        this.ratingLevelFull(level)
      }else{
        console.log('No Cargó')
        $('#deleteBtn').hide()
        $('#saveBtn').show()
        this.clearAllLevel()
        $('#native').show()
        $('#mylevel').show()
      }
  }
  clearAllLevel(){
    this.handleRatingHas('#level-1')
    this.handleRatingHas('#level-2')
    this.handleRatingHas('#level-3')
    this.handleRatingHas('#level-4')
    this.handleRatingHas('#level-5')
    $('#notnative').show()
    $('#native').show()
    $('#mylevel').hide()
  }

  ratingLevelFull(level){
    this.printRating(level)
  }

  onClickRating(event){
    event.preventDefault()
    let level = ''
    switch(event.target.id){
      case 'level-1':
        level = 'beginner'
        break;
      case 'level-2':
        level = 'intermediate'
        break;
      case 'level-3':
        level = 'upper'
        break;
      case 'level-4':
        level = 'advanced'
        break;
      case 'level-5':
        level = 'native'
        break;
    }
    this.printRating(level)
  }

  printRating(level){
    this.clearAllLevel()
    if(level=='native'){
      this.handleRatingEmpty('#level-5')
      $('#notnative').hide()
    }else{
      var i, len = 0;
      if(level == 'beginner'){len=1}
      else if(level =='intermediate'){len=2}
      else if(level =='upper'){len=3}
      else if(level =='advanced'){len=4}
      for (i = 0; i <= len; i++) {
        this.handleRatingEmpty('#level-'+i)
      }
      $('#native').hide()
    }
    console.log('printRating:'+level)
    this.setState({mylevel: level})
  }

  handleRatingEmpty(id){
    $(id).removeClass('fa-star-o')
    $(id).addClass('fa-star')
  }
  handleRatingHas(id){
    $(id).removeClass('fa-star')
    $(id).addClass('fa-star-o')
  }
}
