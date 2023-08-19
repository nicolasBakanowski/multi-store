import { Product } from "@/interfaces/Products";

export const generateWhatsAppMessage = (cart: Product[]): void => {
  const productsMessage = cart
    .map((product) => {
      return `- ${product.name} cantidad: 1`;
    })
    .join("\n");
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const message = encodeURIComponent(
    `¡Hola! Estoy interesado en sus productos:
        ${productsMessage}
        Precio total: $${totalPrice.toFixed(2)}`
  );
  const storePhoneNumber = "+5493584874137";
  window.open(`https://wa.me/${storePhoneNumber}?text=${message}`);
};
