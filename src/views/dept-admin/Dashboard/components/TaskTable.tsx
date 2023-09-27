import { useState } from "react";
import Card from "@/components/card";
import { ImEnlarge } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { FaRegEye, FaTrash, FaUserClock } from "react-icons/fa";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { getDate } from "@/constants/utils";
import { useAppSelector } from "@/app/store";
import ViewTaskModal from "./ViewTaskModal";
import { useDisclosure } from "@chakra-ui/hooks";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

type RowObj = {
  id?: string;
  title: string;
  description: string;
  assigned_to: string[];
  image: string;
  created_at?: Date;
  deadline: string;
  status?: string;
  assc_incident: string;
  dept_name: string;
  station_name: string;
  actions?: string | undefined;
};

function TaskTable(props: { tableData: any }) {
  const staff = useAppSelector((state) => state.staff.data);
  const columnHelper = createColumnHelper<RowObj>();
  const navigate: NavigateFunction = useNavigate();
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  let defaultData = tableData;
  const [selectedRow, setSelectedRow] = useState<RowObj | null>(null);

  const {
    isOpen: isViewTaskModalOpen,
    onOpen: onViewTaskModalOpen,
    onClose: onViewTaskModalClose,
  } = useDisclosure();

  const handleView = (rowObj: RowObj) => {
    setSelectedRow(rowObj);
    onViewTaskModalOpen();
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TASK ID
        </p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">TITLE</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {getDate(info.getValue().toString())}
        </p>
      ),
    }),
    columnHelper.accessor("assigned_to", {
      id: "assigned",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ASSIGNED
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info
            .getValue()
            .map((id) => {
              const staffObj = staff.find((staffItem) => staffItem.id === id);
              return staffObj ? staffObj.staff_name : null;
            })
            .join(", ") || "-"}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === "Completed" ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : info.getValue() === "Assigned" ? (
            <FaUserClock className="me-1 text-teal-500 dark:text-teal-300" />
          ) : (
            <BsClockHistory className="me-1 text-amber-500 dark:text-amber-300" />
          )}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("actions", {
      id: "actions",
      header: () => (
        <p className="mr-1 inline text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center ml-1">
          <button
            onClick={() => handleView(info.row.original)}
            className={` flex items-center justify-center rounded-lg bg-lightPrimary p-[0.4rem]  font-medium text-brand-500 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
          >
            <FaRegEye className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });
  return (
    <>
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Tasks Table
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                navigate("/dept-admin/tasks");
              }}
              className={` linear mx-1 flex items-center justify-center rounded-lg bg-lightPrimary p-[0.4rem] text-xl font-bold text-brand-500 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
            >
              <AiOutlinePlus className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                navigate("/dept-admin/tasks");
              }}
              className={`linear mx-1 flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
            >
              <ImEnlarge className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-2 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-1 pt-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 6)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={`${
                              cell.column.id === "actions"
                                ? "min-w-[20px]"
                                : "min-w-[80px] pr-1"
                            }  border-white/0 py-3 `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>
      {selectedRow && (
        <ViewTaskModal
          onViewTaskModalClose={onViewTaskModalClose}
          isViewTaskModalOpen={isViewTaskModalOpen}
          task={selectedRow}
        />
      )}
    </>
  );
}

export default TaskTable;
