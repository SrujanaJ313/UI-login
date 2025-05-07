import { Avatar } from "@mui/material";
import React from "react";

const alertsData = [
  {
    image: "",
    userName: "Clifford Hale",
    message: "Hallo bro anak wes piro saiki? wes kuliah urung?…",
    time: "2 hours ago",
  },
  {
    image: "",
    userName: "Lottie Marsh",
    message: "Bro iki nggo tuku es anakmu yo, ojo dinggo judi neh!!",
    time: "3 hours ago",
  },
  {
    image: "",
    userName: "Jhon Smith",
    message: "Approved",
    time: "4 hours ago",
  },
];

const CaseAlerts = () => {
  return (
    <div className="overflow-auto h-auto alerts-remainders">
      {alertsData.map((alert) => (
        <div key={alert.userName} className="flex w-full gap-4 p-3 items-center">
          <Avatar alt={alert.userName} src="/static/images/avatar/1.jpg" />
          <div className="flex flex-col w-full gap-1">
            <span className="text-xs font-semibold">{alert.userName}</span>
            <span className="text-xs">{alert.message}</span>
            <span className="text-xs">{alert.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseAlerts;
