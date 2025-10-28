import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

  useEffect(() => {
    const selectedRoom = ROOMS.find((r) => r.nama === form.ruang);
    setRoomCapacity(selectedRoom ? selectedRoom.kapasitas : "");
  }, [form.ruang]);

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
        tanggal: new Date(form.tanggal).toISOString(),
        kapasitas: roomCapacity,
        jenisKonsumsi: selectedConsumptions.join(","),
      });

      toast.success("Berhasil menyimpan data!");
      nav("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan data");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded space-y-6">
<div className="flex items-center gap-2">
        <Link to="/" className="p-3 bg-primary rounded-[5px]">
            <img alt="icon_left" src="/assets/icons/arrow_left.png" />
        </Link>
        <div className="flex gap-1 flex-col">
        <h2 className="text-2xl font-semibold">Ruang Meeting</h2>
        <p className="text-[#868686]">Ruang Meeting</p>
        </div>

     
        </div>
      {/* Informasi Ruang Meeting */}
      <h2 className="text-xl font-semibold">Informasi Ruang Meeting</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

        {/* Unit */}
        <div className="md:col-span-1">
          <label className="block mb-1 text-sm">Unit</label>
          <select
            className="w-full border border-[#EBEBEB] rounded p-2"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            <option value="">Pilih Unit</option>
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Ruangan */}
        <div className="md:col-span-1">
          <label className="block mb-1 text-sm">Ruang Meeting</label>
          <select
            className="w-full border border-[#EBEBEB] rounded p-2"
            value={form.ruang}
            onChange={(e) => setForm({ ...form, ruang: e.target.value })}
          >
            <option value="">Pilih Ruangan</option>
            {ROOMS.map((r) => (
              <option key={r.nama} value={r.nama}>{r.nama}</option>
            ))}
          </select>
        </div>

        {/* Kosong biar layout pas */}
        <div></div>

        {/* Kapasitas */}
        <div className="md:col-span-1">
          <label className="block mb-1 text-sm">Kapasitas Ruangan</label>
          <input
            disabled
            value={roomCapacity || ""}
            className="w-full border border-[#EBEBEB] rounded p-2 bg-gray-100"
          />
        </div>
      </form>

      {/* Informasi Rapat */}
      <h2 className="text-xl font-semibold">Informasi Rapat</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Rapat <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-[#EBEBEB] rounded p-2 pl-10"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            />
            <span className="absolute left-3 top-2 text-gray-400"><img src="/assets/icons/calendar.png" alt="calendar-icon" /></span>
          </div>
        </div>

        {/* Waktu Mulai */}
        <div>
          <label className="block text-sm mb-1">Waktu Mulai</label>
          <input type="time" className="w-full border border-[#EBEBEB] rounded p-2"
            value={form.waktuMulai}
            onChange={(e) => setForm({ ...form, waktuMulai: e.target.value })}
          />
        </div>

        {/* Waktu Selesai */}
        <div>
          <label className="block text-sm mb-1">Waktu Selesai</label>
          <input type="time" className="w-full border border-[#EBEBEB] rounded p-2"
            value={form.waktuSelesai}
            onChange={(e) => setForm({ ...form, waktuSelesai: e.target.value })}
          />
        </div>

        {/* Jumlah Peserta */}
        <div>
          <label className="block text-sm mb-1">Jumlah Peserta</label>
          <input type="number" min="1" className="w-full border border-[#EBEBEB] rounded p-2"
            value={form.jumlahPeserta}
            onChange={(e) => setForm({ ...form, jumlahPeserta: e.target.value })} />
        </div>

        {/* Jenis Konsumsi */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-2">Jenis Konsumsi</label>
          <div className="space-y-2">
            {CONSUMPTIONS.map((c) => (
              <label key={c.key} className="flex items-center gap-2">
                <input type="checkbox"
                  checked={selectedConsumptions.includes(c.key)}
                  onChange={() => toggleConsumption(c.key)}
                />
                {c.label} (Rp {c.nominal.toLocaleString()})
              </label>
            ))}
          </div>
        </div>

        {/* Nominal */}
        <div className="flex items-center gap-2 md:col-span-1">
          <span className="bg-primary text-white px-3 py-2 rounded">Rp</span>
          <input disabled className="w-full border border-[#EBEBEB] rounded p-2 bg-gray-100"
            value={form.nominalKonsumsi.toLocaleString()} />
        </div>

        {/* Actions */}
        <div className="md:col-span-3 flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => nav(-1)} className="px-4 py-2 border border-[#EBEBEB] rounded">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded">
            Simpan
          </button>
        </div>

      </form>
    </div>
  );
}
