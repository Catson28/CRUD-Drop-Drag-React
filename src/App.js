import React, { useState } from "react";
import ModalAdd from "./components/modalAdd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useData } from "./providers/data";
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
  const {task, setTask} = useData();

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

      <DragDropContext
        onDragEnd={result => onDragEnd(result, task, setTask)}
      >
        {Object.entries(task).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "50px 0"
              }}
              key={columnId}
            ><div style={{ width: '100%', justifyContent:'center', color:'white', backgroundColor: "darkblue", textAlign: "center" }}>
              <h2 style={{textTransform:"uppercase" }}>{column.status}</h2>
            </div>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                            {
                              column.button!=null
                              ? <button className="addTask" onClick={openModal} >{ column.button }</button> 
                              :null
                            }
                                  
                      
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 10,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#456C86"
                                        : "#54a0ff",
                                      color: "dark",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <h4 style={{textTransform:"capitalize"}}>{item.title}</h4>
                                    <p>{item.descripition}</p>

                                    <button
                                      type="button"
                                      className="warning"
                                      onClick={() => {

                                        // array 
                                        const thisColumn = column.items;

                                        // o elemento 
                                        const thisItem = item;

                                        // qual e o indice do elemento no array 
                                        const thisIndexColum = thisColumn.indexOf(thisItem);
                                        thisColumn.splice(thisIndexColum, 1);

                                        setTask({
                                          ...task
                                        });


                                    }}
                                    >
                                      delete
                                    </button>

                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
