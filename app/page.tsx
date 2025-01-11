// app/page.tsx
'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

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
    color: string; // Melhoria 1: Adicionado cores para planetas
  }[];
}

// Melhoria 2: Mensagens de validação
const validateForm = (data: BirthData) => {
  const errors = [];
  if (!data.birthDate) errors.push('Data de nascimento é obrigatória');
  if (!data.birthTime) errors.push('Hora de nascimento é obrigatória');
  if (!data.latitude) errors.push('Latitude é obrigatória');
  if (!data.longitude) errors.push('Longitude é obrigatória');
  return errors;
};

export default function Home() {
  const [formData, setFormData] = useState<BirthData>({
    birthDate: '',
    birthTime: '',
    latitude: '',
    longitude: ''
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false); // Melhoria 3: Estado de loading
  const [errors, setErrors] = useState<string[]>([]); // Melhoria 4: Estado de erros

  const handleSubmit = async () => {
    // Melhoria 5: Validação antes de enviar
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('/api/chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao calcular mapa astral');
      }

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      setErrors(['Ocorreu um erro ao calcular o mapa astral']);
    } finally {
      setLoading(false);
    }
  };

  // Melhoria 6: Função de limpar formulário
  const handleClear = () => {
    setFormData({
      birthDate: '',
      birthTime: '',
      latitude: '',
      longitude: ''
    });
    setChartData(null);
    setErrors([]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Melhoria 7: Header melhorado */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 mb-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Mapa Astral</h1>
          <p className="text-center mt-2 text-gray-100">
            Descubra as posições planetárias no momento do seu nascimento
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        {/* Melhoria 8: Mensagens de erro melhoradas */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        
        <div className="grid gap-6">
          {/* Melhoria 9: Labels e organização melhorada dos campos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de Nascimento
            </label>
            <input
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              value={formData.latitude}
              onChange={(e) => setFormData({...formData, latitude: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: -23.5505"
              step="0.000001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              value={formData.longitude}
              onChange={(e) => setFormData({...formData, longitude: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: -46.6333"
              step="0.000001"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              Calcular Mapa Astral
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Melhoria 10: Card de resultados melhorado */}
        {chartData && (
          <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-900">
              Posições Planetárias
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {chartData.planets.map((planet, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl" style={{ color: planet.color }}>
                      {planet.symbol}
                    </span>
                    <h3 className="font-semibold text-gray-900">{planet.name}</h3>
                  </div>
                  <p className="text-gray-600">
                    {planet.sign} • {planet.position.toFixed(2)}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
