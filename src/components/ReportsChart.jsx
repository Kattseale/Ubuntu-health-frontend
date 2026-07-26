import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";


import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function ReportsChart({ appointmentStatus }) {

    const data = {
        labels: Object.keys(appointmentStatus),
        datasets: [
            {
                data: Object.values(appointmentStatus)
            }
        ]
    };

    return (
        <Pie data={data} />
    );
}