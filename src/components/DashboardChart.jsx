import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

export default function DashboardChart({ appointments }) {

    const scheduled = appointments.filter(
        a => a.status === "Scheduled"
    ).length;

    const completed = appointments.filter(
        a => a.status === "Completed"
    ).length;

    const cancelled = appointments.filter(
        a => a.status === "Cancelled"
    ).length;

    const data = [
        { name: "Scheduled", value: scheduled },
        { name: "Completed", value: completed },
        { name: "Cancelled", value: cancelled }
    ];

    const COLORS = [
        "#0d6efd",
        "#198754",
        "#dc3545"
    ];

    return (

        <PieChart width={500} height={320}>

            <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
            >

                {data.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />

                ))}

            </Pie>

            <Tooltip />
            <Legend />

        </PieChart>

    );

}