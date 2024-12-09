import api from "./customAxios";

export const getAllRestaurants = (bodyParameters) => {
  let url = `https://b54wrr1x44.execute-api.us-east-1.amazonaws.com/prod/getAllRestaurants?city=${bodyParameters.city}`;

  if (bodyParameters?.rating) {
    url += `&rating=${bodyParameters.rating}`;
  }

  if (bodyParameters?.cuisine) {
    url += `&cuisine=${bodyParameters.cuisine}`;
  }

  return api.get(url).then((payload) => {
    return payload;
  });
};

export const getRestaurantDetails = (bodyParameters) => {
  let url = `https://b54wrr1x44.execute-api.us-east-1.amazonaws.com/prod/getRestaurant?restaurantId=${bodyParameters.restaurantId}&city=${bodyParameters.city}`;

  if (bodyParameters?.foodType) {
    url += `&foodType=${bodyParameters.foodType}`;
  }
  return api.get(url).then((payload) => {
    return payload;
  });
};

export const getAdresses = (email) => {
  let url = `http://localhost:8000/getAddresses/${email}`;

  return api.get(url).then((payload) => {
    return payload;
  });
};

// export const getAllRestaurants = (bodyParameters) => {
//   return api
//     .get(`http://localhost:8000/getAllRestaurants`, {
//       params: {
//         category: bodyParameters?.category,
//         search: bodyParameters?.search,
//         isVeg: bodyParameters?.isVeg,
//       },
//     })
//     .then((payload) => {
//       return payload;
//     });
// };

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
