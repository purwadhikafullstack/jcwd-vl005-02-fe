import { Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { URL_API } from "../../helpers";
import axios from "axios";
import BestSellerCard from "./BestSellerCard";

function BestSeller() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  useEffect(() => {
    let fetchUrl = `${URL_API}/user/products/best-seller`;

    axios
      .get(fetchUrl)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"header header"
        "best best"
        "second third"
        "fourth fifth"`,
        md: `"header header header"
        "best second third"
        "best fourth fifth"`,
      }}
      gridTemplateRows={{
        base: "70px 2fr 1fr 1fr",
        md: "70px 0.5fr 0.5fr",
      }}
      gridTemplateColumns={{ base: "45vw 45vw", md: "25vw 25vw 25vw" }}
      h={{ base: "600px", md: "500px" }}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      px={20}
      mt={{ base: "40", md: "2" }}
      mb={{ base: "40", md: "40" }}
      w="800px"
    >
      <GridItem pl="2" area={"header"} textAlign="center">
        <Text
          as={"span"}
          position={"relative"}
          _after={{
            content: "''",
            width: "full",
            height: "20%",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "red.400",
            zIndex: -1,
          }}
          fontSize="3xl"
          fontWeight={600}
          color="black"
        >
          Best-Seller
        </Text>
      </GridItem>
      <GridItem pl="2" area={"best"}>
        {data.length && <BestSellerCard product={data[0]} />}
      </GridItem>

      <GridItem pl="2" area={"second"}>
        {data.length && <BestSellerCard product={data[1]} />}
      </GridItem>
      <GridItem pl="2" area={"third"}>
        {data.length && <BestSellerCard product={data[2]} />}
      </GridItem>
      <GridItem pl="2" area={"fourth"}>
        {data.length && <BestSellerCard product={data[3]} />}
      </GridItem>
      <GridItem pl="2" area={"fifth"}>
        {data.length && <BestSellerCard product={data[4]} />}
      </GridItem>
    </Grid>
  );
}

export default BestSeller;
