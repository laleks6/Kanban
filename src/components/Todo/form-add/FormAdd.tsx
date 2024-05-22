import React, { useState } from "react";
import { useAppDispatch } from "../../hook/hook";
import { addTodo } from "../../store/todoSlice";
import style from "./form.module.scss";
import iconAdd from "../../../assets/add.png";

function FormAdd() {
  const [value, setValue] = useState("");
  const [validClass, setValidClass] = useState(true);
  const [textValid, setTextValid] = useState<string | boolean>(true);
  const dispatch = useAppDispatch();
  const validMax = "you have reached the 70 character limit";
  const validMin = "Insufficient number of characters";

  function addValue() {
    if (value.length === 0) {
      setTextValid(validMin);
      setValidClass(false);
    } else {
      dispatch(addTodo(value));
      setValue("");
      setValidClass(true);
    }
  }

  const onClick = () => {
    addValue();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addValue();
  };

  const oneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 70) {
      setValidClass(false);
      setTextValid(validMax);
    } else {
      setValidClass(true);
    }
    setValue(e.target.value);
    console.log(e.target.value, "oneChange");
  };

  return (
    <div className={style.formAdd}>
      <input
        type="text"
        className={`${style.inputAdd} ${!validClass && style.valid}`}
        maxLength={70}
        onChange={(e) => oneChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={value}
      />
      <button type="button" className={style.button} onClick={() => onClick()}>
        <img src={iconAdd} alt="iconAdd" />
      </button>
      {!validClass && <span className={style.textValidation}>{textValid}</span>}
    </div>
  );
}

export default FormAdd;
