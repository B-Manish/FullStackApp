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
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  const goTo = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    setLoading(true);
    getAllRestaurants({ city: "Hyderabad", rating: rating, cuisine: cuisine })
      .then((res) => {
        setData(res?.restaurants);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
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
          pl: "20px",
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
          paddingLeft: "20px",
        }}
      >
        Top restaurant chains in Hyderabad
      </Box>
      <Grid container sx={{ width: "80vw" }}>
        {loading
          ? [1, 2, 3, 4].map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                key={item}
                sx={{ padding: "20px 20px 0" }}
              >
                <RestaurantCard loading={loading} />
              </Grid>
            ))
          : data?.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                key={item?.restaurant_data?.name}
                sx={{ padding: "20px 20px 0" }}
              >
                <RestaurantCard
                  imgSrc={item?.restaurant_data?.img}
                  name={item?.restaurant_data?.name}
                  rating={item?.restaurant_data?.rating}
                  type={item?.restaurant_data?.cuisine}
                  clickHandler={() => goTo(item?.restaurant_id)}
                  location={item?.restaurant_data?.area}
                  loading={loading}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}

export default Home;
