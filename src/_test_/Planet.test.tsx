import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Planet from "../components/planet";
import { getPlanetsWithReptileResident } from "../services/planet";
import { Iplanet } from "../services/planet/planet.module";

// Mock the getPlanetsWithReptileResident function
vi.mock("../services/planet", () => ({
   getPlanetsWithReptileResident: vi.fn(),
}));

describe("Planet Component", () => {
   beforeEach(() => {
      vi.clearAllMocks(); // Clear mocks before each test to avoid interference
   });

   it("renders skeletons while fetching", () => {
      const mockGetPlanets = getPlanetsWithReptileResident as jest.Mock;
      mockGetPlanets.mockImplementation(() => new Promise(() => {}));

      render(<Planet />);
      const skeletons = screen.getAllByRole("alert"); // Assuming Skeleton components have role="alert"
      expect(skeletons).toHaveLength(5);
   });

   it("renders planet details after fetching", async () => {
      const mockPlanets: Iplanet[] = [
         {
            name: "Tatooine",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: ["https://swapi.dev/api/people/1/"],
            films: ["https://swapi.dev/api/films/1/"],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "https://swapi.dev/api/planets/1/",
         },
      ];

      const mockGetPlanets = getPlanetsWithReptileResident as jest.Mock;
      mockGetPlanets.mockResolvedValue(mockPlanets);

      render(<Planet />);

      await waitFor(() => {
         const detailElements = screen.getAllByTestId("detail");
         expect(detailElements).toHaveLength(mockPlanets.length);
      });
   });

   it("handles fetch error", async () => {
      const mockGetPlanets = getPlanetsWithReptileResident as jest.Mock;
      mockGetPlanets.mockRejectedValue(new Error("Failed to fetch"));

      render(<Planet />);

      await waitFor(() => {
         const skeletons = screen.queryAllByRole("alert");
         expect(skeletons).toHaveLength(0);
      });
   });
});
