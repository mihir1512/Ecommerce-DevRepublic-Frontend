import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

function AddedItems({
  id,
  name,
  price,
  category,
  quantityInCart,
  setNetAmount,
}) {
  const [quantity, setQuantity] = useState(quantityInCart);
  const [isQuantityZero, setIsQuantityZero] = useState(true);

  const handleRemove = async () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        return prevQuantity - 1;
      });
      await axios.patch(
        "http://localhost:5000/cart/update",
        {
          quantity: quantity - 1,
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const cartProducts = await axios.get("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = cartProducts;
      const finalPrice = data?.reduce((acc, curr) => {
        return acc + curr.totalProductPrice;
      }, 0);
      setNetAmount(finalPrice);
    }
    if (quantity == 1) {
      setIsQuantityZero(false);
    }
  };

  const handleAdd = async () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    await axios.patch(
      "http://localhost:5000/cart/update",
      {
        quantity: quantity + 1,
        productId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const cartProducts = await axios.get("http://localhost:5000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = cartProducts;
    const finalPrice = data?.reduce((acc, curr) => {
      return acc + curr.totalProductPrice;
    }, 0);
    setNetAmount(finalPrice);
  };

  return (
    <>
      {isQuantityZero && (
        <Box sx={{ maxWidth: 275, width: "100%" }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {category}
                </Typography>
                <Typography variant="body2">${price}</Typography>
              </CardContent>
              <CardActions>
                <div style={{ display: "flex" }}>
                  <Button variant="contained" onClick={handleRemove}>
                    <RemoveIcon />
                  </Button>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={quantity}
                  />
                  <Button variant="contained" onClick={handleAdd}>
                    <AddIcon />
                  </Button>
                </div>
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
      )}
    </>
  );
}

export default AddedItems;
