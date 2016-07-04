import React from 'react'

export const Inbox = ({count}) => (
  <div id="noti_Container">
    <i className="fa fa-inbox fa-2x"></i>
    {(count>0) ? <div className="noti_bubble centering text-center">{count}</div> : ''}
  </div>
)
