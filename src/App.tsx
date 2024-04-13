import { Routes, Route, Link } from "react-router-dom";
import TodoSimple from "./components/ToDoSimple/TodoSimple";
import TodoComplex from "./components/TodoComplex/TodoComplex";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/simple" element={<TodoSimple />} />
        <Route path="/complex" element={<TodoComplex />} />
      </Route>
    </Routes>
  );
}

export default App;
