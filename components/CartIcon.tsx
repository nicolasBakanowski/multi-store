import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { MdShoppingCart } from "react-icons/md";

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const controls = useAnimation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (cartItems > 0) {
      setActive(true);
      controls.start({
        scale: [1, 1.25, 1],
        transition: { duration: 0.3, ease: "easeOut" },
      });
    } else {
      setActive(false);
      controls.start({ scale: 1 });
    }
  }, [cartItems, controls]);

  return (
    <div className="relative flex items-center gap-1.5">
      <motion.div animate={controls}>
        <MdShoppingCart
          size={24}
          color={active ? "#E8952A" : "rgba(247,241,232,0.8)"}
          className="transition-colors duration-300"
        />
      </motion.div>
      {cartItems > 0 && (
        <span className="text-sm font-semibold tabular-nums text-vb-ambar">
          {cartItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
