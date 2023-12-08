"use client";

import { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTasks, setEditTasks] = useState([]);
  const theme = themes[selectedTheme];

  const openCreateModal = () => {
    setCreateModal(true)
  };

  const closeCreateModal = () => {
    setCreateModal(false)
  }

  const openEditModal = (editTask) =>{
    setEditModal(true);
    setEditTasks(editTask)
  }

  const closeEditModal = () => {
    setEditModal(false);
  }

  const collapseMenu =() =>{
setCollapsed(!collapsed)
  }


  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      
      const sorted = res.data.sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);
      toast.success("Task Updated");
      console.log(res.data)
      allTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };


  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const unimportantTasks = tasks.filter(task => task.isImportant === false);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        unimportantTasks,
        updateTask,
        openCreateModal,
        closeCreateModal,
        createModal,
        allTasks,
        collapsed,
        collapseMenu,
        openEditModal,
        closeEditModal,
        editModal,
        editTasks
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
