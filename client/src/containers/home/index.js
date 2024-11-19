import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllRestaurants,
  getLambdaapi,
  getCategories,
} from "../../api/restaurantApi";
import RestaurantCard from "../../components/RestaurantCard";
import Icon from "../../components/Icon";
import Pizza from "../../assets/categories/idli.png";
import Sv from "../../assets/kfc.png";

import Inputfields from "../../components/Inputfields";

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
        Top restaurant chains in Chennai
      </Box>
      <Grid container sx={{ width: "80vw" }}>
        {data?.map((item) => (
          <Grid item xs={3} key={item?.name}>
            <RestaurantCard
              // imgSrc={item?.img}
              imgSrc={Sv}
              name={item?.name}
              rating={item?.rating}
              type={item?.type[0]}
              clickHandler={() => goTo(item?.restaurant_id)}
              location={item?.locations[0]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
