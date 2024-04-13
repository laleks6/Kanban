import { SetStateAction, useState } from "react";
import Input from "./Input";
import Button from "../../button/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import style from "../form-add/form.module.scss";
import iconAdd from "../../../assets/add.png";
function FormAdd() {
  const [value, setValue] = useState("");
  const [validClass, setValidClass] = useState(true);
  const [textValid, setTextValid] = useState(true);
  const dispatch = useDispatch();
  const validMax = "you have reached the 70 character limit";
  const validMin = "Insufficient number of characters";
  const onClick = () => {
    if (value.length === 0) {
      setTextValid(validMin);
      setValidClass(false);
    } else {
      dispatch(addTodo({ value }));
      setValue("");
      setValidClass(true);
    }
  };
  const oneChange = (e) => {
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
        maxlength="70"
        onChange={(e) => oneChange(e)}
        value={value}
      />
      <Button className={style.button} onClick={onClick} icon={iconAdd} />
      {!validClass && <span className={style.textValidation}>{textValid}</span>}
    </div>
  );
}

export default FormAdd;
