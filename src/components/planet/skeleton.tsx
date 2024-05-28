import React from "react";

interface IProps {
   className?: string;
   fill?: "gray" | "light";
   rounded?: "md" | "sm" | "xl" | "full";
   children?: React.ReactNode;
}
const Skeleton = (props: IProps) => {
   const { className, fill, children, rounded } = props;
   let classNameRounded;
   switch (rounded) {
      case "md":
         classNameRounded = "rounded-md";
         break;
      case "xl":
         classNameRounded = "rounded-xl";
         break;
      case "full":
         classNameRounded = "rounded-full";
         break;
      default:
         classNameRounded = "rounded-sm";
         break;
   }
   return (
      <div
         className={`${
            fill === "gray" ? "bg-gray-400" : "bg-gray-200"
         } ${className} animate-pulse ${classNameRounded}`}
      >
         {children}
      </div>
   );
};

export default Skeleton;
