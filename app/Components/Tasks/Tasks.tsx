"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import CreateContent from "../Modals/CreateContent";
import CreateModal from "../Modals/CreateModal";
import EditModal from "../Modals/EditModal";
import EditContent from "../Modals/EditContent";

interface Props {
  title: string;
  tasks: any[];

}

function Tasks({ title, tasks}: Props) {
  const { theme, openCreateModal, createModal, editModal, editTasks } = useGlobalState();

  console.log(editTasks)

  return (
    <TasksStyled theme={theme}>
      {createModal && <CreateModal content={<CreateContent/>}/>}
      
      {editModal && <EditModal content={<EditContent {...editTasks}/>}/>}
      {/* {editModal && <div>hi</div>} */}
      <h1>{title}</h1>
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              isImportant={task.isImportant}
              id={task.id}
            />
          ))}
          <button className="create-task" onClick={openCreateModal}>
            {plus}
            Add New Task
          </button>
        </div>
      
    </TasksStyled>
  );
}

const TasksStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height:16rem;
    height: 100%;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    /* transition: all 0.3s ease; */

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
