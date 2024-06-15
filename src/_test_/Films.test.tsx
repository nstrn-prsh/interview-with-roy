import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Iplanet } from "../services/planet/planet.module";
import { fetchFilm } from "../services/films";
import Films from "../components/planet/films";
import { IfilmItem } from "../services/films/films.module";

// Mock the fetchFilm function
vi.mock("../services/films", () => ({
   fetchFilm: vi.fn(),
}));

describe("Films Component", () => {
   const mockFilms = [
      "The Phantom Menace",
      "Attack of the Clones",
      "Return of the Jedi",
      "Revenge of the Sith",
   ];

   const mockItem: Iplanet = {
      name: "Naboo",
      rotation_period: "26",
      orbital_period: "312",
      diameter: "12120",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "grassy hills, swamps, forests, mountains",
      surface_water: "12",
      population: "4500000000",
      residents: ["https://swapi.dev/api/people/3/"],
      films: ["https://swapi.dev/api/films/3/"],
      created: "2014-12-10T11:52:31.066000Z",
      edited: "2014-12-20T20:58:18.430000Z",
      url: "https://swapi.dev/api/planets/8/",
   };

   beforeEach(() => {
      vi.clearAllMocks(); // Clear mocks before each test to avoid interference
   });

   it("renders loading state correctly", () => {
      (fetchFilm as vi.Mock).mockImplementation(
         (
            item: IfilmItem,
            setList: (arg: string[]) => void,
            setIsFetching: (arg: boolean) => void
         ) => {
            setIsFetching(true);
         }
      );

      render(<Films item={mockItem} />);
      expect(screen.getByText("...")).toBeInTheDocument();
   });

   it("renders fetched films correctly", async () => {
      (fetchFilm as vi.Mock).mockImplementation(
         (
            item: IfilmItem,
            setList: (arg: string[]) => void,
            setIsFetching: (arg: boolean) => void
         ) => {
            setList(mockFilms);
            setIsFetching(false);
         }
      );

      render(<Films item={mockItem} />);

    //   await waitFor(() => {
    //      mockFilms.forEach((film) => {
    //         expect(screen.getByText(film)).toBeInTheDocument();
    //      });
    //   });

      expect(screen.getByText("Return of the Jedi ,")).toBeInTheDocument();
      expect(screen.getByText("Revenge of the Sith")).toBeInTheDocument();
   });
});
