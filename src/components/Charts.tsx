import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type post_id_type = {
  post_id: string;
};

const Charts = ({ post_id }: post_id_type) => {
  const [chartData, setChartData] = useState<any[]>([]);

  const payload = {
    metric:
      "post_impressions,post_impressions_organic,post_impressions_paid,post_engaged_users,post_clicks,post_reactions_by_type_total,post_negative_feedback",
    period: "lifetime",
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `https://meta-api-eight.vercel.app/api/v1/feed/summary/${post_id}`,
          payload
        );
        const apiData = response.data.data.data;

        // Format the data for the chart
        const formattedData = apiData.map((metric: any) => {
          // If the value is an object (like for post_reactions_by_type_total), handle it accordingly
          const value =
            typeof metric.values[0]?.value === "object"
              ? 0 // or handle it differently, e.g., sum the values if it's an object with multiple keys
              : metric.values[0]?.value || 0;

          return {
            name: metric.name,
            value: value,
          };
        });

        setChartData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [post_id]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Line Chart */}
      <LineChart
        width={400}
        height={500}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 80, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="name"
          tick={{ angle: -45, textAnchor: "end", fontSize: 10 }}
          interval={0}
        />
        <YAxis />
        <Tooltip />
      </LineChart>

      {/* Bar Chart */}
      <BarChart
        width={400}
        height={500}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 80, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="name"
          tick={{ angle: -45, textAnchor: "end", fontSize: 10 }}
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>

      {/* Pie Chart */}
      <PieChart width={400} height={500}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Charts;
