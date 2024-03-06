import React, { useEffect, useState } from "react";

const Todo = () => {

    const [taskList, setTaskList] = useState([]);
    const [title, setTitle] = useState();
    const [taskInput, setTaskInput] = useState();

    const addTask = () => {
      console.log("tilte", title);
      console.log("input", taskInput);
      setTaskList((prevList) => [...prevList, {title: title, taskInput: taskInput}])
    }

    useEffect(() => {
      console.log("taskList", taskList);
    }, [taskList])

    return (
        <>
          <div className="Add-Task">
            <div className="Add-task-section">
                <input 
                  type="text" 
                  className="Add-task-input" 
                  placeholder="Title..." 
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                  type="text" 
                  className="Add-task-input" 
                  placeholder="Input..." 
                  onChange={(e) => setTaskInput(e.target.value)}
                /> 
            </div>
            <button className="Plus-button" onClick={addTask}>+</button>
          </div> 
          <div className="Task-section">
            { taskList.length > 0 ? <>here is the task list</>:
              <div class="No-task-section">
                <div className="Task-bar"></div>
                <p>No tasks</p>
                <div className="Task-bar"></div>
              </div>

            }
          </div>
        </>
    )
}

export default Todo;