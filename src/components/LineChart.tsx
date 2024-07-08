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

type LinePropType = {
    record: any
}

const LineChart: React.FC<LinePropType> = ({record}) => {
    console.log(record)
    const data = {
        labels: record?.months || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Dues',
                data: record?.dues,
                borderColor: '#4E2444',
                backgroundColor: '#4E2444',
                yAxisID: 'y',
            },
            {
                label: 'Events',
                data: record?.event,
                borderColor: '#F8C308',
                backgroundColor: '#F8C308',
                yAxisID: 'y',
            },
            {
                label: 'Revenue',
                data: record?.totalRevenue,
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
