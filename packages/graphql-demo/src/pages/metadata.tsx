import React from "react";
import { BreedSelector } from "../components/BreedSelector";
import { CountrySelector } from "../components/CountrySelector";

const MetaData = () => (
  <div>
    <h1>Country list:</h1>
    <CountrySelector />
    <BreedSelector />
  </div>
);

export default MetaData;
