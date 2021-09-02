import React from "react";

function Layout({ temperature, children }) {
  const getTempClassName = () => {
    const temp = temperature;
    if (temp >= 30) {
      return " heat";
    }
    if (temp >= 10 && temp > -10) {
      return " medium-cold";
    }
    return " cold";
  };

  return (
    <div
      className={temperature ? "app" + getTempClassName() : "app medium-cold"}
    >
      <main>{children}</main>
    </div>
  );
}

export default Layout;
