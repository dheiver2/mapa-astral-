// types/locations.ts
export interface City {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface State {
  name: string;
  abbreviation: string;
  cities: City[];
}

export const BRAZILIAN_STATES: State[] = [
  {
    name: "São Paulo",
    abbreviation: "SP",
    cities: [
      { name: "São Paulo", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo" },
      { name: "Campinas", latitude: -22.9071, longitude: -47.0632, timezone: "America/Sao_Paulo" },
      { name: "Santos", latitude: -23.9618, longitude: -46.3322, timezone: "America/Sao_Paulo" },
      { name: "Ribeirão Preto", latitude: -21.1775, longitude: -47.8103, timezone: "America/Sao_Paulo" }
    ]
  },
  {
    name: "Rio de Janeiro",
    abbreviation: "RJ",
    cities: [
      { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, timezone: "America/Sao_Paulo" },
      { name: "Niterói", latitude: -22.8832, longitude: -43.1033, timezone: "America/Sao_Paulo" },
      { name: "São Gonçalo", latitude: -22.8268, longitude: -43.0634, timezone: "America/Sao_Paulo" }
    ]
  },
  {
    name: "Minas Gerais",
    abbreviation: "MG",
    cities: [
      { name: "Belo Horizonte", latitude: -19.9167, longitude: -43.9345, timezone: "America/Sao_Paulo" },
      { name: "Uberlândia", latitude: -18.9113, longitude: -48.2622, timezone: "America/Sao_Paulo" },
      { name: "Juiz de Fora", latitude: -21.7642, longitude: -43.3496, timezone: "America/Sao_Paulo" }
    ]
  }
  // Adicione mais estados conforme necessário
];

export function findCity(state: string, cityName: string): City | undefined {
  const selectedState = BRAZILIAN_STATES.find(s => s.abbreviation === state);
  if (!selectedState) return undefined;
  
  return selectedState.cities.find(
    city => city.name.toLowerCase() === cityName.toLowerCase()
  );
}

export function getCitiesByState(state: string): City[] {
  const selectedState = BRAZILIAN_STATES.find(s => s.abbreviation === state);
  return selectedState ? selectedState.cities : [];
}
