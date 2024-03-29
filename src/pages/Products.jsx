import React, { useEffect, useState } from "react";
import MuiContainer from "../components/Container";
import MuiCard from "../components/Card";
import axios from "axios";
import styles from "./CSS.module.css";
import { MenuItem, Select, FormControl } from "@mui/material";
import Button from "@mui/material/Button";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  const loadProducts = async () => {
    const products = await axios.get("http://localhost:5000/products/");
    return products.data;
  };

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
      setOriginalProducts(data);
    });
  }, []);

  const filterProducts = () => {
    let filteredProducts = [...originalProducts];

    // Filter based on category
    if (selectedCategory !== "all" && selectedCategory !== "") {
      filteredProducts = filteredProducts.filter(
        (itm) => itm.category === selectedCategory
      );
    }

    // Filter based on price range
    if (selectedPriceRange !== "all" && selectedPriceRange !== "") {
      const [minPrice, maxPrice] = selectedPriceRange.split(" - ");
      filteredProducts = filteredProducts.filter(
        (itm) =>
          parseInt(itm.price) >= parseInt(minPrice) &&
          (maxPrice === "Above" || parseInt(itm.price) <= parseInt(maxPrice))
      );
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPriceRange]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };
  const handleClear = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.filterCategory}>
            Filter By Category
            <FormControl>
              <Select
                id="category-dropdown"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="grocery">Grocery</MenuItem>
                <MenuItem value="electric">Electric</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.filterPrice}>
            Filter By Price Range
            <FormControl>
              <Select
                id="price-dropdown"
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="0$ - 1000$">0$ - 1000$</MenuItem>
                <MenuItem value="1001$ - 2000$">1001$ - 2000$</MenuItem>
                <MenuItem value="2001$ - 3000$">2001$ - 3000$</MenuItem>
                <MenuItem value="3001$ - Above">3001$ - Above</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button variant="contained" onClick={handleClear}>
            Clear Filter
          </Button>
        </div>
        <MuiContainer>
          {products.map((item) => (
            <MuiCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              category={item.category}
            />
          ))}
        </MuiContainer>
      </div>
    </>
  );
}

export default Products;
