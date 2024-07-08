// LineChart.js
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
import { getRandomColor } from '@/lib/common';

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
    record: any,
    type?: string
}

const LineChart: React.FC<LinePropType> = ({record, type}) => {
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

    if(type === 'yearly'){
        const labels = type === 'yearly' && Object?.keys(record) || [];
        const barData = {
            labels: labels,
            datasets: [{
                label: `Annual Revenue for ${Object?.keys(record)[0]} - ${Object?.keys(record)[Object?.keys(record).length - 1]}`,
                data: Object?.values(record),
                backgroundColor: Array.from({ length:  Number(Object?.values(record).length)}, () => getRandomColor()),
                borderWidth: 1
            }]
        }

        return (
            <div className='w-full h-56'>
                <Bar data={barData} />
            </div>
        )
    }

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
