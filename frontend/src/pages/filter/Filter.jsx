import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Filter = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return <div></div>;
};

export default Filter;
