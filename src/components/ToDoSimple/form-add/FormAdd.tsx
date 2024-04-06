import { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import style from "../form-add/form.module.scss";
function FormAdd() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(addTodo({ value }));
  };
  const oneChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value, "oneChange");
  };

  return (
    <div>
      <Input oneChange={oneChange} />
      <Button className={style.button} onClick={onClick} text={"Add"} />
    </div>
  );
}

export default FormAdd;
