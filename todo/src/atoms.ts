import { atom } from "recoil";

export interface ToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<ToDo[]>({
  key: "toDo",
  default: [],
});
