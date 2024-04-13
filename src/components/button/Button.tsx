import { addTodo } from "../store/todoSlice";

type Props = {
  className?: string;
  onClick?: () => void;
  text?: string;
  icon?: string;
};
function Button({ className, onClick, text, icon }: Props) {
  console.log("btn");
  return (
    <button className={className} onClick={onClick}>
      {icon && <img src={icon} alt="iconAdd"></img>}
      {text && text}
    </button>
  );
}

export default Button;
