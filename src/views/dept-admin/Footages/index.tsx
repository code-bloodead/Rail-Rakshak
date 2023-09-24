import Card from "@/components/card";
import VideoPlayer from "./Stream/VideoPlayer";
import useCrowdCounter from "./Stream/useCrowdCounter";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Footages = () => {
  const streams = [
    {
      title: "Platform no. 1",
      streamUrl: "http://localhost:8888/mystream/index.m3u8",
      socketUrl: "ws://localhost:5005/ws",
    },
  ];
  const { livePeopleCount, peopleCountHistory } = useCrowdCounter(
    streams[0].socketUrl
  );

  console.log(peopleCountHistory);

  const chartOptions: ApexOptions = {
    chart: {
      id: "message-history-line",
      type: "line",
      height: 350,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "People in Premise",
      data: peopleCountHistory,
    },
  ];

  return (
    <div>
      <div className="mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card extra="min-h-[40vh] ">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              {streams[0].title}
            </h1>
          </div>
          <div className="p-2">
            <span>Live Person count: {livePeopleCount}</span>
            {livePeopleCount > 17 ? (
              <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                Overcrowded
              </span>
            ) : (
              <span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                Average crowd
              </span>
            )}
          </div>
          <div className="p-2">
            <VideoPlayer url={streams[0].streamUrl} />
          </div>
        </Card>
        <Card extra="min-h-[40vh] ">
          {/* <LineChart chartData={peopleCountHistory} /> */}
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
          />
        </Card>
      </div>
      {/* <div className="mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card extra="min-h-[40vh]">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 3
            </h1>
          </div>
        </Card>
        <Card extra="min-h-[40vh]">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 4
            </h1>
          </div>
        </Card>
      </div> */}
    </div>
  );
};

export default Footages;
