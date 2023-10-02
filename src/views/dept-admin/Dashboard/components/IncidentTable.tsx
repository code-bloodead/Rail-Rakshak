import { useState, useEffect } from "react";
import Card from "@/components/card";

import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { MdCheckCircle, MdOutlinePostAdd } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ImEnlarge } from "react-icons/im";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaRegEye } from "react-icons/fa";

import IncidentModal from "@/components/modal/IncidentModal";
import ConvertTaskModal from "@/components/modal/ConvertTaskModal";

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
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  station_name: string;
  location: string;
  source: string;
  status: string;
  created_at: Date;
  actions: string | undefined;
};

function IncidentTable(props: { tableData: any }) {
  const columnHelper = createColumnHelper<RowObj>();
  const navigate: NavigateFunction = useNavigate();

  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(() => [...tableData]);
  const [selectedRow, setSelectedRow] = useState<RowObj | null>(null);

  const {
    isOpen: isIncidentModalOpen,
    onOpen: onIncidentModalOpen,
    onClose: onIncidentModalClose,
  } = useDisclosure();

  const {
    isOpen: isConvertTaskModalOpen,
    onOpen: onConvertTaskModalOpen,
    onClose: onConvertTaskModalClose,
  } = useDisclosure();

  const handleView = (rowObj: RowObj) => {
    setSelectedRow(rowObj);
    onIncidentModalOpen();
  };

  const handleAddTask = (rowObj: RowObj) => {
    setSelectedRow(rowObj);
    onConvertTaskModalOpen();
  };

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          INCIDENT ID
        </p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CATEGORY
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("source", {
      id: "source",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SOURCE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
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
          {info.getValue() === "Resolved" ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : info.getValue() === "Pending" ? (
            <BsClockHistory className="me-1 text-amber-500 dark:text-amber-300" />
          ) : null}
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
        <div className="flex items-center ml-1 space-x-2">
          <button
            onClick={() => {
              handleAddTask(info.row.original);
            }}
            className={` flex items-center justify-center rounded-lg bg-lightPrimary p-[0.4rem]  font-medium text-brand-500 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
          >
            <MdOutlinePostAdd className="h-4 w-4" />
          </button>
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
      <Card extra={"w-full h-full sm:overflow-auto px-6 col-span-3"}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Recent Incidents
          </div>
          <button
            onClick={() => {
              navigate("/dept-admin/detected-incidents");
            }}
            className={`linear flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
          >
            <ImEnlarge className="h-4 w-4" />
          </button>
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
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
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
                            className="border-white/0 py-3  pr-4"
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
        <>
          <IncidentModal
            showSource={true}
            onIncidentModalClose={onIncidentModalClose}
            isIncidentModalOpen={isIncidentModalOpen}
            onConvertTaskModalOpen={onConvertTaskModalOpen}
            incident={selectedRow}
          />
          <ConvertTaskModal
            incident={selectedRow}
            isConvertTaskModalOpen={isConvertTaskModalOpen}
            onConvertTaskModalClose={onConvertTaskModalClose}
          />
        </>
      )}
    </>
  );
}

export default IncidentTable;
