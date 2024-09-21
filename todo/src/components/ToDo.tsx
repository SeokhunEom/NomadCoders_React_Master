import React from "react";
import { Categories, toDoState, type ToDo } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: ToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        { text, id, category: name as ToDo["category"] },
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          {Categories.TO_DO}
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          {Categories.DOING}
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          {Categories.DONE}
        </button>
      )}
    </li>
  );
}

export default ToDo;
