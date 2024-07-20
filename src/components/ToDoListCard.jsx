import React, { useState, useEffect } from "react";
import ToDoListItem from "./ToDoListItem";
import ToDoForm from "./ToDoForm";

function ToDoListCard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks,setTaskCompleted] = useState([]);
  const [filter,setFilter] = useState("all");
    

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const validTasks = Array.isArray(storedTasks) ? storedTasks.filter(task => task && task.tarea) : [];
    const taskcompleted = validTasks.filter(task => task.estado === true);
    setTaskCompleted(taskcompleted);
    setTasks(validTasks);
    console.log(validTasks);
  }, []);

  const addTask = (task) => {
    const newTask = {...task, id:Date.now()}
    const newTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const updateTask = (task) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id? task : t));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    const taskcompleted = updatedTasks.filter(task => task.estado === true)
    setTaskCompleted(taskcompleted)
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id!== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    const taskcompleted = updatedTasks.filter(task => task.estado === true)
    setTaskCompleted(taskcompleted)
  };

  const filterTasks = (filter) => {
    setFilter(filter);
  }

  const filteredTasks = tasks.filter(task => {
    if(filter === "completed") return task.estado === true;
    if(filter === "incompleted") return task.estado === false;
    return true;
  })

  return (
    <div className="border p-4 rounded shadow">
      <nav className="d-flex align-items-center justify-content-between gap-4">
        <h2>To do list</h2>
        <div className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
          <i className="bx bx-filter-alt"></i>
        </div>
        <ul class="dropdown-menu">
            <li className="dropdown-item" onClick={()=> filterTasks("all")}>Todas</li>
            <li className="dropdown-item" onClick={()=> filterTasks("completed")}>Completadas</li>
            <li className="dropdown-item" onClick={()=> filterTasks("incompleted")}>Incompletas</li>
          </ul>
      </nav>
      <section>
        {filteredTasks.length === 0 ? (
          <h4 className="alert alert-danger my-3 text-center">No hay tareas</h4>
        ) : (
            <>
                {filteredTasks.map((task, index) => <ToDoListItem key={index} task={task} deleteTask={deleteTask} actualizarEstado={updateTask}/>)}
                <span className="d-block my-2"> {completedTasks.length}/{tasks.length} tareas completadas </span>
            </>
        )}
      </section>
      <ToDoForm addTask={addTask} />
    </div>
  );
}

export default ToDoListCard;
