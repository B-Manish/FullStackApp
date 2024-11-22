import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import {
  getRestaurantDetails,
  updateCart,
  addToCart,
} from "../../api/restaurantApi";
import DeliveryDetailsCard from "../../components/DeliveryDetailsCard";
import MenuItemCard from "../../components/MenuItemCard";
import { LoginContext } from "../../context/LoginContext";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const [data, setData] = useState({});
  const {
    cartData,
    setCartData,
    setCartRestaurant,
    cartRestaurant,
    updateCount,
    setUpdateCount,
  } = useContext(LoginContext);
  const [notInitialrender, setNotInitialRender] = useState(false);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    getRestaurantDetails({ city: "Hyderabad", id: restaurantID })
      .then((res) => {
        setData(res);
        setMenu(res?.restaurant_data?.menu);
      })
      .catch(() => {});
    setNotInitialRender(true);
  }, []);

  useEffect(() => {
    if (
      cartRestaurant === "" ||
      cartRestaurant === data?.restaurant?.restaurant_id
    ) {
      setUpdateCount(true);
    } else {
      setUpdateCount(false);
    }
  }, [data]);

  useEffect(() => {
    if (
      cartRestaurant === "" ||
      cartRestaurant === data?.restaurant?.restaurant_id
    ) {
      if (cartData?.items_count > 1 && notInitialrender) {
        updateCart("gg", cartData)
          .then((res) => {
            console.log("updated cart");
          })
          .catch(() => {
            console.log("error");
          });
      }
      if (cartData?.items_count === 1 && notInitialrender) {
        addToCart(cartData)
          .then((res) => {
            console.log("added to cart");
          })
          .catch(() => {
            console.log("error");
          });
      }
    }
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const ClickHandler = (Item, isVeg = true) => {
    if (cartRestaurant === "" || cartRestaurant === data?.restaurant_id) {
      setCartRestaurant(data?.restaurant_id);
      setCartData((prev) => {
        const itemIndex = prev.items.findIndex(
          (item) => item.name === Item.name
        );

        if (itemIndex === -1) {
          return {
            ...prev,
            items: [
              ...prev.items,
              {
                ...Item,
                // mid: Item.mid,
                count: 1,
                // isVeg: isVeg === true ? true : false,
              },
            ],
            billdetails: {
              ...prev.billdetails,
              total: prev.billdetails.total + Number(Item.price),
              item_total: prev.billdetails.item_total + Number(Item.price),
            },
            items_count: prev.items_count + 1,
            restaurant_id: data?.restaurant_data?.restaurant_id,
            restaurant_name: data?.restaurant_data?.name,
          };
        } else {
          const updatedItems = [...prev.items];
          updatedItems[itemIndex] = {
            ...Item,
            ...updatedItems[itemIndex],
            count: updatedItems[itemIndex]?.count + 1,
            isVeg: isVeg === true ? true : false,
          };

          return {
            ...prev,
            items: updatedItems,
            billdetails: {
              ...prev.billdetails,
              total: prev.billdetails.total + Number(Item.price),
              item_total: prev.billdetails.item_total + Number(Item.price),
            },
            items_count: prev.items_count + 1,
            restaurant_id: data?.restaurant_id,
            restaurant_name: data?.restaurant_data?.name,
          };
        }
      });
    }
  };

  return (
    <Box sx={{ width: "800px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "800", m: "15px 0" }}>
        {data?.restaurant_data?.name}
      </Typography>

      <DeliveryDetailsCard
        rating={data?.restaurant_data?.rating}
        type={data?.restaurant_data?.cuisine}
        ratingCount={data?.restaurant_data?.rating_count}
        margin="0 0 50px 0"
      />

      {Object.entries(menu)
        .map(([category, items]) => {
          return {
            category,
            items: Object.entries(items).map(([name, details]) => ({
              name,
              ...details,
            })),
          };
        })
        .map((item) => (
          <Box>
            <Box
              sx={{
                fontSize: "22px",
                fontFamily: '"GilroyMedium", sans-serif',
                m: "15px 0",
                // borderBottom: ".5px solid #d3d3d3",
              }}
            >
              {item?.category}({item?.items?.length})
            </Box>
            {item?.items.map((item) => (
              <MenuItemCard
                key={item.name}
                isVeg={item?.veg_or_non_veg}
                name={item?.name}
                cost={Number(item?.price)}
                rating={item?.rating}
                ratingCount={item?.rating_count}
                description={item?.description}
                clickHandler={() => ClickHandler(item, true)}
                img={item?.img}
                item={item}
                updateCount={updateCount}
              />
            ))}
          </Box>
        ))}
    </Box>
  );
}

export default RestaurantDetails;
