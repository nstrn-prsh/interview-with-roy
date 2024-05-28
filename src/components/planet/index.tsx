import { useEffect, useState } from "react";
import Detail from "./detail";
import Skeleton from "./skeleton";

export interface Iplanet {
   name: string;
   rotation_period: string;
   orbital_period: string;
   diameter: string;
   climate: string;
   gravity: string;
   terrain: string;
   surface_water: string;
   population: string;
   residents: string[];
   films: string[];
   created: string;
   edited: string;
   url: string;
}

interface Iresident {
   name: string;
   height: string;
   mass: string;
   hair_color: string;
   skin_color: string;
   eye_color: string;
   birth_year: string;
   gender: string;
   homeworld: string;
   films: string[];
   species: string[];
   vehicles: string[];
   starships: string[];
   created: string;
   edited: string;
   url: string;
}

interface Ispecies {
   name: string;
   classification: string;
   designation: string;
   average_height: string;
   skin_colors: string;
   hair_colors: string;
   eye_colors: string;
   average_lifespan: string;
   homeworld: string;
   language: string;
   people: string[];
   films: string[];
   created: string;
   edited: string;
   url: string;
}

const Planet = () => {
   const [planets, setPlanets] = useState<Iplanet[]>([]);
   const [isFetching, setIsFetching] = useState<boolean>(true);

   const getPlanetsWithReptileResident = async (): Promise<Iplanet[]> => {
      try {
         const response = await fetch("https://swapi.dev/api/planets/");
         if (!response.ok) {
            throw new Error("Failed to fetch planets");
         }

         const data = await response.json();
         const planetPromises = data.results.map(async (planet: Iplanet) => {
            if (planet.films.length >= 1) {
               for (const residentUrl of planet.residents) {
                  const residentResponse = await fetch(residentUrl);
                  if (!residentResponse.ok) {
                     throw new Error(
                        `Failed to fetch resident data for planet: ${planet.name}`
                     );
                  }

                  const residentData: Iresident = await residentResponse.json();

                  for (const speciesUrl of residentData.species) {
                     const speciesResponse = await fetch(speciesUrl);
                     if (!speciesResponse.ok) {
                        throw new Error(
                           `Failed to fetch species data for planet: ${planet.name}`
                        );
                     }

                     const speciesData: Ispecies = await speciesResponse.json();
                     // note: I changed reptile with mammal in the example bc I saw no reptile array
                     if (speciesData.classification === "mammal") {
                        return planet;
                     }
                  }
               }
            }
         });

         const planetResults = await Promise.all(planetPromises);
         return planetResults.filter(Boolean) as Iplanet[];
      } catch (error: any) {
         console.error(error.message);
         return [];
      }
   };

   useEffect(() => {
      getPlanetsWithReptileResident()
         .then((planets: Iplanet[]) => {
            setPlanets(planets);
            setIsFetching(false);
         })
         .catch((error) => {
            console.error(error.message);
            setIsFetching(false);
         });
   }, []);

   return (
      <>
         {isFetching ? (
            <div className='space-y-1'>
               {[1, 2, 3, 4, 5].map((item, index) => (
                  <div className='flex p-4' key={index}>
                     <Skeleton
                        className='w-full h-10'
                        fill='gray'
                        rounded='xl'
                     ></Skeleton>
                  </div>
               ))}
            </div>
         ) : (
            <ul>
               {planets.map((planet: Iplanet, index) => (
                  <li key={index}>
                     <Detail planet={planet} />
                  </li>
               ))}
            </ul>
         )}
      </>
   );
};

export default Planet;
