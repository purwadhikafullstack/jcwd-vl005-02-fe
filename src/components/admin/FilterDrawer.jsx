import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { URL_API } from "../../helpers";

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

export default function FilterDrawer({
  categoryFilterSelected,
  setCategoryFilterSelected,
}) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productCategories, setProductCategories] = useState([]);

  ////////////////////////////
  // CATEGORY DATA FETCHING //
  ////////////////////////////

  useEffect(() => {
    let fetchUrl = `${URL_API}/admin/categories`;
    //  ?page=${page + 1}&limit=${rowsPerPage};

    // console.log(fetchUrl);
    axios
      .get(fetchUrl)
      .then((res) => {
        setProductCategories(() => res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
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
          Filter
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
                  <Typography sx={{ fontWeight: "800" }}>
                    Filter by Category
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <List>
              <FormControl sx={{ marginLeft: "20px" }}>
                <RadioGroup
                  aria-labelledby="categoryFilter"
                  // defaultValue={
                  //   categoryFilter ? categoryFilter : categoryFilterSelected
                  // }
                  name="categoryFilter"
                  onChange={handleCategoryFilter}
                >
                  {productCategories.map((c, index) => {
                    return (
                      <FormControlLabel
                        value={c.id}
                        control={<Radio />}
                        label={c.name}
                        key={index}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </List>

            <Button
              variant="contained"
              sx={{ marginLeft: "20px" }}
              onClick={() => {
                setState({ ...state, right: false });
                setCategoryFilterSelected(categoryFilter);
              }}
              disabled={categoryFilter ? false : true}
            >
              Submit
            </Button>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
