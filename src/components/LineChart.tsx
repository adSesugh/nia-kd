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
                label: 'Dues',
                data: [0, 15000, 20000, 17000, 18000, 19000, 20000, 21000, 15000, 14000, 13000, 120000],
                borderColor: '#4E2444',
                backgroundColor: '#4E2444',
                yAxisID: 'y',
            },
            {
                label: 'Events',
                data: [0, 150000, 2000000, 1700000, 1800000, 19000, 2000000, 21000, 150000, 14000, 13000, 1200000],
                borderColor: '#F8C308',
                backgroundColor: '#F8C308',
                yAxisID: 'y',
            },
            {
                label: 'Revenue',
                data: [0, 150000, 200000, 170000, 180000, 190000, 200000, 210000, 150000, 140000, 130000, 120000],
                borderColor: '#25A248',
                backgroundColor: '#25A248',
                yAxisID: 'y',
            }
        ],
    };

    const options = {
        responsive: true,
        stacked: false,
        maintainAspectRatio: false,
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
                beginAtZero: true,
            }
        },
    };

    return (
        <div className='w-full h-56'>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
