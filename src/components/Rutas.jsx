import React, { useState } from "react";
import rutasData from "../data/rutas.json";

export default function SelectorRutas() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [buscado, setBuscado] = useState(false); // indica si el usuario hizo click en Buscar

  const origenes = [...new Set(rutasData.map(r => r.origen))];
  const destinos = [...new Set(rutasData.map(r => r.destino))];

  const handleBuscar = () => {
    const ruta = rutasData.find(
      r => r.origen === origen && r.destino === destino
    );
    setHorariosDisponibles(ruta ? ruta.horarios : []);
    setBuscado(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Buscar boletos</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">Origen</label>
          <select
            value={origen}
            onChange={e => setOrigen(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione origen</option>
            {origenes.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">Destino</label>
          <select
            value={destino}
            onChange={e => setDestino(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione destino</option>
            {destinos.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          Buscar horarios
        </button>
      </div>

      {/* Mostrar resultados solo después de hacer click en buscar */}
      {buscado && horariosDisponibles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {horariosDisponibles.map((h, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition bg-gradient-to-br from-white to-gray-50"
            >
              <p className="text-lg font-semibold mb-1">Hora: <span className="font-normal">{h.hora}</span></p>
              <p className="text-lg font-semibold mb-1">Servicio: <span className="font-normal">{h.tipo}</span></p>
              <p className="text-lg font-semibold">Precio: <span className="font-normal">${h.precio}</span></p>
            </div>
          ))}
        </div>
      )}

      {buscado && horariosDisponibles.length === 0 && (
        <p className="text-center text-red-600 font-semibold">No hay rutas disponibles para esta combinación.</p>
      )}
    </div>
  );
}
