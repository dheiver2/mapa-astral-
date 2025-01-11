// app/page.tsx
'use client';

import React, { useState } from 'react';

interface BirthData {
  birthDate: string;
  birthTime: string;
  latitude: string;
  longitude: string;
}

interface ChartData {
  planets: {
    name: string;
    symbol: string;
    sign: string;
    position: number;
  }[];
}

export default function Home() {
  const [formData, setFormData] = useState<BirthData>({
    birthDate: '',
    birthTime: '',
    latitude: '',
    longitude: ''
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Mapa Astral</h1>
        
        <div className="space-y-4">
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Data de Nascimento"
          />
          
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Hora de Nascimento"
          />
          
          <input
            type="number"
            value={formData.latitude}
            onChange={(e) => setFormData({...formData, latitude: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Latitude"
            step="0.000001"
          />
          
          <input
            type="number"
            value={formData.longitude}
            onChange={(e) => setFormData({...formData, longitude: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Longitude"
            step="0.000001"
          />
          
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Calcular Mapa Astral
          </button>
        </div>

        {chartData && (
          <div className="border rounded p-4">
            <h2 className="font-bold mb-4">Posições Planetárias:</h2>
            {chartData.planets.map((planet, index) => (
              <div key={index} className="mb-2">
                <p>
                  {planet.name} {planet.symbol} em {planet.sign} ({planet.position.toFixed(2)}°)
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
