export function formatOrderData(data: any) {
  const ordersData = data.map((item: any) => ({
    orderId: item.Order.id,
    orderName: item.Order.name,
    orderAddress: item.Order.address,
    orderPhone: item.Order.phone,
    orderStatusId: item.Order.statusId,
    productId: item.Product.id,
    quantity: item.quantity,
    productName: item.Product.name,
    productPrice: item.Product.price,
  }));

  const ordersJSON = ordersData.reduce((result: any, item: any) => {
    const orderId = item.orderId;
    const orderName = item.orderName;
    const orderAddress = item.orderAddress;
    const quantity = item.quantity;
    const productName = item.productName;
    const productPrice = item.productPrice;
    const orderStatusId = item.orderStatusId;

    if (!result[orderId]) {
      result[orderId] = {
        order_id: orderId,
        orderName: orderName,
        orderAddress: orderAddress,
        orderStatusId: orderStatusId,
        products: [],
      };
    }
    result[orderId].products.push({
      productName: productName,
      productPrice: productPrice,
      quantity: quantity,
    });

    return result;
  }, {});
  return Object.values(ordersJSON);
}
