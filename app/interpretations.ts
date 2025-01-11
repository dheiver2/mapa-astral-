export const interpretPlanet = (planet: string, sign: string): string => {
  const base = {
    strength: {
      Aries: 'força, coragem, liderança',
      Taurus: 'estabilidade, praticidade, sensorialidade',
      Gemini: 'comunicação, versatilidade, curiosidade',
      Cancer: 'emoção, proteção, intuição',
      Leo: 'criatividade, autoexpressão, nobreza',
      Virgo: 'análise, organização, perfeccionismo',
      Libra: 'harmonia, diplomacia, equilíbrio',
      Scorpio: 'intensidade, poder, transformação',
      Sagittarius: 'expansão, otimismo, liberdade',
      Capricorn: 'ambição, responsabilidade, estrutura',
      Aquarius: 'inovação, originalidade, humanidade',
      Pisces: 'sensibilidade, compaixão, espiritualidade'
    },
    context: {
      Sun: 'personalidade e essência',
      Moon: 'emoções e instintos',
      Mercury: 'mente e comunicação',
      Venus: 'amor e valores',
      Mars: 'ação e desejo',
      Jupiter: 'expansão e crescimento',
      Saturn: 'limites e responsabilidade',
      Uranus: 'mudança e originalidade',
      Neptune: 'imaginação e transcendência',
      Pluto: 'poder e transformação'
    }
  };

  const planetContext = base.context[planet];
  const signStrengths = base.strength[sign];

  if (!planetContext || !signStrengths) {
    return `Interpretação não disponível para ${planet} em ${sign}.`;
  }

  return `${planet} em ${sign} indica ${planetContext} marcados por ${signStrengths}. ` +
         `Esta posição traz características de ${signStrengths} para a área de ${planetContext}.`;
};
