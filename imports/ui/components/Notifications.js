import React from 'react'

export default class Notifications extends React.Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        HOLA
      <li className="dropdown messages hidden-xs">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#"><span aria-hidden="true" className="se7en-envelope"></span>
            <div className="sr-only">
                  Messages
            </div>
            <p className="counter">
                  3
            </p>
          </a>
          <ul className="dropdown-menu messages">
             <li><a href="#">
                  <img width="34" height="34" src="images/avatar-male2.png" />Could we meet today? I wanted...</a>
             </li>
             <li><a href="#">
                  <img width="34" height="34" src="images/avatar-female.png" />Important data needs your analysis...</a>
             </li>
             <li><a href="#">
              <img width="34" height="34" src="images/avatar-male2.png" />Buy Se7en today, its a great theme...</a>
             </li>
          </ul>
     </li>
     </div>
    )
  }
}
