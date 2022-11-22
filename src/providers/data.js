// import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

export const DataContext = React.createContext({});

export const DataProvider = (props) => {
  // const [user, setUser] = useState({
  //   name: "",
  // });

  const [task, setTask]= useState([
    {
      id: [uuidv4()],
      button: "Add",
      status: "To do",
      items: [],
    },
    {
      id: [uuidv4()],
      status: "In Progress",
      items: []
    },
    {
      id: [uuidv4()],
      status: "Done",
      items: []
    }
  ]);

  /*
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
      setUser({
        name: "",
      });
    }
  }, []);
  */

  return (
    <DataContext.Provider value={{ task, setTask }}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);