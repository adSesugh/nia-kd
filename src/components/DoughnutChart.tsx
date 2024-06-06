import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
    data: any,
    type: string
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, type }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 270,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    boxWidth: 15,
                    borderRadius: 2,
                    useBorderRadius: true,
                    usePointStyle: true,
                    padding: 20
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += type === 'revenue' ? `${'\u20a6'}${Intl.NumberFormat().format(context.parsed)}` : context.parsed;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className='flex justify-center py-2 h-52  items-center mt-4'>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
