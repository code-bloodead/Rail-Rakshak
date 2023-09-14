import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const CrowdCounter = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://localhost:5005/ws");
  const [messageHistory, setMessageHistory] = useState<{ data: string }[]>([]);

  const { lastMessage, readyState } = useWebSocket(socketUrl);
  const livePeopleCount = lastMessage?.data || 0;

  console.log({ lastMessage });
  console.log({ livePeopleCount });

  useEffect(() => {
    console.log("Message history: ", messageHistory);
  }, [messageHistory]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <br />
      <span>Live Person count: {livePeopleCount}</span>
      <br />
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>{message ? message.data : 0}</li>
        ))}
      </ul>
    </div>
  );
};

export default CrowdCounter;
