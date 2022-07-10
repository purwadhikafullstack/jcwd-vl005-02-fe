function checkout(user_address_id) {
  // get user id
  const user_id = getUserId();

  // get cart items
  const cart_items_joined_with_product = cartService.getCart(user_id, {
    includeProduct: true,
  });

  // get address
  const address = addressService.getAddressByID(user_address_id);

  let total_price = 0;
  const invoice_details = cart_items_joined_with_product.map((item) => {
    total_price += item.amount * item.product.price_per_unit;
    return {
      product_id: item.product_id,
      amount: item.amount,
      unit: item.product.unit,
      price_per_unit: item.product.price_per_unit,
    };
  });

  const invoice = {
    code: generateCode(),
    user_id,
    date: new Date(),
    status: "CREATED",
    total_payment: total_price,
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
  };

  // save invoice to DB
  const id = invoiceService.create(invoice);

  for (let i = 0; i < invoice_details.length; i++) {
    invoice_details[i].invoice_id = id;
  }
  // save details to DB
  invoiceService.createDetails(invoice_details);

  return invoice;
}
