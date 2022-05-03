import * as React from "react";
import moment from "moment";
import { useDataContext } from '../context/dataContext';
import { dummyData } from '../Data/dummyData';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


interface Invocation {
  day: number;
  function: number

}

interface InvoProps {
  invocations: Invocation[];
}

const BarFuncGraph: React.FC<InvoProps> = ({ invocations }) => {
  const arr: Array<object> = [];

  return (
    <>
      <h1 className="flex items-center justify-center">
        Invocations over time
      </h1>
      <div className="chart" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            // @ts-ignore
            data={dummyData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(14 165 233)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="#fff" stopOpacity={0.3} />
              </linearGradient> */}
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis dataKey="" />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              dataKey="AccumulusFunc1"
              fill="blue"
            />
            <Bar
              type="monotone"
              dataKey="AccumulusFunc2"
             
              fill="red"
            />
            <Bar
              type="monotone"
              dataKey="AccumulusFunc3"
              fill="green"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarFuncGraph;