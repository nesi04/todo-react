import React, { useState, useEffect } from "react";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setIsLoading(false); 
  }, []);


  useEffect(() => {
    if (!isLoading) { 
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  function handleKeyPress(event){
    if(event.key=="Enter"){
        addTask();
    }
  }

  return (
    <>
      <div className="todoList">
        <h1>TO DO LIST</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a task ...."
            value={newTask}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="addButton" onClick={addTask}>
            ADD
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <button
                className="deleteButton"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button className="moveButton" onClick={() => moveUp(index)}>
                Up
              </button>
              <button className="moveButton" onClick={() => moveDown(index)}>
                Down
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDo;
