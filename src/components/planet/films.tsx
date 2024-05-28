import { useEffect, useState } from "react";

interface IfilmItem {
   films: string[];
}

interface IfilmsProps {
   item: IfilmItem;
}

const Films = ({ item }: IfilmsProps) => {
   const [isFetching, setIsFetching] = useState<boolean>(true);
   const [List, setList] = useState<string[]>([]);

   const fetchFilm = () => {
      const fetchedList: string[] = [];
      Promise.all(
         item.films.map((film: string) => {
            return fetch(film)
               .then((response) => {
                  if (!response.ok) {
                     throw new Error(`Failed to fetch`);
                  }
                  return response.json();
               })
               .then((res) => {
                  fetchedList.push(res.title);
               });
         })
      )
         .then(() => {
            setList(fetchedList);
            setIsFetching(false);
         })
         .catch((error) => {
            console.error(error);
            setIsFetching(false);
         });
   };

   useEffect(() => {
      fetchFilm();
   }, []);

   return (
      <>
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
      </>
   );
};

export default Films;
