import React, { useState } from "react";
import { parse, evaluate ,range} from "mathjs";
import Plot from "react-plotly.js";
import axios from 'axios';
// const Plot = require('react-plotly.js').default;

function Falseposition() {
  const [ffx, setffx] = useState("");
  const [valueA, setvalueA] = useState("")
  const [valueB, setvalueB] = useState("");
  const [result,setresult] = useState();
  const [tables, settables] = useState([]);
  const [Ans, setAns] = useState([]);
  const [ansroot,setansroot] = useState(0);
  const [showgraph, setshowgraph] = useState(false);
  const [showtable, setshowtable] = useState(false);
  const [showroot, setshowroot] = useState(false);
  let [xl] = useState();
	let [xr] = useState();

	function Cal() {
    const table = [];
    const ans = [];
    xl = parseFloat(valueA); 
    xr = parseFloat(valueB);
    const fq = parse(ffx);
    function f(x){
      return parse(ffx).evaluate({ x: x });
    }
		const error = (xm, xmo) => Math.abs((xm - xmo) / xm)

		var i = 0, xm = 0, xmo
		  do{
  
      xmo = xm
			xm = ( (xl * f(xr)) - (xr * f(xl)) ) / (f(xr)- f(xl))
  
			if (f(xm) * f(xr) < 0) {
			  xl = xm
			}
			else {
			  xr = xm
			}
      console.log('Iteration:',i);
      console.log('xl',(xl).toFixed(6));
      console.log('xr',(xr).toFixed(6));
      console.log('x1',(xm).toFixed(6));
      console.log('x0',(xmo).toFixed(6));
      console.log('error',error(xm, xmo).toFixed(6));
			table.push({
			  Iteration: i,
			  XL: xl.toFixed(6),
			  XR: xr.toFixed(6),
			  X1: xm.toFixed(6),
        X0: xmo.toFixed(6),
			  ES: error(xm, xmo).toFixed(6)
			});
      ans.push({
			  X1: xm.toFixed(6),
			});
			i++;

		  }while (error(xm, xmo) >= 0.000001);
      settables(table);
      setAns(ans);
      //-----------------------------------------
      const anobj = ans[ans.length-1]
      let arr = Object.values(anobj)
      const ansfloat = arr.map(strs =>{
        return parseFloat(strs);
      });
      let test = f(ansfloat[0]);
      setansroot(test);
      //-----------------------------------------
      console.log(anobj);
      console.log(arr);
      console.log(ansfloat);
      console.log(test);
      console.log(table);
}
  const clickSubmit = () =>{
    setshowtable(true);
    setshowroot(true);
    setshowgraph(true);
    setresult(Cal());
  }

  return (
    <div className='falseposition'>
      <h3>False-Position</h3>
      <div>
        <input
          type="text"
          placeholder="F(X)"
          value={ffx}
          onChange={(e) => setffx(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="XL"
          value={valueA}
          onChange={(e) => setvalueA(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="XR"
          value={valueB}
          onChange={(e) => setvalueB(e.target.value)}
        />
        <br/>
        <button onClick={clickSubmit}>Submit</button>
        {/* <br/>
        <button onClick={clickSubmit}>สมการตัวอย่าง</button> */}
      </div>
      {
        showtable && 
        <table>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XL</th>
              <th>XR</th>
              <th>X1</th>
              <th>X0</th>
              <th>ES</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((item, i) => (
              <tr key={i}>
                <td>{item.Iteration}</td>
                <td>{item.XL}</td>
                <td>{item.XR}</td>
                <td>{item.X1}</td>
                <td>{item.X0}</td>
                <td>{item.ES}</td>
              </tr>
            ))}
          </tbody>
        </table>       
      }
        {
          showroot &&
          <div className="printroot2">
            {ansroot}
          </div>
        } 
      <div className="Gfalseposition">
        {
          showgraph &&
          <Plot
          data={[
            {
              x: range(-10, 10, 0.5).toArray(),
              y: range(-10, 10, 0.5).toArray().map(function (x){
                  return parse(ffx).evaluate({ x: x })}), 
              marker: {color: 'skyblue'}
            },
          ]}
          layout={{width: 700, height: 600, title: 'False-Position'}}
        />          
        }
      </div>
    </div>
  )
}

export default Falseposition;