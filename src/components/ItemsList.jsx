import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const ItemsList = ({tasks, handleCheck, handleDelete, search}) => {

  const filteredTasks = tasks.filter((task) => ((task.item).toLowerCase()).includes(search.toLowerCase()))

  return (
    <main>
        <ul className='tasks'>
        {filteredTasks.map((item) => {
          return(
            <li className='item' key={item.id}>
              <input type='checkbox' checked={item.checked} onClick={() => handleCheck(item.id)}/>
              <label style={(item.checked)?{textDecoration:'line-through'}:null}>{item.item}</label>
              <FaTrashAlt onClick={() => handleDelete(item.id)}/>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default ItemsList