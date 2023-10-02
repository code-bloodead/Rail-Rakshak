import { useAppSelector } from "@/app/store";
import TaskTable from "./components/TaskTable";
import { Task } from "@/app/features/TaskSlice";
import { useEffect, useState } from "react";

const Tasks = () => {
  const tasks = useAppSelector((state) => state.tasks.data);

  const [tasksData, setTasksData] = useState<Task[]>(tasks);

  useEffect(() => {
    setTasksData(tasks);
  }, [tasks]);

  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <TaskTable tableData={tasksData} />
      </div>
    </div>
  );
};

export default Tasks;
