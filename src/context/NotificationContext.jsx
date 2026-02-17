import { createContext, useCallback, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && <div className="toast">{notification}</div>}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
