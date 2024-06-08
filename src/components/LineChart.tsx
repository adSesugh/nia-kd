// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [0, 150000, 200000, 170000, 180000, 190000, 200000, 210000, 150000, 140000, 130000, 120000],
                borderColor: 'rgba(75,192,192,1)',
                yAxisID: 'y',
            },
            {
                label: 'Dues',
                data: [0, 15000, 20000, 17000, 18000, 19000, 20000, 21000, 15000, 14000, 13000, 12000],
                borderColor: 'rgba(75,192,192,1)',
                yAxisID: 'y1',
            },
            {
                label: 'Events',
                data: [0, 150000, 2000000, 1700000, 1800000, 19000, 2000000, 21000, 150000, 14000, 13000, 1200000],
                borderColor: 'rgba(75,192,192,1)',
                yAxisID: 'y2',
            },
        ],
    };

  const options = {
    responsive: true,
    stacked: false,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
          type: 'linear' as const,
          display: false,
          position: 'left' as const,
        },
        y1: {
          type: 'linear' as const,
          display: false,
          position: 'right' as const,
        },
        y2: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
