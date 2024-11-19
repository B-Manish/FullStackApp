import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Inputfields from "../../components/Inputfields";
// import { useDebounce } from "use-debounce";
import { getAllRestaurants } from "../../api/restaurantApi";

const Search = () => {
  const [data, setData] = useState([]);

  //   const [searchValue] = useDebounce(val, 2000);
  const [val, setVal] = useState("");

  const cancelSearch = () => {
    setVal("");
  };

  useEffect(() => {
    getAllRestaurants({ search: val })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [val]);

  return (
    <Box sx={{ width: "80vw", maxWidth: "860px", paddingTop: "30px" }}>
      <Inputfields
        variant="search"
        value={val || ""}
        onChange={(e) => setVal(e?.target?.value)}
        cancelSearch={cancelSearch}
      />
      <Box sx={{mt:'20px'}}>{val !== "" && data?.map((item) => <>{item?.name}</>)}</Box>
    </Box>
  );
};
export default Search;
