import React from "react";
import { BreedSelector } from "../components/BreedSelector";
import { CountryList } from "../components/CountryList";

const MetaData = () => <div>
  <h1>Country list:</h1>
  <CountryList />
  <BreedSelector />
</div>;

export default MetaData;
