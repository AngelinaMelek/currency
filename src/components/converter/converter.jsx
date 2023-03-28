import React, { useEffect, useState } from "react";
import axios from "axios";
import ConverterRow from "../converterRow/converterRow";
import "./converter.css";

export default function Converter() {
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios("https://api.exchangerate.host/latest").then((data) => {
      setcurrencyOptions([data.data.base, ...Object.keys(data.data.rates)]);
      setFromCurrency(data.data.base);
      setToCurrency(Object.keys(data.data.rates)[0]);
      setExchangeRate(data.data.rates[Object.keys(data.data.rates)[0]]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency >= 0 && toCurrency >= 0) {
      axios(
        `https://api.exchangerate.host/latest?base${fromCurrency}&symbols=${toCurrency}`
      ).then((data) => setExchangeRate(data.data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="converter">
      <ConverterRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <ConverterRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}
