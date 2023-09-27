import { useAppSelector } from "@/app/store";
import TaskTable from "./components/TaskTable";
import tableDataTask from "@/constants/tableDataTask";

const Tasks = () => {
  const tasks = useAppSelector((state) => state.tasks.data);
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <TaskTable tableData={tasks} />
      </div>
    </div>
  );
};

export default Tasks;
