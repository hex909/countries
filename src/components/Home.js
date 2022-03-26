import React, { memo } from "react";
import { useGlobal } from "../contest";
import Cards from "./Cards";
import Search from "./Search";

function Home() {
  const { countryList, countryName } = useGlobal();
  return (
    <main>
      <Search />
      <Cards
        countryList={countryList.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase())
        )}
      />
    </main>
  );
}

export default memo(Home);
