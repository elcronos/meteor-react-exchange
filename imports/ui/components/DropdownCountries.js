import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Countries } from '/models/collections.js'
// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class DropdownCountries extends TrackerReact(React.Component){
  constructor(){
    super()
    this.getCountries = this.getCountries.bind(this)
    this.filterCountries = this.filterCountries.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      subscription : {
        countries : Meteor.subscribe('countries')
      },
      country: ''
    }
  }
  componentWillUnmount(){
    this.state.subscription.countries.stop()
  }
  getCountries(){
    return Countries.find({}).fetch()
  }
  filterCountries(filter){
    console.log('filter'+filter)
    return Countries.find({label: filter},{limit:1}).fetch()
  }
  onChange(){
    console.log('Pais:'+this.refs.inputcountry.value)
    this.setState({country:this.refs.inputcountry.value})
    if(this.refs.inputcountry.value.length>4){
      this.setState({country: this.filterCountries(this.refs.inputcountry.value)})
    }
  }
  render(){
    return(
      <div className="form-group form-group-lg">
       <div className="input-group">
        <div className="input-group-addon">
         <i className="fa fa-map-marker">
         </i>
        </div>
        <input ref="inputcountry" value={this.state.country} onChange={this.onChange} placeholder="City" className="form-control" id="city" name="city" placeholder="City" type="text">
        </input>
        <select className="form-control" selected="true">
        {
          this.getCountries().map((country) =>{
            return <option key={country._id}> {country.label} </option>
          })
        }
        </select>
       </div>
      </div>
    )
  }
}
