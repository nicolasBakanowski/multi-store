import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

const CartIcon = () => {
    const cartItems = useSelector((state: RootState) => state.cart.length);
    const controls = useAnimation();
    const pulseControls = useAnimation();
    const [iconColor, setIconColor] = useState("#FFFFFF");

    useEffect(() => {
        const animateIcon = async () => {
            if (cartItems > 0) {
                await controls.start({
                    scale: 1.3,
                    transition: { duration: 0.2, yoyo: Infinity, ease: "easeInOut" }
                });
                controls.start({ scale: 1 });
                setIconColor("#FFD700");

                pulseControls.start({
                    scale: [1, 1.5],
                    opacity: [0.7, 0],
                    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                });
            } else {
                controls.stop();
                pulseControls.stop();
                setIconColor("#FFFFFF");
            }
        };

        animateIcon();
    }, [cartItems, controls, pulseControls]);

    return (
        <Link href="/cart">
            <div className="relative">
                {cartItems > 0 && (
                    <motion.div
                        animate={pulseControls}
                        className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full bg-blue-500 opacity-50 filter blur-xl"
                    />
                )}
                <motion.div
                    animate={controls}
                    className="text-2xl font-bold flex items-center space-x-1 z-10 relative">
                    <MdShoppingCart size={25} color={iconColor} />
                    <span className="text-xl">{cartItems}</span>
                </motion.div>
            </div>
        </Link>
    );
};

export default CartIcon;
