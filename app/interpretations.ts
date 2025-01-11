import { pipeline } from '@xenova/transformers'; // Biblioteca para usar modelos de LLM

// Função para gerar interpretações usando um LLM público
export const interpretPlanet = async (
  planet: string,
  sign: string,
  position: number
): Promise<string> => {
  try {
    // Carregar um modelo de linguagem público (ex: GPT-2)
    const generator = await pipeline('text-generation', 'Xenova/gpt2');

    // Criar um prompt para o modelo
    const prompt = `Interpretação astrológica para ${planet} em ${sign} com posição ${position.toFixed(2)}°:`;

    // Gerar a interpretação usando o modelo
    const output = await generator(prompt, {
      max_length: 100, // Limite de caracteres para a resposta
      num_return_sequences: 1, // Número de respostas geradas
    });

    // Verificar a estrutura do output e acessar a propriedade correta
    if (Array.isArray(output) && output.length > 0) {
      const firstOutput = output[0];
      if (typeof firstOutput === 'object' && firstOutput.generated_text) {
        return firstOutput.generated_text;
      }
    }

    throw new Error('Falha ao gerar interpretação: estrutura do output inválida');
  } catch (error) {
    console.error('Erro ao gerar interpretação:', error);
    throw new Error('Erro ao gerar interpretação');
  }
};
