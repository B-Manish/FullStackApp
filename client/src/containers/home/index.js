import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchallrestaurantsdata } from "../../redux/restaurantSlice";
import { getAllRestaurants, getLambdaapi } from "../../api/restaurantApi";
import RestaurantCard from "../../components/RestaurantCard";

function Home() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(fetchallrestaurantsdata());
  // }, []);
  const dispatch = useDispatch();
  const restData = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [ldata, setLdata] = useState("");
  // console.log("restData", restData);

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

    getLambdaapi()
      .then((res) => {
        setLdata(res?.body);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <Box>
      ldata:{ldata}
      <Grid container sx={{ border: "1px solid blue", width: "80vw" }}>
        {data?.map((item, index) => (
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
