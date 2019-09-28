import React, { Component } from 'react';
import './index.css';
import {
  ComposedChart, Brush, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
/*
const mockData = {
  "traffic": [3419, 4295, 5964, 1348, 4880, 1367, 4994, 7967, 3071, 1020, 2609, 809, 410, 2048, 3987, 2182, 1346, 773, 1503, 1776, 1064, 5776, 784, 537, 7308, 6966, 2120, 19545, 35984, 38393, 18442, 5071, 9183, 6323, 1450, 3942, 2896, 702, 13807, 6169, 2117, 2087, 781, 482, 482, 11857, 1202, 6553, 5161, 2938, 1776, 34905, 14531, 2078, 2002, 3309, 2925, 4376, 1541, 8169, 1803, 1060, 3298, 4497, 4195, 3076, 1976, 3929, 4755, 1203, 3407, 3071, 518, 6724, 1299, 1598, 8139, 3459, 4138, 2201, 1952, 1340, 1515, 1409, 8426, 1338, 532, 5450, 1350, 2748, 327, 4015, 2548, 1156, 5394, 508, 7145, 2362, 2520, 99698, 2991, 61, 3533, 2193, 1542, 14943, 6178, 1957, 15891, 1903, 9993, 1922, 4759, 17121, 9183, 11557, 1932, 133, 1239, 11487, 3724, 2929, 3578, 1065, 7082, 14944, 2883, 12667, 1349, 2307, 10205, 1346, 7241, 2553, 1737, 3517, 4103, 5176, 5518, 22841, 3809, 1967, 3863, 11962, 14829, 11564, 5763, 19201, 5328, 5233, 15725, 1813, 12313, 4028, 5817, 3351, 2538, 2769, 10047, 3456, 27807, 2893, 2907, 3156, 2167, 2825, 2290, 3912, 2982, 3648, 842, 17890, 8846, 16192, 19655, 5268, 9904, 2624, 5817, 1239, 3732, 11560, 7098, 8459, 5188, 10633, 356, 31521, 9801, 3068, 4963, 5756, 5627, 7907, 582, 1347, 2674, 6339, 1863, 7040, 2809, 4831, 4352, 1191, 482, 241, 14603, 3358, 338, 5188, 3025, 5218, 2847, 2138, 3738, 3241, 385, 6987, 3858, 4922, 6237, 7431, 4842, 5941, 12888, 97, 9874, 1623, 6707, 5197, 471, 3710, 35691, 19793, 8412, 4653, 3430, 4901, 1725, 7058, 1203, 5990, 2177, 1764, 2259, 507, 797, 4790, 4309, 3402, 14761, 16724, 3654, 2885, 1362, 2043, 2909, 704, 1379],
  "blocks": [2000, 1000, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "result": 2.1
};
*/
export default class AnalysisChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const threshold = 100;

    const traffic = largestTriangleThreeBuckets(this.props.data.traffic, threshold);
    const trafficMax = Math.max(...traffic);

    const blocks = largestTriangleThreeBuckets(this.props.data.blocks.map(x => Math.max(x, 0)), threshold);
    const blocksMax = Math.max(...blocks);
    const blocksNormalized = blocks.map(x => Number((x * trafficMax / blocksMax).toFixed(2)));

    let chartData = [];
    for (let i = 0; i < traffic.length; i++) {
      chartData.push({
        traffic: traffic[i],
        blocks: blocksNormalized[i] >= 0 ? blocksNormalized[i] : null
      });
    }

    return (
      <ComposedChart
        width={1200}
        height={500}
        data={chartData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid stroke="#666" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#3a4750' }} />
        <Legend />
        <Brush dataKey="name" height={30} stroke="#4c5d69">
          <ComposedChart data={chartData}>
            <Area connectNulls name="Expected activity" type="monotone" dataKey="blocks" fill="#f6c90e" stroke="#f6c90e" />
            <Bar name="Network activity" dataKey="traffic" barSize={20} fill="#3a4750" />
          </ComposedChart>
        </Brush>
        <Area connectNulls name="Expected activity" type="monotone" dataKey="blocks" fill="#f6c90e" stroke="#f6c90e" />
        <Bar name="Network activity" dataKey="traffic" barSize={20} fill="#eeeeee" fillOpacity="0.8" />
      </ComposedChart>
    );
  }
}

function largestTriangleThreeBuckets(data, threshold) {

  var data_length = data.length;
  if (threshold >= data_length || threshold === 0) {
    return data; // Nothing to do
  }

  var sampled = [],
    sampled_index = 0;

  // Bucket size. Leave room for start and end data points
  var every = (data_length - 2) / (threshold - 2);

  var a = 0,  // Initially a is the first point in the triangle
    max_area_point,
    max_area,
    area,
    next_a;

  sampled[sampled_index++] = data[a]; // Always add the first point

  for (var i = 0; i < threshold - 2; i++) {

    // Calculate point average for next bucket (containing c)
    var avg_x = 0,
      avg_y = 0,
      avg_range_start = Math.floor((i + 1) * every) + 1,
      avg_range_end = Math.floor((i + 2) * every) + 1;
    avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

    var avg_range_length = avg_range_end - avg_range_start;

    for (; avg_range_start < avg_range_end; avg_range_start++) {
      avg_x += avg_range_start;
      avg_y += data[avg_range_start] * 1; // * 1 enforces Number (value may be Date)
    }
    avg_x /= avg_range_length;
    avg_y /= avg_range_length;

    // Get the range for this bucket
    var range_offs = Math.floor((i + 0) * every) + 1,
      range_to = Math.floor((i + 1) * every) + 1;

    // Point a
    var point_a_x = a,
      point_a_y = data[a] * 1; // enforce Number (value may be Date)

    max_area = area = -1;

    for (; range_offs < range_to; range_offs++) {
      // Calculate triangle area over three buckets
      area = Math.abs((point_a_x - avg_x) * (data[range_offs] - point_a_y) -
        (point_a_x - range_offs) * (avg_y - point_a_y)
      ) * 0.5;
      if (area > max_area) {
        max_area = area;
        max_area_point = data[range_offs];
        next_a = range_offs; // Next a is this b
      }
    }

    sampled[sampled_index++] = max_area_point; // Pick this point from the bucket
    a = next_a; // This a is the next a (chosen b)
  }

  sampled[sampled_index++] = data[data_length - 1]; // Always add last

  return sampled;
}
