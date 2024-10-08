import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { boardState, toDoState } from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import DraggableBoard from "./components/DraggableBoard";
import { StrictModeDroppable as Droppable } from "./components/StrictModeDroppable";
import Trash from "./components/Trash";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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

const AddBoardForm = styled.form`
  width: 300px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dfe1e6;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #5aac44;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #519839;
    }
  }
`;

interface FormProps {
  boardName: string;
}

function App() {
  const setToDos = useSetRecoilState(toDoState);
  const [boardOrder, setBoardOrder] = useRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<FormProps>();

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

  const addBoard = ({ boardName }: FormProps) => {
    if (boardOrder.includes(boardName)) {
      alert("이미 존재하는 보드 이름입니다.");
      return;
    }

    setBoardOrder((prevBoardOrder) => [...prevBoardOrder, boardName]);
    setToDos((prevToDos) => ({
      ...prevToDos,
      [boardName]: [],
    }));
    setValue("boardName", "");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BoardArea droppableId="boards" type="board" direction="horizontal">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              <Boards>
                {boardOrder.map((boardId, index) => (
                  <DraggableBoard
                    key={boardId}
                    boardId={boardId}
                    index={index}
                  />
                ))}
              </Boards>
              {provided.placeholder}
            </Boards>
          )}
        </BoardArea>
        <AddBoardForm onSubmit={handleSubmit(addBoard)}>
          <input
            {...register("boardName", { required: true })}
            type="text"
            placeholder="새로운 보드 이름"
          />
          <button type="submit">보드 추가</button>
        </AddBoardForm>
        <Trash boardId="Trash" />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
