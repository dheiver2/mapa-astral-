// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin } from 'lucide-react';

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
    color: string;
  }[];
}

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string>('');

  // Função para obter localização
  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocalização não é suportada pelo seu navegador');
      return;
    }

    setGeoLoading(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        setGeoLoading(false);
      },
      (error) => {
        let errorMessage = 'Erro ao obter localização';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão para geolocalização negada';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Localização indisponível';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo esgotado ao obter localização';
            break;
        }
        setGeoError(errorMessage);
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // Tentar obter localização automaticamente ao montar o componente
  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = async () => {
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
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 mb-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Mapa Astral</h1>
          <p className="text-center mt-2 text-gray-100">
            Descubra as posições planetárias no momento do seu nascimento
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        
        <div className="grid gap-6">
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: -23.5505"
                  step="0.000001"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: -46.6333"
                  step="0.000001"
                />
              </div>
            </div>
          </div>

          {/* Botão de Geolocalização */}
          <button
            onClick={getLocation}
            disabled={geoLoading}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-purple-500 text-purple-600 rounded hover:bg-purple-50 transition-colors"
          >
            {geoLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
            {geoLoading ? 'Obtendo localização...' : 'Usar localização atual'}
          </button>

          {/* Mensagem de erro da geolocalização */}
          {geoError && (
            <p className="text-sm text-red-600">{geoError}</p>
          )}

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
