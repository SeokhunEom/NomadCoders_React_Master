import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ToDo {
  id: number;
  text: string;
}

interface ToDoState {
  [key: string]: ToDo[];
}

export const toDoState = atom<ToDoState>({
  key: "toDo",
  default: { "To Do": [], Doing: [], Done: [] },
  effects_UNSTABLE: [persistAtom],
});

export const boardState = atom<string[]>({
  key: "boardOrder",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});
