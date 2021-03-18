
// import { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
//조건에 맞는 input 입력만 받기
export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
      const {
        target: { value }
      } = event;
  
      let willUpdate = true;
  
      if (typeof validator === "function") {
        willUpdate = validator(value);
      }
  
      if (willUpdate) {
        setValue(value);
      }
    };
    return { value, onChange };
};
  
// const App = () => {
// 	//validator 함수 
//   const maxLen = (value) => value.length <= 10;
  
//   //useInput 실행 및 초기값 지정
//   const name = useInput("Mr.", maxLen);
  
//   //렌더링
//   return (
//     <div className="App">
//       <h1>Hello</h1>
//       <input placeholder="Name" value={name.value} onChange={name.onChange} />
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);