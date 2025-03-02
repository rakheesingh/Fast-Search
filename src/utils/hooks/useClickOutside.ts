import { useEffect } from "react";

export function useClickOutside(closeFunction: () => void, opened: boolean, className: string){
     const handleClickOutside = (event: Event) => {
        console.log("Click detected on:", event.target); // Debugging line
      
        if (
          event.target instanceof HTMLElement &&
          !event.target.closest(className)
        ) {
          console.log("Closing dropdown!"); 
          closeFunction();
        } else {
          console.log("Clicked inside the dropdown, keeping it open.");
        }
      };
      
    
      useEffect(() => {
        if (opened) {
          document.addEventListener("click", handleClickOutside);
        } else {
          document.removeEventListener("click", handleClickOutside);
        }
      
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [opened]); 
      
    
}