import { useMemo, useState } from "react";
import { useAppSelector } from "../hook/hook";
import style from "./complex.module.scss";
import Column from "./column/Column";
import { ActiveModalContext, TaskSettingsContext } from "../context/Context";
import TaskSettingsModal from "./task/taskSettings/TaskSettingsModal";
import { TypeTaskDataContext } from "../types/baseTypes";

function Kanban() {
  // const [tasks, setTasks] = useState(arrTasks);
  const columns = useAppSelector((state) => state.kanban.columns);
  const [modalActive, setModalActive] = useState(false);
  const [taskSettings, setTaskSettings] = useState(false);
  const [indices, setIndices] = useState<TypeTaskDataContext | null>(null);
  // const [tagSettings, settagSettings] = useState(false);
  // const [tagsAddSettings, setTagsAddSettings] = useState(false);

  const modalActiveMemo = useMemo(
    () => ({ modalActive, setModalActive }),
    // eslint-disable-next-line prettier/prettier
    [modalActive, setModalActive]
  );

  const taskSettingsMemo = useMemo(
    () => ({ taskSettings, setTaskSettings, indices, setIndices }),
    // eslint-disable-next-line prettier/prettier
    [taskSettings, setTaskSettings, indices, setIndices]
  );
  const onClickBlockout = () => {
    setModalActive(false);
    setTaskSettings(false);
    // setTagsAddSettings(false);
  };
  return (
    <ActiveModalContext.Provider value={modalActiveMemo}>
      <TaskSettingsContext.Provider value={taskSettingsMemo}>
        {modalActive && (
          <div
            className={style.blockout}
            onClick={() => onClickBlockout()}
            onKeyDown={() => onClickBlockout()}
            aria-hidden
          />
        )}
        <article className={style.complex}>
          {columns &&
            columns.map((el, i) => (
              <Column
                key={`${el.id}`}
                column={el}
                inedex={i}
                columns={columns}
              />
            ))}
        </article>
        {taskSettings && <TaskSettingsModal taskIndex={indices} />}
      </TaskSettingsContext.Provider>
    </ActiveModalContext.Provider>
  );
}

export default Kanban;
