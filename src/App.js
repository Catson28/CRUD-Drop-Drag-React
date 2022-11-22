import React, { useState } from "react";
// import Modal from "react-modal";
import { useData } from "./providers/data";
import ModalAdd from "./components/modalAdd";
import DragDrop from "./components/dragDrop";
import { v4 as uuidv4 } from "uuid";
// css do modal 
import "./App.css";

const onDragEnd = (result, task, setTask) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    // colunas
    const sourceColumn = task[source.droppableId];
    const destColumn = task[destination.droppableId];
    // itens 
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];


    const [removed] = sourceItems.splice(source.index, 1);//subtraimos o indice source.index do array sourceItems
    destItems.splice(destination.index, 0, removed);
    setTask({
      ...task,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = task[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setTask({
      ...task,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const { setTask} = useData();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function addTask(title, descripition, task) {
    const newItem = { id: uuidv4(), title: title, descripition: descripition };
    const requestArray = task[0].items;
    requestArray.splice(task[0].items, 0,newItem );
    setTask({
      ...task
    });
    closeModal();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <ModalAdd addTask={addTask} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
      <DragDrop onDragEnd={onDragEnd} openModal={openModal}/>
    </div>
  );
}

export default App;
