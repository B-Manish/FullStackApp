import api from "./customAxios";

export const getAllRestaurants = (category, search) => {
  return api
    .get(
      `http://localhost:8000/getAllRestaurants${
        category ? `?category=${category}` : ""
      }${search ? `&search=${search}` : ""}`
    )
    .then((payload) => {
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

export const updateCart = (username, bodyParams) => {
  return api
    .put(`http://localhost:8000/cart/${username}`, bodyParams)
    .then((payload) => {
      return payload;
    });
};

export const addToCart = (bodyParams) => {
  return api
    .post(`http://localhost:8000/addToCart`, bodyParams)
    .then((payload) => {
      return payload;
    });
};

export const getOrders = (page = 1, count = 10) => {
  return api
    .get(`http://localhost:8000/getAllOrders?page=${page}&count=${count}`)
    .then((payload) => {
      return payload;
    });
};

export const getCategories = () => {
  return api.get(`http://localhost:8000/getCategories`).then((payload) => {
    return payload;
  });
};
