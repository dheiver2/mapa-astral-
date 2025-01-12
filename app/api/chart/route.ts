import { NextResponse } from 'next/server';

// Constantes astronômicas (em graus por dia)
const PLANETARY_SPEEDS = {
  Sol: 0.985556, // Movimento médio do Sol
  Lua: 13.176389, // Movimento médio da Lua
  Mercúrio: 1.383333, // Movimento médio de Mercúrio
  Vênus: 1.2, // Movimento médio de Vênus
  Marte: 0.524167, // Movimento médio de Marte
  Júpiter: 0.083333, // Movimento médio de Júpiter
  Saturno: 0.033333 // Movimento médio de Saturno
};

const PLANETS = [
  { name: 'Sol', symbol: '☉', color: '#FFB300', basePosition: 0 },
  { name: 'Lua', symbol: '☽', color: '#90CAF9', basePosition: 45 },
  { name: 'Mercúrio', symbol: '☿', color: '#7E57C2', basePosition: 90 },
  { name: 'Vênus', symbol: '♀', color: '#EC407A', basePosition: 135 },
  { name: 'Marte', symbol: '♂', color: '#EF5350', basePosition: 180 },
  { name: 'Júpiter', symbol: '♃', color: '#5C6BC0', basePosition: 225 },
  { name: 'Saturno', symbol: '♄', color: '#455A64', basePosition: 270 }
];

const SIGNS = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer',
  'Leão', 'Virgem', 'Libra', 'Escorpião',
  'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

// Data de referência para cálculos (J2000.0)
const EPOCH = new Date('2000-01-01T12:00:00Z');

interface BirthData {
  birthDate: string;
  birthTime: string;
}

function validateDateTime(date: string, time: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return dateRegex.test(date) && timeRegex.test(time);
}

function calculatePlanetaryPositions(timestamp: number) {
  const daysSinceEpoch = (timestamp - EPOCH.getTime()) / (1000 * 60 * 60 * 24);

  return PLANETS.map(planet => {
    const speed = PLANETARY_SPEEDS[planet.name as keyof typeof PLANETARY_SPEEDS];
    const position = (planet.basePosition + (daysSinceEpoch * speed)) % 360;
    const normalizedPosition = position < 0 ? position + 360 : position;
    const signIndex = Math.floor(normalizedPosition / 30);

    return {
      name: planet.name,
      symbol: planet.symbol,
      position: Number(normalizedPosition.toFixed(2)),
      sign: SIGNS[signIndex],
      color: planet.color,
      degree: Number((normalizedPosition % 30).toFixed(2))
    };
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as BirthData;
    const { birthDate, birthTime } = body;
    
    // Validação aprimorada
    if (!birthDate || !birthTime) {
      return NextResponse.json(
        { error: 'Data e hora de nascimento são obrigatórios' },
        { status: 400 }
      );
    }

    if (!validateDateTime(birthDate, birthTime)) {
      return NextResponse.json(
        { error: 'Formato de data ou hora inválido. Use YYYY-MM-DD e HH:mm' },
        { status: 400 }
      );
    }

    const date = new Date(`${birthDate}T${birthTime}`);
    
    // Validação da data
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Data ou hora inválida' },
        { status: 400 }
      );
    }

    // Verificação de data futura
    if (date > new Date()) {
      return NextResponse.json(
        { error: 'Data não pode ser futura' },
        { status: 400 }
      );
    }

    const planets = calculatePlanetaryPositions(date.getTime());

    return NextResponse.json({
      birthChart: {
        timestamp: date.toISOString(),
        planets
      }
    });
    
  } catch (error) {
    console.error('Erro ao calcular mapa astral:', error);
    return NextResponse.json(
      { error: 'Erro interno ao calcular mapa astral' },
      { status: 500 }
    );
  }
}
