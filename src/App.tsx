import { Routes, Route } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import Kanban from "./components/Kanban/Kanban";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/simple" element={<Todo />} />
        <Route path="/complex" element={<Kanban />} />
      </Route>
    </Routes>
  );
}

export default App;
