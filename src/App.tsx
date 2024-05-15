import { Routes, Route } from "react-router-dom";
import TodoSimple from "./components/ToDoSimple/TodoSimple";
import Kanban from "./components/TodoComplex/Kanban";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/simple" element={<TodoSimple />} />
        <Route path="/complex" element={<Kanban />} />
      </Route>
    </Routes>
  );
}

export default App;
