import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    //  여기서 데이터 베이스에있는 값을 가져온다.
    axios.get(`/api/values`).then((response) => {
      console.log("response", response.data);
      setLists(response.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post("/api/value", { value: value }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        // eslint-disable-next-line
        setLists = [...lists, response.data];
        setValue("");
      } else {
        alert("값을 DB 에 넣는데 실패했습니다.");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {lists &&
            lists.map(function (_list, index) {
              return <li key={index}>list.value</li>;
            })}

          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해 주세요."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
