import * as React from "react";
import { useState } from "react";

import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Divider,
  SwipeableDrawer,
} from "@mui/material";

export default function SortDrawer({ sort, setSort }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [sortBy, setSortBy] = useState("");
  const [sequence, setSequence] = useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      // event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    // console.log(event.target.value);
  };

  const handleSequence = (event) => {
    setSequence(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button
          onClick={toggleDrawer("right", true)}
          variant="outlined"
          sx={{ marginRight: "10px" }}
        >
          Sort
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              <ListItem key={1} disablePadding>
                <ListItemButton>
                  <Typography sx={{ fontWeight: "800" }}>Sort By</Typography>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <FormControl sx={{ marginLeft: "20px" }}>
                <RadioGroup
                  aria-labelledby="sortBy"
                  name="sortBy"
                  onChange={handleSort}
                  value={sortBy ? sortBy : sort.property}
                >
                  <FormControlLabel
                    value="name"
                    control={<Radio />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="price"
                    control={<Radio />}
                    label="Price"
                  />

                  <FormControlLabel
                    value="stock"
                    control={<Radio />}
                    label="Stock in Package"
                  />
                  <FormControlLabel
                    value="stock_in_unit"
                    control={<Radio />}
                    label="Stock in Unit"
                  />
                </RadioGroup>
              </FormControl>
            </List>
            <Divider />
            <List>
              <FormControl sx={{ marginLeft: "20px" }}>
                <RadioGroup
                  aria-labelledby="sequence"
                  value={sequence ? sequence : sort.order}
                  name="sequence"
                  onChange={handleSequence}
                >
                  <FormControlLabel
                    value="desc"
                    control={<Radio />}
                    label="Descending"
                  />
                  <FormControlLabel
                    value="asc"
                    control={<Radio />}
                    label="Ascending"
                  />
                </RadioGroup>
              </FormControl>
            </List>

            <Button
              variant="contained"
              sx={{ marginLeft: "20px" }}
              onClick={() => {
                setState({ ...state, right: false });
                setSort({ property: sortBy, order: sequence });
              }}
              disabled={sortBy && sequence ? false : true}
            >
              Submit
            </Button>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
