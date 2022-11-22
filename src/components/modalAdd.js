// import React from "react";
import Modal from "react-modal";
import React, { useState } from "react";
import { useData } from "../providers/data";

function ModalAdd(props) {
  const {task} = useData();
  const [title, setTitle] = useState('');
  const [descripition, setDescripition] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !descripition.trim()) {
      return;
    }
    props.addTask(title, descripition, task);
    setTitle("");
    setDescripition("");

    // setIsOpen(false);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescripitionChange(e) {
    setDescripition(e.target.value);
  }

  return (
    <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    contentLabel="Example Modal"
    overlayClassName="modal-overlay"
    className="modal-content"
  >
    <h2>New Task</h2>
    <br />
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label><br/>

        <input
          type="text"
          id="new-todo-input"
          className="input"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="descripition">Descripition</label><br/>

        <textarea
          type="text"
          id="new-todo-input"
          className="textarea"
          name="descripition"
          autoComplete="off"
          value={descripition}
          onChange={handleDescripitionChange}
        ></textarea>

        <button type="submit" className="btn btn__primary btn__lg">
          Add Task
        </button>
      </form>
    </div>

    <button className="danger" onClick={props.closeModal}>Close</button>
  </Modal>
  );
}

export default ModalAdd;