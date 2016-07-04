import React from 'react'

export default class FancyBox extends React.Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        <br></br>
        <a className="btn btn-primary btn" data-toggle="modal" href="#myModal">Bootstrap Modal</a>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button aria-hidden="true" className="close" data-dismiss="modal" type="button">&times;</button>
                <h4 className="modal-title">
                  Se7en
                </h4>
              </div>
              <div className="modal-body">
                <h1>
                  Welcome
                </h1>
                <p className="centering text-center">
                  <h2>Native</h2><br/>
                  <h2>Advance</h2><br/>
                  <h2>Intermediate</h2><br/>
                  <h2>Begginer</h2><br/>
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
