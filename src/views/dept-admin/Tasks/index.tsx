import TaskTable from "./components/TaskTable";
import tableDataTask from "@/constants/tableDataTask";

const Tasks = () => {
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <TaskTable tableData={tableDataTask} />
      </div>
    </div>
  );
};

export default Tasks;
