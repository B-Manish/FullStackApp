export const getrestaurantdata = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/get_restaurants");
    const data = await response.json();
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_FAILURE", payload: error.message });
  }
};
