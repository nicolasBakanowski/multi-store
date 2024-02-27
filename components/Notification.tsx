import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearNotification } from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [dispatch, message]);

  const notificationStyle = {
    backgroundColor: type === "success" ? "green" : "red",
  };

  return (
    <div
      className={`${
        message ? "block" : "hidden"
      } fixed bottom-0 left-0 right-0 p-4 text-white text-center z-50`}
      style={notificationStyle}
    >
      {message}
    </div>
  );
};

export default Notification;
