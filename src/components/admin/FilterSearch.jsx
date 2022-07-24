import * as React from "react";

import { TextField } from "@mui/material";

export default function FilterSearch({ setSearchQuery }) {
  // const [search, setSearch] = useState("");

  return (
    <TextField
      // placeholder="Search..."
      onChange={(event) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
      }}
      sx={{
        position: "relative",
        borderRadius: "10px",
        marginLeft: 0,
      }}
      size="small"
      label="Search..."
      variant="outlined"
    />
  );
}
