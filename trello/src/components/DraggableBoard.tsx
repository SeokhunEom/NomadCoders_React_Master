import { boardState, toDoState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import Board from "./Board";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

interface DraggableBoardProps {
  boardId: string;
  index: number;
}

const DraggableBoard = ({ boardId, index }: DraggableBoardProps) => {
  const toDos = useRecoilValue(toDoState);
  const [_, setBoardOrder] = useRecoilState(boardState);
  const setToDosSetter = useRecoilState(toDoState)[1];

  const deleteBoard = (boardIdToDelete: string) => {
    setBoardOrder((prevBoardOrder) =>
      prevBoardOrder.filter((id) => id !== boardIdToDelete)
    );

    setToDosSetter((prevToDos) => {
      const { [boardIdToDelete]: _, ...rest } = prevToDos;
      return rest;
    });
  };

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
            onDeleteBoard={deleteBoard}
          />
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableBoard);
