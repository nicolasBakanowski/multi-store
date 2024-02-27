import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearNotification } from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.notification.message
);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [dispatch, error]);

  return (
    <div
      className={`${
        error ? "bg-red-500" : "hidden"
      } fixed bottom-0 left-0 right-0 p-4 text-white text-center z-50`}
    >
      {error}
    </div>
  );
};

export default Notification;
