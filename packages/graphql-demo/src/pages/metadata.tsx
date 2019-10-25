import React from "react";
import { BreedSelector } from "../components/BreedSelector";
import { CountrySelector } from "../components/CountrySelector";

const MetaData = () => (
  <>
    <h1>Metadata</h1>
    <h2>Country selector:</h2>
    <CountrySelector />
    <h2>Breed selector:</h2>
    <BreedSelector />
  </>
);

export default MetaData;
