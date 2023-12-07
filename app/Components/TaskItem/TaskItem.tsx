"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { check, edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import EditModal from "../Modals/EditModal";
import EditContent from "../Modals/EditContent";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
  isImportant: boolean;
}

function TaskItem({ title, description, date, isCompleted, isImportant, id }: Props) {
  const { theme, deleteTask, updateTask, openEditModal, editModal} = useGlobalState();


  return (
    <>
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="not-completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        
        {isImportant ? (
          <button
            className="important"
            onClick={() => {
              const task = {
                id,
                isImportant: !isImportant,
              };

              updateTask(task);
            }}
          >
            Urgent
          </button>
        ) : (
          <button
            className="not-important"
            onClick={() => {
              const task = {
                id,
                isImportant: !isImportant,
              };

              updateTask(task);
            }}
          >
            Casual
          </button>
        )}

        <button
          className="edit"
          onClick={()=>{
            const editTask = {id, title, description,date}
            openEditModal(editTask)
          }}
        >
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
    </>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 100% ;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .not-completed {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }

    .important, .not-important{
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .important {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default TaskItem;
