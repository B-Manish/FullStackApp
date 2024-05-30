import api from "./customAxios";

export const getAllRestaurants = () => {
  return api.get(`http://localhost:8000/get_restaurants`).then((payload) => {
    return payload;
  });
};

export const getRestaurantData = (restaurantId) => {
  return api
    .get(`http://localhost:8000/get_restaurant_details/${restaurantId}`)
    .then((payload) => {
      return payload;
    });
};
