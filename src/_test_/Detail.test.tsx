import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Iplanet } from '../services/planet/planet.module';
import Detail from '../components/planet/detail';


// Mock the Films component
vi.mock('../components/films', () => ({
  __esModule: true,
  default: ({ item }: { item: Iplanet }) => (
    <div data-testid="films">{item.films.length} films</div>
  ),
}));

describe('Detail Component', () => {
  const mockPlanet: Iplanet = {
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
    residents: [
      "https://swapi.dev/api/people/5/",
      "https://swapi.dev/api/people/68/",
      "https://swapi.dev/api/people/81/"
    ],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/6/"
    ],
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
    url: "https://swapi.dev/api/planets/2/"
  };

  it('renders planet details correctly', () => {
    render(<Detail planet={mockPlanet} />);

    // Check planet name
    expect(screen.getByText(mockPlanet.name)).toBeInTheDocument();

    // Check creation time
    const dateObj = Date.parse(mockPlanet.created);
    const d = new Date(dateObj);
    expect(screen.getByText(`created at ${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`)).toBeInTheDocument();

    // Check creation date
    expect(screen.getByText(`created in [${d.getFullYear()}-${d.getMonth()}-${d.getDay()}]`)).toBeInTheDocument();

    // Check films component
    // expect(screen.getByTestId('films')).toHaveTextContent(`${mockPlanet.films.length} films`);
  });
});
