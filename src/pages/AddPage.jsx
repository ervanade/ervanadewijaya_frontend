import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../api/api";

const ROOMS = [
  { nama: "Ruang Rapat A", kapasitas: 20 },
  { nama: "Ruang Rapat B", kapasitas: 15 },
  { nama: "Ruang Rapat C", kapasitas: 10 },
];

const CONSUMPTIONS = [
  { key: "snack_pagi", label: "Snack Pagi", nominal: 15000 },
  { key: "makan_siang", label: "Makan Siang", nominal: 30000 },
  { key: "makan_sore", label: "Makan Sore", nominal: 25000 },
];

const UNITS = [
  "Unit SDM",
  "Unit Keuangan",
  "Unit IT",
  "Unit Umum",
  "Unit Perencanaan",
];

export default function AddMeeting() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    unit: "",
    ruang: "",
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    jumlahPeserta: "",
    jenisKonsumsi: "",
    nominalKonsumsi: 0,
  });

  const [roomCapacity, setRoomCapacity] = useState(null);
  const [selectedConsumptions, setSelectedConsumptions] = useState([]);

  // Update kapasitas saat memilih ruang
  useEffect(() => {
    const selectedRoom = ROOMS.find((r) => r.nama === form.ruang);
    setRoomCapacity(selectedRoom ? selectedRoom.kapasitas : "");
  }, [form.ruang]);

  // Hitung nominal konsumsi otomatis
  useEffect(() => {
    const total = selectedConsumptions.reduce((sum, key) => {
      const item = CONSUMPTIONS.find((c) => c.key === key);
      return sum + (item ? item.nominal : 0);
    }, 0);
    setForm((prev) => ({ ...prev, nominalKonsumsi: total }));
  }, [selectedConsumptions]);

  const toggleConsumption = (key) => {
    setSelectedConsumptions((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMeeting({
        ...form,
        kapasitas: roomCapacity,
        jenisKonsumsi: selectedConsumptions.join(","),
      });
      alert("Berhasil Menyimpan Data!");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan data");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Tambah Booking Meeting</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <select
            className="w-full border rounded p-2"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            <option value="">Pilih Unit</option>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Pilihan Ruangan
          </label>
          <select
            className="w-full border rounded p-2"
            value={form.ruang}
            onChange={(e) => setForm({ ...form, ruang: e.target.value })}
          >
            <option value="">Pilih Ruangan</option>
            {ROOMS.map((r) => (
              <option key={r.nama} value={r.nama}>
                {r.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kapasitas</label>
          <input
            className="w-full border rounded p-2 bg-gray-100"
            disabled
            value={roomCapacity || ""}
          />
        </div>

        <div></div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Rapat
          </label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <input
            type="time"
            className="w-full border rounded p-2"
            value={form.waktuMulai}
            onChange={(e) => setForm({ ...form, waktuMulai: e.target.value })}
          />
          <input
            type="time"
            className="w-full border rounded p-2"
            value={form.waktuSelesai}
            onChange={(e) => setForm({ ...form, waktuSelesai: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Jumlah Peserta
          </label>
          <input
            type="number"
            min="1"
            className="w-full border rounded p-2"
            value={form.jumlahPeserta}
            onChange={(e) =>
              setForm({ ...form, jumlahPeserta: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Jenis Konsumsi
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CONSUMPTIONS.map((c) => (
              <label key={c.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedConsumptions.includes(c.key)}
                  onChange={() => toggleConsumption(c.key)}
                />
                {c.label} (Rp {c.nominal.toLocaleString()})
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Konsumsi
          </label>
          <input
            className="w-full border rounded p-2 bg-gray-100"
            disabled
            value={form.nominalKonsumsi}
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded bg-primary"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
