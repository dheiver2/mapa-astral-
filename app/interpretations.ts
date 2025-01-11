// app/interpretations.ts
export const interpretPlanet = (planet: string, sign: string, position: number): string => {
  // Normaliza o nome do planeta e signo para lidar com variações
  const normalizePlanet = (p: string): string => {
    const normalized = p.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    const mappings: { [key: string]: string } = {
      'sol': 'Sol',
      'sun': 'Sol',
      'lua': 'Lua',
      'moon': 'Lua',
      'mercurio': 'Mercúrio',
      'mercury': 'Mercúrio',
      'venus': 'Vênus',
      'marte': 'Marte',
      'mars': 'Marte',
      'jupiter': 'Júpiter',
      'saturno': 'Saturno',
      'saturn': 'Saturno',
      'urano': 'Urano',
      'uranus': 'Urano',
      'netuno': 'Netuno',
      'neptune': 'Netuno',
      'plutao': 'Plutão',
      'pluto': 'Plutão'
    };
    
    return mappings[normalized] || p;
  };

  const normalizeSign = (s: string): string => {
    const normalized = s.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    const mappings: { [key: string]: string } = {
      'aries': 'Áries',
      'taurus': 'Touro',
      'gemini': 'Gêmeos',
      'gemeos': 'Gêmeos',
      'cancer': 'Câncer',
      'leo': 'Leão',
      'virgo': 'Virgem',
      'libra': 'Libra',
      'scorpio': 'Escorpião',
      'escorpiao': 'Escorpião',
      'sagittarius': 'Sagitário',
      'sagitario': 'Sagitário',
      'capricorn': 'Capricórnio',
      'capricornio': 'Capricórnio',
      'aquarius': 'Aquário',
      'aquario': 'Aquário',
      'pisces': 'Peixes'
    };
    
    return mappings[normalized] || s;
  };

  const normalizedPlanet = normalizePlanet(planet);
  const normalizedSign = normalizeSign(sign);

  const planetContexts: { [key: string]: { attribute: string, theme: string } } = {
    'Sol': {
      attribute: 'vitalidade e propósito',
      theme: 'essência do ser e expressão pessoal'
    },
    'Lua': {
      attribute: 'emoções e instintos',
      theme: 'mundo interior e necessidades emocionais'
    },
    'Mercúrio': {
      attribute: 'comunicação e raciocínio',
      theme: 'forma de pensar e expressar ideias'
    },
    'Vênus': {
      attribute: 'amor e valores',
      theme: 'relacionamentos e apreciação da beleza'
    },
    'Marte': {
      attribute: 'ação e energia',
      theme: 'impulso e forma de agir'
    },
    'Júpiter': {
      attribute: 'expansão e sabedoria',
      theme: 'crescimento e busca por significado'
    },
    'Saturno': {
      attribute: 'estrutura e responsabilidade',
      theme: 'limites e maturidade'
    },
    'Urano': {
      attribute: 'originalidade e mudança',
      theme: 'inovação e libertação'
    },
    'Netuno': {
      attribute: 'intuição e transcendência',
      theme: 'espiritualidade e dissolução'
    },
    'Plutão': {
      attribute: 'transformação e poder',
      theme: 'regeneração e profundidade'
    }
  };

  const signAttributes: { [key: string]: { quality: string, element: string, expression: string } } = {
    'Áries': {
      quality: 'iniciativa e coragem',
      element: 'Fogo',
      expression: 'dinâmica e assertiva'
    },
    'Touro': {
      quality: 'estabilidade e praticidade',
      element: 'Terra',
      expression: 'constante e sensorial'
    },
    'Gêmeos': {
      quality: 'versatilidade e adaptabilidade',
      element: 'Ar',
      expression: 'comunicativa e curiosa'
    },
    'Câncer': {
      quality: 'sensibilidade e proteção',
      element: 'Água',
      expression: 'emocional e nutridora'
    },
    'Leão': {
      quality: 'criatividade e autoexpressão',
      element: 'Fogo',
      expression: 'dramática e magnética'
    },
    'Virgem': {
      quality: 'análise e aperfeiçoamento',
      element: 'Terra',
      expression: 'metódica e prestativa'
    },
    'Libra': {
      quality: 'harmonia e equilíbrio',
      element: 'Ar',
      expression: 'diplomática e refinada'
    },
    'Escorpião': {
      quality: 'intensidade e profundidade',
      element: 'Água',
      expression: 'penetrante e transformadora'
    },
    'Sagitário': {
      quality: 'expansão e otimismo',
      element: 'Fogo',
      expression: 'aventureira e filosófica'
    },
    'Capricórnio': {
      quality: 'ambição e disciplina',
      element: 'Terra',
      expression: 'prudente e determinada'
    },
    'Aquário': {
      quality: 'inovação e originalidade',
      element: 'Ar',
      expression: 'progressista e humanitária'
    },
    'Peixes': {
      quality: 'compaixão e transcendência',
      element: 'Água',
      expression: 'intuitiva e receptiva'
    }
  };

  const planetInfo = planetContexts[normalizedPlanet];
  const signInfo = signAttributes[normalizedSign];

  if (!planetInfo || !signInfo) {
    return `Interpretação não disponível para ${planet} em ${sign}.`;
  }

  const house = Math.floor(position / 30) + 1;
  const decanato = Math.floor((position % 30) / 10) + 1;

  const decanateInterpretation = (() => {
    const qualities = {
      'Fogo': ['pioneiro', 'expressivo', 'inspirador'],
      'Terra': ['prático', 'estável', 'manifestador'],
      'Ar': ['mental', 'social', 'idealista'],
      'Água': ['emotivo', 'intuitivo', 'transcendente']
    };
    
    const quality = qualities[signInfo.element][decanato - 1];
    return `No ${decanato}º decanato, manifesta-se de forma mais ${quality}.`;
  })();

  const positionInterpretation = position < 15 
    ? 'expressando-se de maneira mais pessoal e direta'
    : 'manifestando-se de forma mais social e abrangente';

  return `${normalizedPlanet} em ${normalizedSign} (${position.toFixed(2)}°) indica uma expressão de ${planetInfo.attribute} que se manifesta através da ${signInfo.quality}. ` +
         `${decanateInterpretation} Esta combinação sugere que seu ${planetInfo.theme} se desenvolve de maneira ${signInfo.expression}, ${positionInterpretation}. ` +
         `A influência do elemento ${signInfo.element} traz uma qualidade ${signInfo.expression.toLowerCase()} para esta posição.`;
};
