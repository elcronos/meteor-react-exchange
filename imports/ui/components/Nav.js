import React from 'react'

export default class Nav extends React.Component{
  constructor(props){
    super()
    this.onClickRight = this.onClickRight.bind(this)
    this.onClickLeft = this.onClickLeft.bind(this)
    this.getViewRight = this.getViewRight.bind(this)
    this.getViewLeft = this.getViewLeft.bind(this)
  }
  onClickRight(){
    FlowRouter.go(this.props.rightnav)
  }
  onClickLeft(){
    FlowRouter.go(this.props.leftnav)
  }
  getViewLeft(){
    return !!this.props.leftnav ?
    <div className="left"><a onClick={this.onClickLeft}><i id="icon" className="fa fa-chevron-left fa-2x"></i></a></div> : ''
  }
  getViewRight(){
    return !!this.props.rightnav ?
    <div className="right"><a onClick={this.onClickRight}><i id="icon" className="fa fa-chevron-right fa-2x"></i></a></div> : ''
  }
  render(){
    return(
      <div className="header-menu">
        <div className="title">Langx</div>
        {this.getViewRight()}
        {this.getViewLeft()}
      </div>
    )
  }
}
