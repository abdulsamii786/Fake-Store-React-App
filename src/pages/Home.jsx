import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";
import axios from "axios";
import DropDown from "../components/DropDown";

const Home = () => {
  const [isFound, setIsFound] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [cardData, setCardData] = useState([]);

  const handleCategories = (value) => {
    if (value === "all") {
      setFilterProducts(cardData);
    } else {
      const filteredData = cardData.filter((item) => item.category === value);
      // console.log(filteredData);
      setFilterProducts(filteredData);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    console.log(search);
  };

  const handleChange = (e) => {
    // handleSearch();
    const newValue = e.target.value;
    setSearch(newValue);
  };

  const handleSearch = () => {
    const filterSearch = filterProducts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    if (filterSearch.length === 0) {
      setIsFound(true);
    } else {
      setFilterProducts(filterSearch);
      setIsFound(false);
    }
  };

  const getData = async () => {
    setIsLoader(true);
    try {
      const data = await axios.get("https://fakestoreapi.com/products");
      const response = data?.data;

      const categories = [...new Set(response.map((item) => item.category))];

      setCategory(categories);

      setCardData(response);
      setFilterProducts(response);
      setIsLoader(false);
    } catch (e) {
      setIsLoader(false);
      console.log(e);
    }
  };
  useEffect(() => getData, []);

  return (
    <>
      {isLoader ? (
        <p>Loading</p>
      ) : (
        <>
          <select onChange={(e) => handleCategories(e.target.value)}>
            <option value="all">all</option>
            {category.map((item, id) => {
              return (
                <option key={id} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <input
            // onKeyDown={handleSearch}
            onKeyUp={handleKey}
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Search Products"
          />
          <button onClick={handleSearch}>Search</button>

          {/* <DropDown data={category} func={()=>handleCategories(value)} /> */}
          {isFound ? (
            <p>No Data Found</p>
          ) : (
            <div className="p-5 flex justify-center flex-wrap gap-4">
              {filterProducts.map((item) => {
                return <Card key={item.id} data={item} />;
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
