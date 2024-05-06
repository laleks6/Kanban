import { Dispatch, SetStateAction, createContext } from "react";

type TypeContext = number;

type TypeActiveModal = {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
};
type TypeTaskSettings = {
  taskSettings: boolean;
  setTaskSettings: Dispatch<SetStateAction<boolean>>;
};
type TypeTagAddSettings = {
  tagsAddSettings: boolean;
  setTagsAddSettings: Dispatch<SetStateAction<boolean>>;
};
type TypeTagSettings = {
  tagSettings: boolean;
  settagSettings: Dispatch<SetStateAction<boolean>>;
};
const ColumnIndexContext = createContext<TypeContext>(-1);
const TaskIndexContext = createContext<TypeContext>(-1);
const TaskSettingsContext = createContext<null | TypeTaskSettings>(null);
const TagAddSettingsContext = createContext<null | TypeTagAddSettings>(null);
const TagSettingsContext = createContext<null | TypeTagSettings>(null);
const ActiveModalContext = createContext<null | TypeActiveModal>(null);

export {
  ColumnIndexContext,
  TaskIndexContext,
  TaskSettingsContext,
  TagAddSettingsContext,
  TagSettingsContext,
  ActiveModalContext,
};
