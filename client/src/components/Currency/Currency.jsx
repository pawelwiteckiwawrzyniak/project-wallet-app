import { useState, useEffect } from "react";
import css from "./Currency.module.css";

export const Currency = () => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "http://api.nbp.pl/api/exchangerates/tables/C/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Currency data:", data[0].rates);
        setCurrencyData(data[0].rates);
      } catch (error) {
        console.error("Error fetching currency data:", error.message);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div className={css.currencies}>
      <div className={css["currencies-header"]}>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={css["currencies-wrapper"]}>
        <table>
          <tbody>
            {currencyData.map((currency, index) => (
              <tr key={index}>
                <td>{currency.code}</td>
                <td>{currency.bid}</td>
                <td>{currency.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={css.scroll}></div>
      <div className={css.svg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="393"
          height="118"
          viewBox="0 0 393 118"
          fill="linear-gradient(180deg, rgba(255, 255, 255, 0.20) -7.46%, rgba(255, 255, 255, 0.00) 100%)"
        >
          <path
            d="M31.44 42.1037L0 67.5585V98C0 109.046 8.9543 118 20 118H363C379.569 118 393 104.569 393 88V22.0282C391.568 21.335 389.483 21.1035 388.598 21.0492C381.707 20.6267 377.754 24.6567 372.25 28.3919L372.181 28.4384C370.554 29.5435 366.484 32.3081 359.045 32.3081C351.499 32.3081 346.259 29.6973 344.582 28.3919L319.43 7.83226C316.077 5.22151 308.741 0 300.566 0C292.392 0 285.894 5.22151 282.96 7.83226L166.632 95.461C164.746 97.0927 158.961 100.356 150.912 100.356C142.863 100.356 137.078 97.0927 135.192 95.461L67.9104 39.6561C65.6048 37.6981 58.8557 33.7819 50.304 33.7819C41.7523 33.7819 34.1648 39.3298 31.44 42.1037Z"
            fill="url(#paint0_linear_4_436)"
            fillOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4_436"
              x1="196.5"
              y1="-8.80597"
              x2="196.5"
              y2="118"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Currency;
