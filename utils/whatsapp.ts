// utils/whatsapp.ts
import { CartItem } from "@/interfaces/Cart";

export const generateWhatsAppMessage = (
  cart: CartItem[],
  totalAmount: number
): void => {
  const productsMessage = cart
    .map((product) => {
      return `- ${product.name} cantidad: ${product.quantity}`;
    })
    .join("\n");

  const message = encodeURIComponent(
    `¡Hola! Estoy interesado en sus productos:\n${productsMessage}\nPrecio total: $${totalAmount.toFixed(
      2
    )}`
  );

  const storePhoneNumber = "5493584379276"; // Remove the "+" from the phone number
  const url = `https://wa.me/${storePhoneNumber}?text=${message}`;

  window.open(url, "_blank");
};
