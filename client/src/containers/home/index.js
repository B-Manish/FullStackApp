import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllRestaurants,
  getLambdaapi,
  getCategories,
} from "../../api/restaurantApi";
import RestaurantCard from "../../components/RestaurantCard";
import Icon from "../../components/Icon";

function Home() {
  const navigate = useNavigate();
  const restData = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [ldata, setLdata] = useState("");

  const goTo = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    getAllRestaurants()
      .then((res) => {
        setData(res);
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

    // getLambdaapi()
    //   .then((res) => {
    //     setLdata(res?.body);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  }, []);
  return (
    <Box>
      {/* ldata:{ldata} */}
      <Box>What's on your mind?</Box>
      <Grid container sx={{ border: "1px solid blue", width: "80vw" }}>
        {categories?.map((item) => (
          <Grid
            item
            xs={2}
            key={item?.category}
          >
            <Box sx={{ border: "1px solid red" }}>
              <Box>
                <Icon src={item?.src} margin="0 0 20px 0"/>
              </Box>
              <Box>{item?.category}</Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ border: "1px solid blue", width: "80vw" }}>
        {data?.map((item) => (
          <Grid
            item
            xs={3}
            key={item?.name}
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
              clickHandler={() => goTo(item?.restaurant_id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
