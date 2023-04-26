import React, { useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/api/addition", { num1, num2 })
      .then((res) => setResponse(res.data))
      .catch((err) => {
        console.log(err);
        setResponse("");
        if (
          err.response.data.message ===
          "Invalid Input, Only positive values allow"
        ) {
          alert("Invalid Input, Only positive values allow");
        }
      });
    console.log(response);
    console.log(typeof response);
  };

  return (
    <>
      <div className="main_container">
        <h2>Step Addition</h2>
        <form onSubmit={handleSubmit}>
          <div className="inp_main_container">
            <div className="inp1_container">
              <label>First Number: </label>
              <input
                type="number"
                id="num1"
                name="num1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                required
              />
            </div>

            <div className="inp2_container">
              <label>Second Number: </label>
              <input
                type="number"
                id="num2"
                name="num2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn">
            Generate
          </button>
        </form>

        <div className="output">
          <span className="resStr">{"{"}</span>
          {response &&
            response.map((step, index) => (
              <div key={index}>
                <span className="stepNum">"Step {index + 1}": </span>
                <span className="resStr">{"{"}</span>
                <span className="resStr">"carryString":</span>{" "}
                <span className="resNum">"{step.carryString}"</span>
                {" ,"}
                <span className="resStr">"sumString":</span>{" "}
                <span className="resNum">"{step.sumString}"</span>
                <span className="resStr">{"}"}</span>
              </div>
            ))}
          <span className="resStr">{"}"}</span>
        </div>
        {/* <div className="output">
        {response}
      </div> */}
      </div>
    </>
  );
};
export default Home;
