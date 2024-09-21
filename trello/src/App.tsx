import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { StrictModeDroppable } from "./StrictModeDroppable";

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <StrictModeDroppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>⭐️</span>
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>⭐️</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </StrictModeDroppable>
      </div>
    </DragDropContext>
  );
}

export default App;
