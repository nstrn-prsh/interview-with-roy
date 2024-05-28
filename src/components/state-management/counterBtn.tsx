import { useStore } from "../../provider/store";

const CounterBtn = () => {
   const [count, setCount] = useStore("count");
   return (
      <div className='flex'>
         <p className='m-2'> click here to increment</p>
         <button
            onClick={() => setCount((c: number) => c + 1)}
            className='bg-blue-200 rounded-full w-6 flex content-center justify-center'
         >
            {count}
         </button>
      </div>
   );
};

export default CounterBtn;
