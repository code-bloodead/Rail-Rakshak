import Card from "@/components/card";
import VideoPlayer from "./Stream/VideoPlayer";
import useCrowdCounter from "./Stream/useCrowdCounter";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { CrowdData, getAlert } from "./crowdAnalyser";
import CreateTaskButton from "./CreateTaskButton";

enum Tab {
  Footage = "Footage",
  Statistics = "Statistics",
}

const Footages = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Footage);

  const streams = [
    {
      title: "Platform no. 1",
      streamUrl: "http://localhost:8888/mystream/index.m3u8",
      socketUrl: "ws://localhost:5005/ws",
    },
    {
      title: "Platform no. 2",
      streamUrl: "http://localhost:8888/mystream/index.m3u8",
      socketUrl: "ws://localhost:5005/ws",
    },
    // {
    //   title: "Platform no. 3",
    //   streamUrl: "http://localhost:8888/mystream/index.m3u8",
    //   socketUrl: "ws://localhost:5005/ws",
    // },
    // {
    //   title: "Platform no. 4",
    //   streamUrl: "http://localhost:8888/mystream/index.m3u8",
    //   socketUrl: "ws://localhost:5005/ws",
    // },
  ];

  const { livePeopleCount: liveCount1, peopleCountHistory: history1 } =
    useCrowdCounter(streams[0].socketUrl);
  const { livePeopleCount: liveCount2, peopleCountHistory: history2 } =
    useCrowdCounter(streams[1].socketUrl);
  // const { livePeopleCount: liveCount3, peopleCountHistory: history3 } =
  //   useCrowdCounter(streams[2].socketUrl);
  // const { livePeopleCount: liveCount4, peopleCountHistory: history4 } =
  // useCrowdCounter(streams[3].socketUrl);

  const platformWiseCrowd: CrowdData[] = [
    {
      livePeopleCount: liveCount1,
      peopleCountHistory: history1,
      name: `Platforn no. 1`,
      key: 1,
      alert: getAlert(history1),
    },
    {
      livePeopleCount: liveCount2,
      peopleCountHistory: history2,
      name: `Platforn no. 2`,
      key: 2,
      alert: getAlert(history2),
    },
    // {
    //   livePeopleCount: liveCount3,
    //   peopleCountHistory: history3,
    //   name: `Platforn no. 3`,
    //   key: 3,
    //   alert: getAlert(history3),
    // },
    // {
    //   livePeopleCount: liveCount4,
    //   peopleCountHistory: history4,
    //   name: `Platforn no. 4`,
    //   key: 4,
    //   alert: getAlert(history4),
    // },
  ];

  // Aggregate live and historical data for all platforms
  const combinedData = platformWiseCrowd.map((platformData, idx) => ({
    label: `Platforn no. ${idx + 1}`,
    live: platformData.livePeopleCount,
    history: platformData.peopleCountHistory.reduce(
      (sum, count) => sum + count,
      0
    ),
  }));

  const platformWiseSeries = platformWiseCrowd.map((platformData) => ({
    name: platformData.name,
    data: platformData.peopleCountHistory,
  }));
  const liveSeries = combinedData.map((data) => data.live);
  const historySeries = combinedData.map((data) => data.history);

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {Object.values(Tab).map((currentTab) => (
            <li className="mr-2">
              <a
                href="#"
                onClick={() => setActiveTab(currentTab)}
                className={`inline-block p-4 ${
                  activeTab == currentTab
                    ? "active text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-800 hover:border-gray-800 dark:hover:text-gray-800 "
                }`}
              >
                {currentTab}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <>
        <div
          className="mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2"
          style={{
            display: activeTab === Tab.Footage ? "grid" : "none",
          }}
        >
          {streams.map((stream, idx) => (
            <Card extra="min-h-[40vh] ">
              <div className="flex items-center justify-start">
                <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
                  {stream.title}
                </h1>
              </div>
              <div className="p-2">
                <span className="mx-2">
                  Live Person count: {platformWiseCrowd[idx].livePeopleCount}
                </span>
                {platformWiseCrowd[idx].livePeopleCount > 20 ? (
                  <>
                    <span className="mr-2 rounded px-2.5 py-0.5 text-xs font-medium bg-red-100 border border-red-400 text-red-700">
                      Heavily crowded{" "}
                    </span>
                    <CreateTaskButton />
                  </>
                ) : platformWiseCrowd[idx].livePeopleCount > 17 ? (
                  <>
                    <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Overcrowded{" "}
                    </span>
                    <CreateTaskButton />
                  </>
                ) : (
                  <span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Average crowd
                  </span>
                )}
              </div>
              <div>
                <VideoPlayer url={stream.streamUrl} />
              </div>
              {/* <CrowdAlert alertLevel={platformWiseCrowd[idx].alert} /> */}
            </Card>
          ))}
        </div>
      </>

      <>
        <div
          className="p-2 mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2"
          style={{
            visibility: activeTab === Tab.Statistics ? "visible" : "hidden",
          }}
        >
          <Card extra="min-h-[40vh]">
            <div className="p-3">
              <ReactApexChart
                options={{
                  chart: {
                    id: "platform-wise-data-pie",
                    type: "pie",
                    height: 350,
                  },
                  title: {
                    text: "Live Crowd distribution",
                    align: "left",
                  },
                  labels: combinedData.map((data) => data.label),
                }}
                series={liveSeries}
                type="pie"
                width={380}
              />
              <br />
              <ReactApexChart
                options={{
                  chart: {
                    id: "platform-wise-data-pie",
                    type: "pie",
                    height: 500,
                  },
                  title: {
                    text: "Overall Crowd distribution",
                    align: "left",
                  },
                  labels: combinedData.map((data) => data.label),
                }}
                series={historySeries}
                type="pie"
                width={380}
              />
            </div>
          </Card>
          <Card>
            <div className="p-3">
              <ReactApexChart
                series={platformWiseSeries}
                options={{
                  chart: {
                    height: 900,
                    width: 1000,
                    type: "area",
                    // stacked: true,
                    zoom: {
                      enabled: true,
                      type: "x",
                      autoScaleYaxis: false,
                      zoomedArea: {
                        fill: {
                          color: "#90CAF9",
                          opacity: 0.4,
                        },
                        stroke: {
                          color: "#0D47A1",
                          opacity: 0.4,
                          width: 1,
                        },
                      },
                    },
                  },
                  xaxis: {
                    range: 7,
                    labels: {
                      show: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  tooltip: {
                    style: {
                      fontSize: "10px",
                    },
                  },
                  stroke: {
                    curve: "smooth",
                  },
                }}
                type="area"
              />
            </div>
          </Card>
        </div>
      </>
    </div>
  );
};

export default Footages;
