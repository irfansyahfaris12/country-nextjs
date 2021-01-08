// بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِي

import { useState } from "react";
import dynamic from 'next/dynamic'
import Layout from "../component/Layout/Layout";
import SearchInput from "../component/SearchIpnut/SearchInput";
import styles from "../styles/Home.module.css";
const CountriesTable = dynamic(() => import('../component/CountriesTable/CountriesTable'),{
  loading: () => <div>Loading...</div>
})

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filterCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.count}>found{countries.length}countries</div>
        <div className={styles.input}>
          <SearchInput placeholder="filter by name" onChange={onInputChange} />
        </div>
      </div>
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
