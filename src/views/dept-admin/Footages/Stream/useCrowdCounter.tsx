import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const defaultPeopleCountHistory = [
  19, 17, 18, 17, 17, 17, 17, 16, 17, 18, 18, 19, 19, 18, 19, 20, 20, 20, 19,
  20, 21, 23, 21, 21, 21, 20, 20, 20, 19, 20, 20, 21, 19, 20, 20, 21, 20, 19,
  18, 18, 18, 18, 20, 20, 19, 17, 16,
];
const useCrowdCounter = (socketUrl: string) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [peopleCountHistory, setPeopleCountHistory] = useState<number[]>(
    defaultPeopleCountHistory
  );
  const [livePeopleCount, setLivePeopleCount] = useState<number>(0);
  const [connectionStatus, setConnectionStatus] = useState("Uninstantiated");

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    setConnectionStatus(
      {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
      }[readyState]
    );
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      setPeopleCountHistory((prev) => prev.concat(Number(lastMessage.data)));
      setLivePeopleCount(Number(lastMessage.data));
    }
  }, [lastMessage]);

  return {
    livePeopleCount,
    messageHistory,
    peopleCountHistory,
    connectionStatus,
  };
};

export default useCrowdCounter;
