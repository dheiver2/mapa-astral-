// app/api/chart/route.ts
import { NextResponse } from 'next/server';

const PLANETS = [
  { name: 'Sol', symbol: '☉', color: '#FFB300' },
  { name: 'Lua', symbol: '☽', color: '#90CAF9' },
  { name: 'Mercúrio', symbol: '☿', color: '#7E57C2' },
  { name: 'Vênus', symbol: '♀', color: '#EC407A' },
  { name: 'Marte', symbol: '♂', color: '#EF5350' },
  { name: 'Júpiter', symbol: '♃', color: '#5C6BC0' },
  { name: 'Saturno', symbol: '♄', color: '#455A64' }
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
    
    // Validação
    if (!birthDate || !birthTime) {
      return NextResponse.json(
        { error: 'Data e hora são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Cálculo simplificado para demonstração
    const date = new Date(`${birthDate}T${birthTime}`);
    const timestamp = date.getTime();
    
    const planets = PLANETS.map((planet, index) => {
      const speed = (12 - index) * 30;
      const position = (timestamp / (1000 * 60 * 60 * 24) * speed) % 360;
      
      return {
        name: planet.name,
        symbol: planet.symbol,
        position,
        sign: SIGNS[Math.floor(position / 30)],
        color: planet.color
      };
    });

    return NextResponse.json({ planets });
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao calcular mapa astral' },
      { status: 500 }
    );
  }
}
