import React, { useContext, useEffect, useState } from "react";
import { ImportExportHubContext } from "../../../Contexts/importExportHubContext";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const DashboardHome = () => {
    const { user } = useContext(ImportExportHubContext);
    const [exports, setExports] = useState([]);
    const [imports, setImports] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(
                `https://import-export-hub-server-lake.vercel.app/exports?exporter_email=${user.email}`
            )
                .then((res) => res.json())
                .then((data) => setExports(data));
        }
    }, [user?.email]);

    useEffect(() => {
        if (user?.email) {
            fetch(
                `https://import-export-hub-server-lake.vercel.app/imports?email=${user.email}`
            )
                .then((res) => res.json())
                .then((data) => setImports(data))
                .catch((error) =>
                    console.log("got an error fetching imports", error)
                );
        }
    }, [user?.email]);

    // Chart data
    const importData = [
        { name: "Imports", value: imports.length },
        { name: "Remaining", value: 0 } // optional filler
    ];

    const exportData = [
        { name: "Exports", value: exports.length },
        { name: "Remaining", value: 0 }
    ];

    const COLORS = ["#1a237e", "#cfd8dc"];

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-indigo-900 mb-6">
                Dashboard Overview
            </h1>

            <div className="flex flex-wrap justify-center gap-12 w-full mb-10">
                {/* Imports Pie */}
                <div className="w-70 h-70">
                    <h2 className="text-lg font-semibold text-center mb-2">Imports</h2>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={importData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {importData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Exports Pie */}
                <div className="w-70 h-70">
                    <h2 className="text-lg font-semibold text-center ">Exports</h2>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={exportData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {exportData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
