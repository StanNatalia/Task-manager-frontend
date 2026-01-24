import { connect } from "react-redux";
import TaskPage from "./components/TaskPage";
import { Task } from "./types/task";

type AppProps = {
  tasks: Task[];
};

function App({ tasks }: AppProps) {
  return <TaskPage tasks={tasks} />;
}

const mapStateToProps = (state: Task[]) => ({
  tasks: state,
});

export default connect(mapStateToProps)(App);
