import React from "react";
import "./converterRow.css";

export default function ConverterRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <>
      <input
        type="number"
        value={amount}
        onChange={onChangeAmount}
        className="converter_row__text"
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        className="converter_row__select"
      >
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
