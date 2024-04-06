import { addTodo } from "../../store/todoSlice";

type Props = {
  className: string;
  onClick: () => void;
  text: string;
};
function Button({ className, onClick, text }: Props) {
  console.log("btn");
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
