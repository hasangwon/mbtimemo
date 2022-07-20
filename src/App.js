import React, { useEffect, useState } from "react";
import { firestore } from "./Firestore";
import "./App.css";

const App = () => {
  const [mbtiList, setMbtiList] = useState([]);
  const [person, setPerson] = useState({});
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("name");
  const english = /[a-zA-Z]/;

  useEffect(() => {
    const mbti = firestore.collection("mbti").orderBy(sort, "asc");
    setMbtiList([]);
    mbti.get().then((doc) => {
      doc.forEach((val) => setMbtiList((person) => [...person, val.data()]));
    });
  }, [count]);

  const handleData = (e) => {
    const { value, name } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const setData = (e) => {
    e.preventDefault();
    const mbti = firestore.collection("mbti");

    if (!english.test(person.mbti)) {
      alert("MBTI 영어로 써");
      return;
    }
    if (person.name && person.mbti) {
      mbti.doc(person.name).set({ id: mbtiList ? mbtiList.length + 1 : 1, name: person.name, mbti: person.mbti });
      setPerson({ name: "", mbti: "" });
      setCount((count) => count + 1);
      alert("굿~!");
    } else {
      alert("다 쓰세요");
    }
  };

  return (
    <div className="body">
      <div className="content">
        <h1 className="title">MBTI memo</h1>
        <form onSubmit={(e) => setData(e)} className="formLine">
          <div className="inputLine">
            <input type="text" name="name" className="input" placeholder="name" value={person.name} onChange={(e) => handleData(e)} />
            <input type="text" name="mbti" className="input" placeholder="MBTI" value={person.mbti} onChange={(e) => handleData(e)} />
          </div>
          <input type="submit" value="추가" className="buttons" />
        </form>
        <hr />
      </div>

      <div className="content">
        <div>
          <input
            type="submit"
            value="이름별"
            className="buttons input"
            onClick={() => {
              setSort("name");
              setCount((count) => count + 1);
            }}
          />
          <input
            type="submit"
            value="MBTI별"
            className="buttons input"
            onClick={() => {
              setSort("mbti");
              setCount((count) => count + 1);
            }}
          />
        </div>
        {sort === "name" && (
          <div className="mbtiBox">
            {mbtiList.map((val, idx) => {
              return (
                <li key={idx} className="list">
                  <b className="index">{idx + 1} :</b> <span className="names">{val.name}</span> / {val.mbti}
                  {val.id === mbtiList.length ? <span className="new">new!</span> : ""}
                  {val.name === "우혜림" ? <span className="new">hot</span> : ""}
                </li>
              );
            })}
          </div>
        )}
        {sort === "mbti" && (
          <div className="mbtiBox">
            {mbtiList.map((val, idx) => {
              return (
                <li key={idx} className="list">
                  <b className="index">{idx + 1} :</b> <span className="names">{val.mbti}</span> / {val.name}
                  {val.id === mbtiList.length ? <span className="new">new!</span> : ""}
                  {val.name === "우혜림" ? <span className="new">hot</span> : ""}
                </li>
              );
            })}
          </div>
        )}
        <span className="copyright">copyright 2022. 하상원 All rights reserved</span>
      </div>
    </div>
  );
};

export default App;
