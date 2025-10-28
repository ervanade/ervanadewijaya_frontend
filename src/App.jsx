import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ListPage from './pages/ListPage'
import AddPage from './pages/AddPage'
import { Toaster } from "react-hot-toast";


export default function App(){
return (
  <>
        <Toaster position="top-right" />

<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<ListPage />} />
<Route path="add" element={<AddPage />} />
</Route>
</Routes>
</>
)
}