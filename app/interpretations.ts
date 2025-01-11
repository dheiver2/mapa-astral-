// app/lib/interpretations.ts
import { pipeline } from '@xenova/transformers';

interface GeneratedOutput {
  generated_text: string;
}

export const interpretPlanet = async (
  planet: string,
  sign: string,
  position: number
): Promise<string> => {
  try {
    // Carregar o modelo
    const generator = await pipeline('text-generation', 'Xenova/gpt2');

    // Criar um prompt mais estruturado
    const prompt = `
      Planeta: ${planet}
      Signo: ${sign}
      Posição: ${position.toFixed(2)}°
      Interpretação astrológica:
    `;

    // Gerar a interpretação com tipos corretos
    const output = await generator(prompt, {
      max_length: 100,
      num_return_sequences: 1,
    }) as GeneratedOutput[];

    // Verificar e processar o output
    if (!output?.length) {
      throw new Error('Nenhuma interpretação gerada');
    }

    // Processar o texto gerado
    const generatedText = output[0].generated_text;
    const cleanedText = generatedText
      .replace(prompt, '') // Remove o prompt da resposta
      .trim()
      .replace(/\n+/g, ' ') // Remove quebras de linha extras
      .replace(/\s+/g, ' '); // Remove espaços extras

    // Retornar uma interpretação padrão caso o texto gerado seja muito curto
    if (cleanedText.length < 20) {
      return getDefaultInterpretation(planet, sign);
    }

    return cleanedText;
  } catch (error) {
    console.error('Erro ao gerar interpretação:', error);
    // Fallback para interpretação padrão em caso de erro
    return getDefaultInterpretation(planet, sign);
  }
};

// Função para fornecer interpretações padrão como fallback
function getDefaultInterpretation(planet: string, sign: string): string {
  const interpretations: Record<string, Record<string, string>> = {
    Sol: {
      'Áries': 'Forte senso de identidade e liderança natural.',
      'Touro': 'Personalidade estável e determinada.',
      'Gêmeos': 'Natureza comunicativa e versátil.',
      // Adicione outros signos...
    },
    Lua: {
      'Áries': 'Emoções intensas e reações rápidas.',
      'Touro': 'Necessidade emocional de segurança e conforto.',
      'Gêmeos': 'Emoções mutáveis e necessidade de comunicação.',
      // Adicione outros signos...
    },
    // Adicione outros planetas...
  };

  return interpretations[planet]?.[sign] || 
    `${planet} em ${sign} indica uma interessante combinação de energias que influencia sua vida.`;
}

// Interface para uso no componente
export interface Interpretation {
  planet: string;
  sign: string;
  position: number;
  text: string;
}
