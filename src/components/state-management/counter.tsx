import { useStore } from "../../provider/store";

const Counter = () => {
   const [count] = useStore("count");

   return <p className='content-center mx-2'> Count : {count} </p>;
};

export default Counter;
