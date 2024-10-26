import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchEarnings } from "@/redux/actions/earningAction";

const MetricsPage = () => {
    const dispatch = useDispatch();
    const earningsData = useSelector((state: RootState) => state.earnings);
    const userRole = useSelector((state: RootState) => state.user.user?.roleId);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        dispatch(fetchEarnings({ date: today }) as any);
    }, [dispatch]);

    if (userRole !== 1) {
        return <div>No tienes acceso a esta página.</div>;
    }

    return (
        <section className="flex flex-col items-center h-screen">
            <h1 className="text-2xl font-semibold mb-4">Metrics Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                    <h2 className="text-lg font-bold text-white ">Total Neto</h2>
                    <p className="text-4xl font-bold mt-2">${earningsData.totalRevenue}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                    <h2 className="text-lg font-bold">Costo Total</h2>
                    <p className="text-4xl font-bold mt-2">${earningsData.totalCost}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                    <h2 className="text-lg font-bold">Ganancias del dia</h2>
                    <p className="text-4xl font-bold mt-2 ">${earningsData.totalProfit}</p>
                </div>
            </div>
        </section>
    );
};

export default MetricsPage;
