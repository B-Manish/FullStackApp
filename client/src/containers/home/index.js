import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard";
import { getAllRestaurants } from "../../api/swiggyApi";

function Home() {
  const navigate = useNavigate();

  const [restaurantsData, setRestaurantsData] = useState([]);

  const goTo = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    getAllRestaurants()
      .then((res) => {
        setRestaurantsData(res);
      })
      .catch((error) => {
        console.error(error);
        setRestaurantsData([]);
      });
  }, []);

  useEffect(() => {
    console.log("restaurantsData", restaurantsData);
  }, [restaurantsData]);

  return (
    <Box>
      <Grid container sx={{ border: "1px solid blue", width: "80vw" }}>
        {restaurantsData?.restaurantdata?.map((item, index) => (
          <Grid
            item
            xs={3}
            key={item?._id}
            sx={{
              border: "1px solid yellow",
              display: "grid",
              placeItems: "center",
              padding: "20px",
            }}
          >
            <RestaurantCard
              imgSrc={item?.img}
              name={item?.name}
              rating={item?.rating}
              type={item?.type[0]}
              clickHandler={() => goTo(item?.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
