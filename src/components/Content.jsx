import React, { useState } from 'react'
import ItemsList from './ItemsList'


const Content = ({tasks, handleCheck, handleDelete ,search ,error}) => {
   
  

  return (
    <>
      {(tasks.length) ? (
      <ItemsList tasks = {tasks} handleCheck= {handleCheck} handleDelete = {handleDelete} search ={ search}/>
      ) : (
        <p className='msgBox'>No tasks yet</p>
      )
}
    </>  

    )
}

export default Content