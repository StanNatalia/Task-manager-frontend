import TaskPage from "./components/TaskPage";
import { Task } from "./types/task";

type AppProps = {
  tasks: Task[];
};

function App() {
  return <TaskPage />;
}

export default App;
