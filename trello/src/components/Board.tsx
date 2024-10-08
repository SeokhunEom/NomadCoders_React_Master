import { ToDo, toDoState } from "../atoms";

import DraggableCard from "./DraggableCard";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import React from "react";
import type { SVGProps } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface WrapperProps {
  isDragging: boolean;
}

interface BoardProps {
  toDos: ToDo[];
  boardId: string;
  isDragging: boolean;
  onDeleteBoard: (boardId: string) => void;
}

interface AreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface FormProps {
  toDo: string;
}

function PhTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"
      ></path>
    </svg>
  );
}

const Wrapper = styled.div<WrapperProps>`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) =>
    props.isDragging ? "lightcoral" : props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative; /* 삭제 버튼 위치를 위한 설정 */
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #eb5a46;
  font-size: 18px;

  &:hover {
    color: #ff6b6b;
  }
`;

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

const Board = ({ toDos, boardId, isDragging, onDeleteBoard }: BoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<FormProps>();

  const onValid = ({ toDo }: FormProps) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  const handleDelete = () => {
    if (window.confirm(`"${boardId}" 보드를 삭제하시겠습니까?`)) {
      onDeleteBoard(boardId);
    }
  };

  return (
    <Wrapper isDragging={isDragging}>
      <Title>{boardId}</Title>
      <DeleteButton
        onClick={handleDelete}
        aria-label={`Delete ${boardId} board`}
      >
        <PhTrash />
      </DeleteButton>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId} type="task">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default React.memo(Board);
