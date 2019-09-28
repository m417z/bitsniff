import React, { Component } from 'react';
import './app.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const chartData = [
  {
    "name": "5 minutes",
    "tp": 0.09,
    "fp": 0
  },
  {
    "name": "10 minutes",
    "tp": 0.02,
    "fp": 0.02
  },
  {
    "name": "30 minutes",
    "tp": 0.14,
    "fp": 0
  },
  {
    "name": "1 hour",
    "tp": 0.28,
    "fp": 0
  },
  {
    "name": "2 hours",
    "tp": 0.7,
    "fp": 0
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LineChart
        width={1200 / 2}
        height={500 / 2}
        data={chartData}
        margin={{
          top: 5,
          //right: 30,
          //left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid stroke="#666" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#3a4750' }} />
        <Legend />
        <Line name="True positive" type="monotone" dataKey="tp" stroke="#f6c90e" />
        <Line name="False positive" type="monotone" dataKey="fp" stroke="#eeeeee" />
      </LineChart>
    );
  }
}
