import React, { useState } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PieCard = () => {
  const [startDate, setStartDate] = useState(new Date("2024-11-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Hebdomadaire", "Semestriel", "Partiel"],
    colors: ["#1E40AF", "#0d9488", "#a855f7"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
    },
    stroke: {
      colors: ["#fff"],
    },
  };

  const chartSeries = [10, 5, 0];

  return (
    <div className="bg-white w-full max-w-sm mx-auto">
      <div className=" mb-4">
        <div>
          {/* <h2 className="text-sm font-medium text-gray-800">Website traffic</h2> */}
          <div className="text-lg text-blue-700 cursor-pointer hover:underline">
            {startDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      {/* <div className="flex gap-2 justify-center mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="px-2 py-1 border rounded-md text-sm"
          placeholderText="Start date"
        />
        <span className="text-sm text-gray-500 pt-1">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="px-2 py-1 border rounded-md text-sm"
          placeholderText="End date"
        />
      </div> */}

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        height={300}
      />
    </div>
  );
};

export default PieCard;
