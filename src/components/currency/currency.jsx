import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Currency() {
  const [UAHValue, setUAHValue] = useState(0);
  const [USDValue, setUSDValue] = useState(0);

  useEffect(() => {
    axios("https://api.exchangerate.host/latest").then((data) => {
      setUAHValue(data.data.rates.UAH);
      setUSDValue(data.data.rates.USD);
    });
  }, []);

  return (
    <div className="currency_container">
      <p>1 EUR : {UAHValue} UAH</p>
      <p>1 EUR : {USDValue} USD</p>
    </div>
  );
}
