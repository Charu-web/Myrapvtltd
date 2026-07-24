import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { insightChartData } from "../data/marketingData";

const barColors = [
  "#F5C878",
  "#F0B15A",
  "#EC9A45",
  "#E8622C",
  "#D94A26",
  "#C0341F",
  "#A82318",
];

export default function InsightChart() {
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={insightChartData} barCategoryGap="28%">
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #EDEDED",
              fontSize: 12,
            }}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {insightChartData.map((entry, index) => (
              <Cell key={entry.label} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
