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
                fill: false,
                yAxisID: 'y',
            },
            {
                label: 'Dues',
                data: [0, 15000, 20000, 17000, 18000, 19000, 20000, 21000, 15000, 14000, 13000, 12000],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                yAxisID: 'y1',
            },
        ],
    };

  const options = {
    responsive: true,
    stacked: false,
    plugins: {
        legend: {
            display: false,
        },
    },
  };

  return (
    <div className='w-full h-56'>
        <div className='w-full h-full'>
            <Line data={data} options={options} />
        </div>
    </div>
  );
};

export default LineChart;
