import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMeetings } from "../api/api";

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const res = await getMeetings();
      setData(res.data.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
        <button className="p-3 bg-primary rounded-[5px]">
            <img alt="icon_left" src="/assets/icons/arrow_left.png" />
        </button>
        <div className="flex gap-1 flex-col">
        <h2 className="text-2xl font-semibold">Ruang Meeting</h2>
        <p className="text-[#868686]">Ruang Meeting</p>
        </div>

     
        </div>
        <button
          onClick={() => nav("/add")}
          className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
        >
          Pesan Ruangan
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-sm text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Ruang</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Waktu</th>
              <th className="p-3">Peserta</th>
              <th className="p-3">Konsumsi</th>
              <th className="p-3">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-4">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4">
                  Belum ada data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.unit}</td>
                  <td className="p-3">{item.ruang}</td>
                  <td className="p-3">
                    {new Date(item.tanggal).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {item.waktuMulai} - {item.waktuSelesai}
                  </td>
                  <td className="p-3">{item.jumlahPeserta}</td>
                  <td className="p-3">{item.jenisKonsumsi}</td>
                  <td className="p-3">
                    Rp {Number(item.nominalKonsumsi).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
