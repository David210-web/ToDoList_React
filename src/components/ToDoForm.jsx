import React, { useState } from 'react'

function ToDoForm({ addTask }) {
    const [task,setTask] = useState(null)

    const handleChange = (e)=>
    {
        setTask(e.target.value)
    }

    const handleSubmit = (e)=>
    {
        e.preventDefault();
        if(task.trim() && task.trim().length > 3)
        {
            addTask(
                {
                    tarea: task,
                    estado: false
                }
            )
        }else
        {
            alert("Ingrse una tarea valida")
        }
        setTask("");
        e.target.reset();
    }
  return (
    <div>
        <form className='d-flex gap-2' onSubmit={handleSubmit}>
            <input type="text" className='form-control' placeholder='ingrese una nueva tarea' name='task' onChange={handleChange}/>
            <button type="submit" className='btn btn-dark'>Agregar</button>
        </form>
    </div>
  )
}

export default ToDoForm