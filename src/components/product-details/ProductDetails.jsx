import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Chip, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Navigate, useNavigate } from "react-router-dom";
import { URL_API } from "../../helpers";
import MedicationIcon from "@mui/icons-material/Medication";

const styleFeature = { fontWeight: 600, fontSize: "16px", fontFamily: "Lato" };

function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={url}
        alt={item.name}
        style={{
          // maxHeight: "100%",
          maxHeight: "350px",

          maxWidth: "100%",
          minHeight: "350px",
          objectFit: "cover",
          alignItems: "center",
          display: "block",
          margin: "auto",
        }}
      />

      {/* <Box sx={{ display: "flex", border: "1px solid", height: "350px" }}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Box> */}
    </div>
  );
}

const Product = (props) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [idChange, setIdChange] = useState("");
  const [role, setRole] = useState(0);

  const productId = useParams().productId;

  useEffect(() => {
    axios
      .get(URL_API + `/admin/product/${productId}`)
      .then((res) => {
        setProduct(res.data.content);
        console.log(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Product Details</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          borderRadius: "20px",
          padding: "50px 75px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row", md: "column" },
            alignSelf: "center",
            justifyContent: "center",
            paddingRight: { xs: 0, sm: 0, md: "40px" },
            width: { xs: "100%", sm: "100%", md: "60%" },
            margin: "auto",
          }}
        >
          <ShowImage item={product} url={`${URL_API}${product.picture}`} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.5rem",
              textTransform: "uppercase",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {product.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={`Category: ${product.category}`}
              size="small"
              sx={{ padding: "0 10px", marginBottom: "20px" }}
            />
          </Stack>
          <Typography
            variant="h2"
            sx={{ fontSize: "20px", marginBottom: "10px" }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="h2"
            sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}
          >
            Rp {product.price}
          </Typography>

          <Stack direction="row" spacing={1}>
            {product.stock * product.volume > 0 ? (
              <Chip
                label={`In stock: ${product.stock * product.volume} ${
                  product.unit
                }`}
                color="primary"
                size="small"
                sx={{ padding: "0 10px", marginBottom: "20px" }}
              />
            ) : (
              <Chip
                label="Out of stock"
                size="small"
                sx={{ padding: "0 10px", marginBottom: "20px" }}
              />
            )}
          </Stack>

          {/* <Box
            sx={{ maxWidth: "400px", display: "flex", marginBottom: "20px" }}
          >
            <TextField
              size="small"
              type="number"
              value={quantity ? quantity : 1}
              variant="outlined"
              inputProps={{
                min: 1,
                max: product.stock * product.volume,
                step: 1,
              }}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              sx={{
                maxWidth: "70px",
                textAlign: "center",
                paddingRight: "10px",
              }}
            />
            <Button variant="contained">Add to cart</Button>
          </Box> */}

          <Divider sx={{ marginBottom: "20px" }} />

          <Grid
            container
            spacing={2}
            sx={{
              alignItems: { xs: "center", sm: "center", md: "flex-end" },
            }}
          >
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <MedicationIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Best Product</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Certified product guarantee
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <MedicalServicesIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Professional Service</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Medical expert service
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <PaymentsIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Easy Payment</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Pay with local bank transfer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <SupportAgentIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Aftersales Support</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  24/7 product aftersales support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
