import Counter from "./counter";
import CounterBtn from "./counterBtn";

const StateManagement = () => {
   return (
         <div className='flex bg-primaryTitle py-4 justify-around sm:flex-col'>
            <h2 className='content-center mx-2'>state management:</h2>
            <Counter />
            <CounterBtn />
         </div>
   );
};

export default StateManagement;
