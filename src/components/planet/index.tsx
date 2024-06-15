import { useEffect, useState } from "react";
import Detail from "./detail";
import Skeleton from "./skeleton";
import { Iplanet } from "../../services/planet/planet.module";
import { getPlanetsWithReptileResident } from "../../services/planet";

const Planet = () => {
   const [planets, setPlanets] = useState<Iplanet[]>([]);
   const [isFetching, setIsFetching] = useState<boolean>(true);

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
      <div data-testid='planet'>
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
      </div>
   );
};

export default Planet;
