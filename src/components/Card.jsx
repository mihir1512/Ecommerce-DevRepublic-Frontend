import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MuiCard({ id, category, name, price, quantityInCart }) {
  const [goToCartBool, setGoToCartBool] = useState(true);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!goToCartBool) {
      navigate("/cart");
    }
    if (goToCartBool) {
      await axios.post(
        "http://localhost:5000/cart/add",
        {
          quantity: 1,
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
    setGoToCartBool(false);
  };
  return (
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
            <Button variant="contained" onClick={handleClick}>
              {goToCartBool ? "Add to cart" : "Go to Cart"}
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
