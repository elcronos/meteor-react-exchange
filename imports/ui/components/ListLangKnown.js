import React from 'react'

export default class ListLangKnown extends React.Component{
  constructor(){
    super()
    this.state = {
      myList : []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      myList: nextProps.list
    });
  }

  render(){
    return(
      <div className="centering text-center">
        <ul>
          {
            this.state.myList.map((lang) => {
              return <li key={lang.id}>{lang.language} : {lang.level}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
