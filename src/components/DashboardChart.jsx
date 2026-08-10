import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


export default function DashboardChart({
                                           appointments
                                       }) {

    // =====================================================
    // NORMALIZE STATUS
    // =====================================================

    const normalizeStatus = (status) => {

        if (!status) {
            return "PENDING";
        }

        const value =
            status
                .toString()
                .trim()
                .toUpperCase();


        if (value === "SCHEDULED") {
            return "CONFIRMED";
        }


        if (
            value === "CANCELLED" ||
            value === "CANCELED"
        ) {
            return "CANCELLED";
        }


        if (value === "COMPLETED") {
            return "COMPLETED";
        }


        if (value === "CONFIRMED") {
            return "CONFIRMED";
        }


        return value;

    };


    // =====================================================
    // COUNT
    // =====================================================

    const confirmed =
        appointments.filter(
            a =>
                normalizeStatus(
                    a.status
                ) === "CONFIRMED"
        ).length;


    const completed =
        appointments.filter(
            a =>
                normalizeStatus(
                    a.status
                ) === "COMPLETED"
        ).length;


    const cancelled =
        appointments.filter(
            a =>
                normalizeStatus(
                    a.status
                ) === "CANCELLED"
        ).length;


    const data = [

        {
            name: "Confirmed",
            value: confirmed
        },

        {
            name: "Completed",
            value: completed
        },

        {
            name: "Cancelled",
            value: cancelled
        }

    ];


    const COLORS = [
        "#0d6efd",
        "#198754",
        "#dc3545"
    ];


    return (

        <div
            style={{
                width: "100%",
                height: "350px"
            }}
        >

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                    >

                        {data.map(
                            (entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[index]
                                    }
                                />

                            )
                        )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}