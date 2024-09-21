import { Categories, categoryState, toDoSelector } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setCategory(value as Categories);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>{Categories.TO_DO}</option>
        <option value={Categories.DOING}>{Categories.DOING}</option>
        <option value={Categories.DONE}>{Categories.DONE}</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
