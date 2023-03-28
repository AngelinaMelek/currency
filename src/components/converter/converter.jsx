import React from "react";
import Select from "react-select";
import "./converter.css";

export default function Converter() {
  const options = [
    { value: "EUR", label: "EUR" },
    { value: "UAH", label: "UAH" },
    { value: "USD", label: "USD" },
  ];
  return (
    <div className="converter">
      <div className="converter converter__left">
        <input
          type="number"
          min="0"
          pattern="[0-9]"
          className="converter__left_input"
        />
        <Select options={options} />
      </div>
      <div className="converter converter__right">
        <input
          type="number"
          min="0"
          pattern="[0-9]"
          className="converter__right_input"
        />
        <Select options={options} />
      </div>
    </div>
  );
}
