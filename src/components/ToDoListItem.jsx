import React from 'react'

function ToDoListItem({ task,deleteTask,actualizarEstado }) {
    
    const handleChecked = (e)=>{
        const updatedTask = { ...task,estado: e.target.checked }
        actualizarEstado(updatedTask)
    }

  return (
    <div className='my-4 d-flex justify-content-center align-items-center justify-content-between'>
        <input type="checkbox" name='checkbox' checked={task.estado} onChange={handleChecked}/>
        <span>{task.tarea}</span>
        <button className='btn btn-danger' onClick={()=> deleteTask(task.id)}><i className='bx bx-trash' ></i></button>
    </div>
  )
}

export default ToDoListItem