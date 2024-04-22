type Props = {
  oneChange: (e: any) => void;
  className: string;
  boolen: boolean;
};
function Input({ oneChange, className, boolen }: Props) {
  console.log("input");
  return (
    <input
      type="text"
      className={`${className} ${boolen}`}
      maxLength="50"
      onChange={(e) => oneChange(e)}
    />
  );
}
export default Input;
