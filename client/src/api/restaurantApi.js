import api from "./customAxios";

export const getAllRestaurants = () => {
  return api.get(`http://localhost:8000/getAllRestaurants`).then((payload) => {
    return payload;
  });
};

export const getRestaurantDetails = (restaurant_id) => {
  return api
    .get(`http://localhost:8000/getRestaurant/${restaurant_id}`)
    .then((payload) => {
      return payload;
    });
};

export const getCartDetails = (cart_id) => {
  return api
    .get(`http://localhost:8000/getCartDetails/${cart_id}`)
    .then((payload) => {
      return payload;
    });
};

export const getLambdaapi = () => {
  return api
    .get(`https://csq3luyxzc.execute-api.us-east-1.amazonaws.com/prod/testapi`)
    .then((payload) => {
      return payload;
    });
};
