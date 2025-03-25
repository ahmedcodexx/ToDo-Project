import Todo from "./components/todo-list/Todo";
import './App.css'

function App() {
  return (
      <div className="todo-container">
        <h1 className="text-center text-success">ToDo Tasks</h1>
        <Todo />
      </div>
  );
}

export default App;
