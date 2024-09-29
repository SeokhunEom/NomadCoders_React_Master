import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import type { SVGProps } from "react";
import styled from "styled-components";

interface TrashProps {
  boardId: string;
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

const TrashContainer = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  top: 0;
  width: 300px;
  height: 100px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#ffebe6" : "#f5f5f5"};
  border: 2px dashed
    ${(props) => (props.isDraggingOver ? "#eb5a46" : "#dfe1e6")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  margin-top: 40px;
`;

const TrashIcon = styled(PhTrash)`
  color: #eb5a46;
  width: 40px;
  height: 40px;
`;

const Trash = ({ boardId }: TrashProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <TrashContainer
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <TrashIcon />
        </TrashContainer>
      )}
    </Droppable>
  );
};

export default Trash;
