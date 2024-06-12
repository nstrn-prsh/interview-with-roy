import { ArrowDown2, Paintbucket } from "iconsax-react";
import Films from "./films";
import { Iplanet } from "../../services/planet/planet.module";

interface Iprops {
   planet: Iplanet;
}

const Detail = ({ planet }: Iprops) => {
   const dateObj = Date.parse(planet.created);
   const d = new Date(dateObj);

   return (
      <div className='flex bg-card p-5 m-4 rounded-md '>
         <div className='flex-1 w-64 '>
            <p className='text-title'>
               created at{" "}
               {`${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`}
            </p>
            <div className='flex'>
               <div className='flex-none w-14 text-red-200 content-center'>
                  <Paintbucket size='32' className='text-title' />
               </div>
               <div className='flex-1 w-64 '>
                  <p className='text-primaryTitle bol'>{planet.name}</p>
                  <p className='text-disabledTitle hidden sm:block'>
                     {planet.climate}
                  </p>
                  <div className='sm:hidden lg:block'>
                     <Films item={planet} />
                  </div>
               </div>
            </div>
            <div className='hidden sm:flex '>
               <Films item={planet} />
            </div>
         </div>
         <div className='sm:hidden flex-1 w-80  text-right'>
            <p className='text-title'>
               created in [{`${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`}]
            </p>
            <p className='text-disabledTitle'>{planet.climate}</p>
            <p className='text-primaryTitle'>
               <ArrowDown2
                  size='24'
                  className='text-primaryTitle float-right'
               />
            </p>
         </div>
         <div className='hidden sm:flex'>
            <div className='flex-none content-center w-14'>
               <Paintbucket size='32' className='text-title' />
            </div>
         </div>
      </div>
   );
};

export default Detail;
