import { Iplanet, Iresident, Ispecies } from "./planet.module";

export const getPlanetsWithReptileResident = async (): Promise<Iplanet[]> => {
   try {
      const response = await fetch("https://swapi.dev/api/planets/");
      if (!response.ok) {
         //   throw new Error("Failed to fetch planets");
         alert("Failed to fetch planets");
      }

      const data = await response.json();
      const planetPromises = data.results.map(async (planet: Iplanet) => {
         if (planet.films.length >= 1) {
            for (const residentUrl of planet.residents) {
               const residentResponse = await fetch(residentUrl);
               if (!residentResponse.ok) {
                  //   throw new Error(`Failed to fetch resident data for planet: ${planet.name}`);
                  alert(
                     `Failed to fetch resident data for planet: ${planet.name}`
                  );
               }

               const residentData: Iresident = await residentResponse.json();

               for (const speciesUrl of residentData.species) {
                  const speciesResponse = await fetch(speciesUrl);
                  if (!speciesResponse.ok) {
                     //  throw new Error(`Failed to fetch species data for planet: ${planet.name}`);
                     alert(
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
