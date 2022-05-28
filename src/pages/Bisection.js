import React, { useState} from "react";
import { parse, evaluate ,range} from "mathjs";
import Plot from "react-plotly.js";
// const Plot = require('react-plotly.js').default;
function Bisection() {
  const [ffx, setffx] = useState("");
  const [valueA, setvalueA] = useState("")
  const [valueB, setvalueB] = useState("");
  const [result,setresult] = useState();
  const [tables, settables] = useState([]);
  const [showgraph, setshowgraph] = useState(false);
  const [showtable, setshowtable] = useState(false);

  
  function Cal() {
    const table = [];
    let xl = parseFloat(valueA);
    let xr = parseFloat(valueB);
    let xm = (xl + xr) / 2;
    const f = parse(ffx);
    let xmo = 0;
    let es = 0;
    let i = 0;
    function fx(xm) {
      return f.evaluate({ x: xm });
    }
    while (Math.abs((xm - xmo) / xm) >= 0.000001) {
      xm = (xl + xr) / 2;
      var fxm = fx(xm);
      var fxr = fx(xr);
      if (fxm * fxr > 0) {
        xmo = xr;
        xr = xm;
      } else {
        xmo = xl;
        xl = xm;
      }
      es = Math.abs((xm - xmo) / xm);
      table.push({
        Iteration: i,
        XL: Number(xl).toFixed(6),
        XR: Number(xr).toFixed(6),
        XM: Number(xm).toFixed(6),
        ES: Number(es).toFixed(6),
      });
      i++;
    }
    settables(table);
    console.log(table);
  }
  const clickSubmit = () => {
    setshowtable(true);
    setshowgraph(true);
    setresult(Cal());
  }; 

  return (
    <div className="bisection">
      <h3>Bisection</h3>
      <div>
        <input
          type="text"
          placeholder="F(X)"
          value={ffx}
          onChange={(e) => setffx(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="XL"
          value={valueA}
          onChange={(e) => setvalueA(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="XR"
          value={valueB}
          onChange={(e) => setvalueB(e.target.value)}
        />
        <br />
        <button onClick={clickSubmit}>Submit</button>
      </div>
      {
        showtable && 
        <table>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XL</th>
              <th>XR</th>
              <th>XM</th>
              <th>ES</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((item, i) => (
              <tr key={i}>
                <td>{item.Iteration}</td>
                <td>{item.XL}</td>
                <td>{item.XR}</td>
                <td>{item.XM}</td>
                <td>{item.ES}</td>
              </tr>
            ))}
          </tbody>
        </table>       
      }
      <div className="Gbisection">
        { 
        showgraph &&
        <Plot
          data={[
            {
              x: range(-10, 10, 0.5).toArray(),
              y: range(-10, 10, 0.5).toArray().map(function (xm){
                  return parse(ffx).evaluate({ x: xm })}), 
              marker: {color: 'skyblue'}
            },
          ]}
          layout={{width: 700, height: 600, title: 'bisection'}}
        />
        }
      </div>
      
    </div>
  );
  }

export default Bisection;
