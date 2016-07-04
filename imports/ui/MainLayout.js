import React from 'react'
import Spinner from '/imports/ui/components/Spinner'

export default MainLayout = ({nav, content}) =>(
   <div className="content">
      <main>
        {nav()}
        <div className="content-layout">
            {content()}
        </div>
      </main>
    </div>
)
