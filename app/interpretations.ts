// app/interpretations.ts
export const interpretPlanet = (planet: string, sign: string, position: number): string => {
  const interpretations: { [key: string]: { [key: string]: string } } = {
    Sun: {
      Aries: `O Sol em Áries indica uma personalidade energética, corajosa e assertiva. Você tende a ser um líder natural, com uma forte necessidade de independência e iniciativa.`,
      Taurus: `O Sol em Touro sugere uma personalidade estável, prática e determinada. Você valoriza segurança e conforto, e tem uma forte conexão com os prazeres sensoriais.`,
      Gemini: `O Sol em Gêmeos indica uma personalidade comunicativa, curiosa e versátil. Você tem uma mente ágil e adora aprender e compartilhar ideias.`,
      Cancer: `O Sol em Câncer sugere uma personalidade sensível, protetora e emocional. Você valoriza a família e o lar, e tem um forte instinto de cuidado.`,
      Leo: `O Sol em Leão indica uma personalidade carismática, criativa e confiante. Você adora ser o centro das atenções e tem um grande coração.`,
      Virgo: `O Sol em Virgo sugere uma personalidade analítica, prática e organizada. Você tem um forte senso de dever e busca a perfeição em tudo o que faz.`,
      Libra: `O Sol em Libra indica uma personalidade harmoniosa, diplomática e sociável. Você valoriza o equilíbrio e a justiça, e tem um forte senso de estética.`,
      Scorpio: `O Sol em Escorpião sugere uma personalidade intensa, determinada e misteriosa. Você tem uma grande força de vontade e uma profunda capacidade de transformação.`,
      Sagittarius: `O Sol em Sagitário indica uma personalidade otimista, aventureira e filosófica. Você adora explorar novos horizontes e busca a liberdade acima de tudo.`,
      Capricorn: `O Sol em Capricórnio sugere uma personalidade ambiciosa, disciplinada e responsável. Você valoriza o sucesso e a estabilidade, e tem uma grande capacidade de liderança.`,
      Aquarius: `O Sol em Aquário indica uma personalidade inovadora, humanitária e independente. Você adora quebrar regras e buscar novas formas de pensar.`,
      Pisces: `O Sol em Peixes sugere uma personalidade sensível, compassiva e artística. Você tem uma forte conexão com o mundo espiritual e emocional.`,
    },
    Moon: {
      Aries: `A Lua em Áries indica emoções intensas e impulsivas. Você reage rapidamente às situações e busca independência emocional.`,
      Taurus: `A Lua em Touro sugere uma natureza emocional estável e calma. Você busca segurança e conforto emocional, e valoriza relacionamentos estáveis.`,
      Gemini: `A Lua em Gêmeos indica uma mente emocionalmente curiosa e comunicativa. Você precisa de variedade e estímulo intelectual para se sentir emocionalmente satisfeito.`,
      Cancer: `A Lua em Câncer sugere uma natureza emocional profundamente sensível e protetora. Você se conecta fortemente com sua família e lar.`,
      Leo: `A Lua em Leão indica emoções calorosas e expressivas. Você busca reconhecimento e apreciação em seus relacionamentos.`,
      Virgo: `A Lua em Virgo sugere uma natureza emocional prática e analítica. Você se sente emocionalmente seguro quando tudo está em ordem.`,
      Libra: `A Lua em Libra indica uma necessidade emocional de harmonia e equilíbrio. Você valoriza relacionamentos justos e equilibrados.`,
      Scorpio: `A Lua em Escorpião sugere emoções intensas e profundas. Você tem uma forte intuição e busca conexões emocionais transformadoras.`,
      Sagittarius: `A Lua em Sagitário indica uma natureza emocional otimista e aventureira. Você busca liberdade e expansão emocional.`,
      Capricorn: `A Lua em Capricórnio sugere uma natureza emocional disciplinada e reservada. Você busca segurança emocional através de realizações práticas.`,
      Aquarius: `A Lua em Aquário indica uma natureza emocional independente e inovadora. Você valoriza a liberdade emocional e a conexão com ideais maiores.`,
      Pisces: `A Lua em Peixes sugere uma natureza emocional sensível e compassiva. Você tem uma forte conexão com o mundo espiritual e emocional.`,
    },
    // Adicione interpretações para todos os planetas
  };

  return interpretations[planet]?.[sign] || `Interpretação não disponível para ${planet} em ${sign}.`;
};
