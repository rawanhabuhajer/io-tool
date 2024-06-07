import React from "react";
import "./pv.css";
const Pv = ({
  setOperationTemp,
  setCableSize,
  setCableLength,
  setVmp,
  setLsc,
}) => {

  return (
    <div className="pv-container">
      <div className="pv-module">PV module</div>
      <div className="pv-div">
        <div>Cable Size</div>
        <input
          type="number"
          min={0}
          onChange={(e) => setCableSize(e.target.value)}
        ></input>
      </div>
      <div className="pv-div">
        <div>Cable Length</div>
        <input
          type="number"
          min={0}
          onChange={(e) => setCableLength(e.target.value)}
        ></input>
      </div>
      <div className="pv-div">
        <div>Vmp</div>
        <input
          type="number"
          min={0}
          onChange={(e) => setVmp(e.target.value)}
        ></input>
      </div>
      <div className="pv-div">
        <div>Isc</div>
        <input
          type="number"
          min={0}
          onChange={(e) => setLsc(e.target.value)}
        ></input>
      </div>
      <div className="pv-div">
        <div>Operating Tempreture</div>
        <input
          type="number"
          min={0}
          onChange={(e) => setOperationTemp(e.target.value)}
          defaultValue={0}
        ></input>
      </div>
    </div>
  );
};

export default Pv;
