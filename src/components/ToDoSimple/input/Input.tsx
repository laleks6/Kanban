type Props = {
  oneChange: (e: any) => void;
};
function Input({ oneChange }: Props) {
  console.log("input");
  return <input type="text" onChange={(e) => oneChange(e)} />;
}
export default Input;
