import { useState } from "react";
import data from "./data.js";
import "./Accordion.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [multi, setMulti] = useState([]);

  function handdleSingleClick(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);

  }

  const handdleMulti = () => {
    setMultiSelect(() => !multiSelect)
    setSelected( () => null)
    setMulti(() => [])
    
    console.log(multi)
  }

  const handleMultiSelections = (getCurrentId) => {

    if (selected === getCurrentId){
        setSelected(null);
    }
    else{
        let copyarr = [...multi];
        console.log(copyarr)
        const findIndexOfCurrentId = copyarr.indexOf(getCurrentId);
    
        if (findIndexOfCurrentId === -1) copyarr.push(getCurrentId);
        else copyarr.splice(findIndexOfCurrentId, 1);
    
        setMulti(() => copyarr);
        console.log(selected);
        console.log(copyarr)
    }
    
  };

  return (
    <div className="wrapper">
      <button onClick={handdleMulti}>
        Enable Multi Selection
      </button>
      <div className="accordion">
        {data ? (
          data.map((item, index) => (
            <div className="item" key={item.id}>
              <div
                onClick={
                  multiSelect
                    ? () => handleMultiSelections(item.id)
                    : () => handdleSingleClick(item.id)
                }
                className="question"
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              
              {selected === item.id || multi.indexOf(item.id) !== -1 ? (
                <div className="answer">{item.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div> Data not found </div>
        )}
      </div>
    </div>
  );
}
