import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearNotification } from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearNotification()), 2500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm px-4 py-3 rounded-xl shadow-lg text-white text-sm text-center z-50 ${
        type === "success" ? "bg-verde" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
