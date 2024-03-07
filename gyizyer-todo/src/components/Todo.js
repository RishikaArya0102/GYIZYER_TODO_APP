import React, { useEffect, useState } from "react";
import edit from '../assests/edit.svg';

const Todo = () => {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const addTask = () => {
    if (taskInput && title) {
      setTaskList((prevList) => [...prevList, { title: title, taskInput: taskInput }]);
      setTitle('');
      setTaskInput('');
    } else {
      alert('Title and Input is required');
    }
  }

  const deletePopup = () => {
    return (
      <div className="delete-popup-container">
        <p>Delete this task?</p>
        <div className="delete-popup">
          <button className="popup-btn" onClick={() => handleDelete()}>Yes</button>
          <button className="popup-btn" onClick={() => setDeleteTask(false)}>No</button>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    const newTaskList = taskList.filter((tsk, index) => index !== clickedIndex);
    setTaskList(newTaskList);
    setDeleteTask(false);
    setEditMode(false);
    setTitle('');
    setTaskInput('');
    setClickedIndex(null);
  }

  const handleEdit = (index) => {
    setTitle(taskList[index].title);
    setTaskInput(taskList[index].taskInput)
  }

  const handleInfoClick = (index) => {
    setClickedIndex(index);
    setShowOptions(true);
  }

  const handleUpdate = () => {
    setEditMode(false);
    setTitle('');
    setTaskInput('');
    setClickedIndex(null);
  }

  return (
    <>
      <div className="Add-Task">
        <div className="Add-task-section">
          <input
            type="text"
            className="Add-task-input"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {!editMode ? (
            <input
              type="text"
              className="Add-task-input"
              placeholder="Input..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          ) : (
            <textarea
              className="Update-task-input"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          )}
        </div>
        {!editMode ? (
          <button className="Plus-button" type="submit" onClick={addTask}>+</button>
        ) : (
          <button className="update-button" type="submit" onClick={handleUpdate}>Update</button>
        )}
      </div>
      <div className="Task-section">
        {taskList.length > 0 ? (
          taskList.map((td, index) => (
            <div className="Todo-container" key={index}>
              <div className="Todo-task">
                <div className="Todo-text-content">
                  <div className="Todo-inside-content"><h3>{td.title}</h3></div>
                  <div className="Todo-inside-content">{td.taskInput}</div>
                </div>
                <div className="btn-wrapper">
                  {(!showOptions || clickedIndex !== index) && (
                    <button className="info-button" onClick={() => handleInfoClick(index)}>i</button>
                  )}
                  {showOptions && clickedIndex === index && (
                    <div className="button-wrapper">
                      <img
                        src={edit}
                        className="edit-button"
                        onClick={() => {
                          setEditMode(true);
                          handleEdit(index);
                        }}
                      />
                      <button
                        className="delete-button"
                        onClick={() => setDeleteTask(true)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {deleteTask && deletePopup(clickedIndex)}
            </div>
          ))
        ) : (
          <div class="No-task-section">
            <div className="Task-bar"></div>
            <p>No tasks</p>
            <div className="Task-bar"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Todo;
