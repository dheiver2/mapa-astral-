// app/interpretations.ts
export const interpretPlanet = (planet: string, sign: string, position: number): string => {
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

  // Determinar o decanato (cada signo é dividido em três partes de 10 graus)
  const decanato = Math.floor((position % 30) / 10) + 1;
  
  const planetContext = base.context[planet];
  const signStrengths = base.strength[sign];

  if (!planetContext || !signStrengths) {
    return `Interpretação não disponível para ${planet} em ${sign}.`;
  }

  const decanateInterpretation = (() => {
    switch (decanato) {
      case 1:
        return 'Esta posição no primeiro decanato enfatiza as qualidades mais puras e diretas do signo.';
      case 2:
        return 'No segundo decanato, há uma expressão mais emocional e profunda destas características.';
      case 3:
        return 'O terceiro decanato traz uma expressão mais madura e experimentada destas qualidades.';
    }
  })();

  return `${planet} em ${sign} a ${position.toFixed(2)}° indica ${planetContext} marcados por ${signStrengths}. ` +
         `${decanateInterpretation} Esta posição traz características de ${signStrengths} para a área de ${planetContext}, ` +
         `manifestando-se de forma ${position < 15 ? 'mais individual e pessoal' : 'mais coletiva e universal'}.`;
};
