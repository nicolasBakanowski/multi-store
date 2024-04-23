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

  const storePhoneNumber = "5493584379276"; 
  const url = `https://wa.me/${storePhoneNumber}?text=${message}`;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.textContent = "Haga clic aquí para abrir WhatsApp";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
};
