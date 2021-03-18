// import { useEffect, useState, useRef } from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";
// import App from "./App";

//component요소를 가져와서 click 시 function 실행 
const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

// const App = () => {
//   const sayhello = () => console.log("say hello");
//   const title = useClick(sayhello);
//   return (
//     <div className="App">
//       <h1 ref={title}>hello</h1>
//     </div>
//   );
// };