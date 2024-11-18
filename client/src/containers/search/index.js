import React, { useState } from "react";
import { Box } from "@mui/material";
import Inputfields from "../../components/Inputfields";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  //   const [searchValue] = useDebounce(val, 2000);

  const cancelSearch = () => {
    setVal("");
  };

  return (
    <Box sx={{ width: "80vw", maxWidth: "860px" }}>
      <Inputfields
        variant="search"
        value={val || ""}
        onChange={(e) => setVal(e?.target?.value)}
        cancelSearch={cancelSearch}
      />
      {val !== "" && data?.map((item) => <>gg</>)}
    </Box>
  );
};
export default Search;
