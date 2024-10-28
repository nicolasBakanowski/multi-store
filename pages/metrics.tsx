import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchEarnings } from "@/redux/actions/earningAction";
import { fetchTopSelling } from "@/redux/actions/productAction"

const MetricsPage = () => {
    const dispatch = useDispatch();
    const earningsData = useSelector((state: RootState) => state.earnings);
    const userRole = useSelector((state: RootState) => state.user.user?.roleId);
    const topSelling = useSelector((state: RootState) => state.product.topSellingProducts)
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        dispatch(fetchEarnings({ date: today }) as any);
        dispatch(fetchTopSelling() as any);

    }, [dispatch]);

    if (userRole !== 1) {
        return <div>No tienes acceso a esta página.</div>;
    }
    return (
        <>
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
                {/* Tabla de productos más vendidos */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-8 w-full max-w-6xl">
                    <h2 className="text-lg font-bold mb-4">Top 10 Productos Más Vendidos</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Posición</th>
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Cantidad Vendida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSelling.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2">{product.totalSold}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section></>
    );
};

export default MetricsPage;
