// Notification.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearNotification } from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => {
          dispatch(clearNotification());
        },
        notification.type === "success" ? 3000 : 5000
      ); // Tiempo de duración personalizado

      return () => clearTimeout(timer);
    }
  }, [dispatch, notification]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 text-white text-center z-50 ${
        notification.message
          ? notification.type === "success"
            ? "bg-green-500"
            : "bg-red-500"
          : "hidden"
      }`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
