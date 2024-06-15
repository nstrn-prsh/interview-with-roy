import { useEffect, useState } from "react";
import { fetchFilm } from "../../services/films";
import { IfilmsProps } from "../../services/films/films.module";

const Films = ({ item }: IfilmsProps) => {
   const [isFetching, setIsFetching] = useState<boolean>(true);
   const [List, setList] = useState<string[]>([]);

   useEffect(() => {
      fetchFilm(item, setList, setIsFetching);
   }, []);

   return (
      <div data-testid='films'>
         {isFetching ? (
            <span className='text-disabledTitle'>...</span>
         ) : (
            List.map((item, index) =>
               index === List.length - 1 ? (
                  <span className='text-disabledTitle'>{item}</span>
               ) : (
                  <span className='text-disabledTitle'>{item} ,</span>
               )
            )
         )}
      </div>
   );
};

export default Films;
