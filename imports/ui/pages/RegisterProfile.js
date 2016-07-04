import React from 'react'
import { Session } from 'meteor/session'
import Camera from '/imports/ui/components/Camera'
import DropdownCountries from '/imports/ui/components/DropdownCountries'

export default class RegisterProfile extends React.Component{
  constructor(){
    super()
    this.onChange = this.onChange.bind(this)
    this.state = {
      name: !!Session.get('name') ? Session.get('name') : '',
      surname: !!Session.get('surname') ? Session.get('surname') : '',
      date: !!Session.get('date') ? Session.get('date') : '',
      country: !!Session.get('country') ? Session.get('country') : '',
      city: !!Session.get('city') ? Session.get('city') : '',
      gender: !!Session.get('gender') ? Session.get('gender') : Session.setPersistent('gender','Male')
    }
  }
  onChange(event){
    switch(event.target.id){
      case 'name':
        Session.setPersistent('name',event.target.value)
        this.setState({name:Session.get('name')})
        break;
      case 'surname':
        Session.setPersistent('surname',event.target.value)
        this.setState({surname:Session.get('surname')})
        break;
      case 'date':
        Session.setPersistent('date',event.target.value)
        this.setState({date:Session.get('date')})
        break;
      case 'country':
        Session.setPersistent('country',event.target.value)
        this.setState({country:Session.get('country')})
        break;
      case 'city':
        Session.setPersistent('city',event.target.value)
        this.setState({city:Session.get('city')})
        break;
      case 'gender':
        Session.setPersistent('gender',event.target.value)
        this.setState({gender:Session.get('gender')})
        break;
    }
  }

  render(){
    return(
    <div className="bootstrap-iso">
     <div className="container-fluid">
      <div className="row-fluid">
        <div class="ui star rating" data-rating="3"></div>
      </div>
      <div className="row-fluid">
        <div className="centering text-center">
            <h3>Profile</h3>
            <Camera />
        </div>
      </div>
      <div className="row-fluid centering text-center">
        Avatar
      </div>
      <div className="row-fluid centering text-center">
        <form>
         <div className="form-group form-group-lg">
          <div className="input-group">
           <div className="input-group-addon">
            <i className="fa fa-user">
            </i>
           </div>
           <input value={this.state.name} onChange={this.onChange} placeholder="Name" className="form-control" id="name" name="name" type="text"/>
          </div>
         </div>
         <div className="form-group form-group-lg">
          <div className="input-group">
           <div className="input-group-addon">
            <i className="fa fa-user">
            </i>
           </div>
           <input value={this.state.surname} onChange={this.onChange} placeholder="Surname" className="form-control" id="surname" name="surname" type="text"/>
          </div>
         </div>
         <div className="form-group form-group-lg">
          <div className="input-group">
           <div className="input-group-addon">
            <i className="fa fa-birthday-cake">
            </i>
           </div>
           <input value={this.state.date} onChange={this.onChange} placeholder="Date" className="form-control" id="date" name="date" placeholder="MM/DD/YYYY" type="date"/>
          </div>
         </div>
         <div className="form-group form-group-lg">
          <div className="input-group">
           <div className="input-group-addon">
            <i className="fa fa-map-marker">
            </i>
           </div>
           <input value={this.state.country} onChange={this.onChange} placeholder="Country" className="form-control" id="country" name="country" placeholder="Country" type="text"/>
          </div>
         </div>
         <div className="form-group form-group-lg">
          <div className="input-group">
           <div className="input-group-addon">
            <i className="fa fa-map-marker">
            </i>
           </div>
           <input value={this.state.city} onChange={this.onChange} placeholder="City" className="form-control" id="city" name="city" placeholder="City" type="text"/>
          </div>
         </div>
         <div className="form-group form-group-lg">
          <label className="control-label " for="select">
           Gender
          </label>
          <select value={this.state.gender} onChange={this.onChange} className="select form-control" id="gender" name="gender">
           <option value="Male">
            Male
           </option>
           <option value="Female">
            Female
           </option>
          </select>
         </div>
        </form>
      </div>
     </div>
    </div>
    )
  }
}
