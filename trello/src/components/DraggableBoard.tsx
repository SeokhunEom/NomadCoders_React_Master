import Board from "./Board";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { toDoState } from "../atoms";
import { useRecoilValue } from "recoil";

interface DraggableBoardProps {
  boardId: string;
  index: number;
}

const DraggableBoard = ({ boardId, index }: DraggableBoardProps) => {
  const toDos = useRecoilValue(toDoState);

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Board
            boardId={boardId}
            toDos={toDos[boardId]}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableBoard);
