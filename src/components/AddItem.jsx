import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({item, newItem, handleSubmit}) => {

const ref = useRef();
  return (


    <form className='addForm' onSubmit={handleSubmit}>

        <input 
            type='text'
            placeholder='Add task'
            value={item}
            onChange={e => newItem(e.target.value)}
            ref={ref}
        />
        <button type="submit" onClick={() => ref.current.focus()}>
            <FaPlus />
        </button>
        
    </form>
  )
}

export default AddItem