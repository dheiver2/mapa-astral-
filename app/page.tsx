// app/components/PlanetInterpretation.tsx
'use client';

import React from 'react';
import { interpretPlanet } from '@/app/lib/interpretations';
import { Loader2 } from 'lucide-react';

interface Props {
  planet: string;
  sign: string;
  position: number;
}

export const PlanetInterpretation: React.FC<Props> = ({ planet, sign, position }) => {
  const [interpretation, setInterpretation] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadInterpretation = async () => {
      try {
        setLoading(true);
        const text = await interpretPlanet(planet, sign, position);
        setInterpretation(text);
      } catch (error) {
        console.error('Erro ao carregar interpretação:', error);
        setInterpretation('Não foi possível gerar a interpretação neste momento.');
      } finally {
        setLoading(false);
      }
    };

    loadInterpretation();
  }, [planet, sign, position]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-semibold text-lg text-purple-900">
          {planet} em {sign}
        </h3>
        <span className="text-sm text-gray-500">
          {position.toFixed(2)}°
        </span>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">
          {interpretation}
        </p>
      )}
    </div>
  );
};
