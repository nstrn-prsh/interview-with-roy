import { IfilmItem } from "./films.module";

export const fetchFilm = (
   item: IfilmItem,
   setList: (arg: string[]) => void,
   setIsFetching: (arg: boolean) => void
) => {
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
