import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { boardState, toDoState } from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import DraggableBoard from "./components/DraggableBoard";
import { StrictModeDroppable as Droppable } from "./components/StrictModeDroppable";
import Trash from "./components/Trash";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const BoardArea = styled(Droppable)`
  padding: 30px;
  background-color: white;
`;

function App() {
  const setToDos = useSetRecoilState(toDoState);
  const [boardOrder, setBoardOrder] = useRecoilState(boardState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    if (!destination) return;

    if (type === "board") {
      setBoardOrder((prevBoardOrder) => {
        const newBoardOrder = [...prevBoardOrder];
        const [movedBoard] = newBoardOrder.splice(source.index, 1);
        newBoardOrder.splice(destination.index, 0, movedBoard);
        return newBoardOrder;
      });
    } else if (type === "task") {
      if (destination.droppableId === "Trash") {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          boardCopy.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      } else if (destination.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      } else {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BoardArea droppableId="boards" type="board" direction="horizontal">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boardOrder.map((boardId, index) => (
                <DraggableBoard key={boardId} boardId={boardId} index={index} />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </BoardArea>
        <Trash boardId="Trash" />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
