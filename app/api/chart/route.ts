// app/api/chart/route.ts
import { NextResponse } from 'next/server';

const PLANETS = [
  { name: 'Sol', symbol: '☉' },
  { name: 'Lua', symbol: '☽' },
  { name: 'Mercúrio', symbol: '☿' },
  { name: 'Vênus', symbol: '♀' },
  { name: 'Marte', symbol: '♂' },
  { name: 'Júpiter', symbol: '♃' },
  { name: 'Saturno', symbol: '♄' }
];

const SIGNS = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer',
  'Leão', 'Virgem', 'Libra', 'Escorpião',
  'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { birthDate, birthTime } = body;
    
    // Cálculo simplificado para demonstração
    const date = new Date(`${birthDate}T${birthTime}`);
    const timestamp = date.getTime();
    
    const planets = PLANETS.map((planet, index) => {
      // Cada planeta tem uma velocidade diferente para demonstração
      const speed = (12 - index) * 30;
      const position = (timestamp / (1000 * 60 * 60 * 24) * speed) % 360;
      
      return {
        name: planet.name,
        symbol: planet.symbol,
        position,
        sign: SIGNS[Math.floor(position / 30)]
      };
    });

    return NextResponse.json({ planets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao calcular mapa astral' },
      { status: 500 }
    );
  }
}
