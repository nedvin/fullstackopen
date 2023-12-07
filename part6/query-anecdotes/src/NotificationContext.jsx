import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[1];
};
