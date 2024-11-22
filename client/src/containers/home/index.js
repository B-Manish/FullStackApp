import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRestaurants, getCategories } from "../../api/restaurantApi";
import RestaurantCard from "../../components/RestaurantCard";
import Icon from "../../components/Icon";
import Pizza from "../../assets/categories/idli.png";

function Home() {
  const navigate = useNavigate();
  const restData = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const goTo = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    getAllRestaurants("Hyderabad")
      .then((res) => {
        setData(res?.categories[0]?.restaurants);
      })
      .catch((err) => {
        console.log("err", err);
      });

    getCategories()
      .then((res) => {
        setCategories(res?.categories);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          fontFamily: '"GilroyBold", sans-serif',
          fontSize: "24px",
          mt: "15px",
        }}
      >
        What's on your mind?
      </Box>
      <Box sx={{ width: "80vw", display: "flex", mt: "20px" }}>
        {categories?.map((item) => (
          <Box
            sx={{
              width: "145px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            key={item?.category}
          >
            <Icon src={Pizza} imgHeight="110px" imgWidth="110px" />
            <Box
              sx={{
                fontSize: "18px",
              }}
            >
              {item?.category}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          fontFamily: '"GilroyMedium", sans-serif',
          fontSize: "24px",
          fontWeight: "600",
          m: "50px 0 10px 0",
        }}
      >
        Top restaurant chains in Hyderabad
      </Box>
      <Grid container sx={{ width: "80vw" }} rowSpacing={5}>
        {data?.map((item) => (
          <Grid item xs={6} md={3} key={item?.name}>
            <RestaurantCard
              imgSrc={item?.restaurant_data?.img}
              name={item?.restaurant_data?.name}
              rating={item?.restaurant_data?.rating}
              type={item?.restaurant_data?.cuisine}
              clickHandler={() => goTo(item?.restaurant_id)}
              location={"gg"}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
