'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, Clock, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Lista completa de capitais brasileiras e principais cidades
const BRAZILIAN_CITIES = [
  { name: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333 },
  { name: "Rio de Janeiro", state: "RJ", latitude: -22.9068, longitude: -43.1729 },
  { name: "Brasília", state: "DF", latitude: -15.7975, longitude: -47.8919 },
  { name: "Salvador", state: "BA", latitude: -12.9714, longitude: -38.5014 },
  { name: "Fortaleza", state: "CE", latitude: -3.7172, longitude: -38.5433 },
  { name: "Belo Horizonte", state: "MG", latitude: -19.9167, longitude: -43.9345 },
  { name: "Manaus", state: "AM", latitude: -3.1019, longitude: -60.0250 },
  { name: "Curitiba", state: "PR", latitude: -25.4284, longitude: -49.2733 },
  { name: "Recife", state: "PE", latitude: -8.0476, longitude: -34.8770 },
  { name: "Porto Alegre", state: "RS", latitude: -30.0346, longitude: -51.2177 },
  { name: "Belém", state: "PA", latitude: -1.4558, longitude: -48.4902 },
  { name: "Goiânia", state: "GO", latitude: -16.6869, longitude: -49.2648 },
  { name: "São Luís", state: "MA", latitude: -2.5391, longitude: -44.2829 },
  { name: "Maceió", state: "AL", latitude: -9.6498, longitude: -35.7089 },
  { name: "Campo Grande", state: "MS", latitude: -20.4697, longitude: -54.6201 },
  { name: "Teresina", state: "PI", latitude: -5.0892, longitude: -42.8016 },
  { name: "Natal", state: "RN", latitude: -5.7945, longitude: -35.2120 },
  { name: "Cuiabá", state: "MT", latitude: -15.6014, longitude: -56.0979 },
  { name: "João Pessoa", state: "PB", latitude: -7.1195, longitude: -34.8450 },
  { name: "Aracaju", state: "SE", latitude: -10.9472, longitude: -37.0731 },
  { name: "Florianópolis", state: "SC", latitude: -27.5945, longitude: -48.5477 },
  { name: "Porto Velho", state: "RO", latitude: -8.7619, longitude: -63.9039 },
  { name: "Macapá", state: "AP", latitude: 0.0356, longitude: -51.0705 },
  { name: "Rio Branco", state: "AC", latitude: -9.9754, longitude: -67.8249 },
  { name: "Vitória", state: "ES", latitude: -20.3222, longitude: -40.3381 },
  { name: "Boa Vista", state: "RR", latitude: 2.8235, longitude: -60.6758 },
  { name: "Palmas", state: "TO", latitude: -10.2491, longitude: -48.3243 }
].sort((a, b) => a.name.localeCompare(b.name));

interface BirthData {
  birthDate: string;
  birthTime: string;
  latitude: string;
  longitude: string;
  cityName?: string; // Adicionado para manter o nome da cidade
}

interface Planet {
  name: string;
  symbol: string;
  sign: string;
  position: number;
  degree: number;
  color: string;
}

interface ChartData {
  birthChart: {
    timestamp: string;
    planets: Planet[];
  };
}

const validateForm = (data: BirthData): string[] => {
  const errors: string[] = [];
  const today = new Date();
  const birthDate = new Date(data.birthDate);

  if (!data.birthDate) {
    errors.push('Data de nascimento é obrigatória');
  } else if (birthDate > today) {
    errors.push('Data de nascimento não pode ser futura');
  } else if (birthDate < new Date('1900-01-01')) {
    errors.push('Data de nascimento deve ser posterior a 01/01/1900');
  }

  if (!data.birthTime) {
    errors.push('Hora de nascimento é obrigatória');
  } else {
    const [hours, minutes] = data.birthTime.split(':');
    if (Number(hours) > 23 || Number(minutes) > 59) {
      errors.push('Hora de nascimento inválida');
    }
  }

  if (!data.cityName) {
    errors.push('Selecione uma cidade');
  }

  return errors;
};

export default function Home() {
  const [formData, setFormData] = useState<BirthData>({
    birthDate: '',
    birthTime: '',
    latitude: '',
    longitude: '',
    cityName: ''
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCityList, setShowCityList] = useState(false);

  const filteredCities = BRAZILIAN_CITIES.filter(city =>
    `${city.name}, ${city.state}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: keyof BirthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleCitySelect = (city: typeof BRAZILIAN_CITIES[0]) => {
    setFormData(prev => ({
      ...prev,
      cityName: `${city.name}, ${city.state}`,
      latitude: city.latitude.toString(),
      longitude: city.longitude.toString()
    }));
    setSearchTerm('');
    setShowCityList(false);
    setErrors([]);
  };

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
        body: JSON.stringify({
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          latitude: formData.latitude,
          longitude: formData.longitude
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao calcular mapa astral');
      }

      setChartData(data);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Erro ao calcular mapa astral']);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      birthDate: '',
      birthTime: '',
      latitude: '',
      longitude: '',
      cityName: ''
    });
    setSearchTerm('');
    setChartData(null);
    setErrors([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.city-select-container')) {
        setShowCityList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 mb-8 shadow-lg">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Mapa Astral</h1>
          <p className="text-center mt-2 text-gray-100">
            Descubra as posições planetárias no momento do seu nascimento
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <ul className="list-disc pl-4 text-red-600">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  min="1900-01-01"
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Calendar className="w-5 h-5 absolute left-2 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora de Nascimento
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => handleInputChange('birthTime', e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  step="60"
                />
                <Clock className="w-5 h-5 absolute left-2 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="city-select-container relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade de Nascimento
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowCityList(true);
                }}
                onFocus={() => setShowCityList(true)}
                placeholder={formData.cityName || "Buscar cidade..."}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 absolute left-2 top-2.5 text-gray-400" />
            </div>

            {showCityList && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                {filteredCities.length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">
                    Nenhuma cidade encontrada
                  </div>
                ) : (
                  <ul className="py-2">
                    {filteredCities.map((city) => (
                      <li
                        key={`${city.name}-${city.state}`}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2"
                      >
                        <span>{city.name}, {city.state}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading || errors.length > 0}
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
              {chartData.birthChart.planets.map((planet, index) => (
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
                  <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                    <p>{planet.name} em {planet.sign}</p>
                    <p className="mt-1">Posição: {planet.position.toFixed(2)}°</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
