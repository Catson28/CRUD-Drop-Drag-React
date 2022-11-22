import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useData } from "../providers/data";

function DragDrop(props) {
  const {task, setTask} = useData();

  return (
    <DragDropContext
      onDragEnd={result => props.onDragEnd(result, task, setTask)}
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
                            ? <button className="addTask" onClick={props.openModal} >{ column.button }</button> 
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
  );
}

export default DragDrop;