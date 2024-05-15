type Props = {
  className: string;
  onClick: () => void;
  text: string;
  icon: string;
};
function Button({ className, onClick, text, icon }: Props) {
  return (
    <button className={className} onClick={onClick} type="button">
      {icon && <img src={icon} alt="iconAdd" />}
      {text && text}
    </button>
  );
}

export default Button;
