import React, { useState, useEffect } from "react";
import "./todo.css"; // Import your CSS file

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: new Date().getTime().toString(), title: task, completed: false };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  }

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  }

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  }

  return (
    <div className="container row">
      <h1 className="mt-3 text-white">To-Do App</h1>
      <div className="col-8">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4">
        <button
          className="btn btn-primary form-control material-icons"
          onClick={addTask}
        >
          add
        </button>
      </div>
      <div className="badge">
        <span className="font-weight-bold" style={{ fontSize: '20px' }}>
          You have
          {!tasks.length
            ? " no tasks"
            : tasks.length === 1
            ? " 1 task"
            : ` ${tasks.length} tasks`}
        </span>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="row mt-2">
          <div className="col-12">
            <span
              className={`form-control bg-white btn mt-2 task-text ${task.completed ? "completed" : ""}`}
              style={{ textAlign: "left", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.title}
            </span>
          </div>
          <div className="col-1">
            <button
              className="mt-2 btn btn-warning material-icons"
              onClick={() => handleDelete(task.id)}
            >
              clear
            </button>
          </div>
        </div>
      ))}
      {!tasks.length ? null : (
        <div>
          <button
            className="btn btn-secondary mt-4 mb-4"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
