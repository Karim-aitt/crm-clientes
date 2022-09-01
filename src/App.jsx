import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Layout from "./layout/Layout"
import Inicio from "./paginas/Inicio"
import EditarCliente from "./paginas/EditarCliente"
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'

import './index.css'

function App() {

  return (
    <BrowserRouter>
        <Routes>

          {/* Grupo de rutas */}
            <Route path="/clientes" element={<Layout />}>
              {/* Ruta singular */}
              <Route index element={<Inicio />} />
              <Route path="nuevo" element={<NuevoCliente />} />
              <Route path="editar/:id" element={<EditarCliente />} />
              <Route path=":id" element={<VerCliente />} />

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
