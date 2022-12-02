import React from 'react'

// Estilos
import "./inputform.css";

function InputForm(props) {
  return (
    <>
      <label className="inputLabel">{props.title}</label>
      <input 
        className='inputInput'
        required={true} 
        value={props.value} 
        name={props.name} 
        type="text" 
        onChange={props.onInputChange}/>
    </>
  );
};

export default InputForm