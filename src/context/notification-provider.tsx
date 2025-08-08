"use client";

import { AlertMessage } from "@/components";
import { AlertType } from "@/components/alert-message/AlertMessage";
import { Box, Container, Slide } from "@mui/material";
import { nanoid } from "nanoid";
import React, { ReactNode, useCallback, useContext } from "react";
import { TransitionGroup } from "react-transition-group";

type Notification = {
  id: string;
  type: AlertType;
  title: string;
  message: string;
};

export interface NotificationAction {
  pushNotification: (m: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
}

const NotificationContext = React.createContext<NotificationAction | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notificationQueue, setNotificationQueue] = React.useState<Notification[]>([]);
  const timerRef = React.useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeNotification: NotificationAction["removeNotification"] = useCallback((id: string) => {
    setNotificationQueue(prev => prev.filter(item => item.id !== id));
    const t = timerRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timerRef.current.delete(id);
    }
  }, []);

  const pushNotification: NotificationAction["pushNotification"] = useCallback(m => {
    const id = nanoid();
    setNotificationQueue(prev => [...prev, { ...m, id }]);

    const t = setTimeout(() => removeNotification(id), 5000);
    timerRef.current.set(id, t);

    return id;
  }, []);

  React.useEffect(
    () => () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current.clear();
    },
    []
  );

  const value: NotificationAction = {
    pushNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Box position={"fixed"} paddingLeft={"280px"} width={"100%"} bottom={12}>
        <Container>
          <TransitionGroup>
            {notificationQueue.map((m, idx) => (
              <Slide key={m.id} direction="left" mountOnEnter unmountOnExit>
                <AlertMessage type={m.type} title={m.title}>
                  {m.message}
                </AlertMessage>
              </Slide>
            ))}
          </TransitionGroup>
        </Container>
      </Box>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("UseNotification should be used within NotificationProvider");
  }

  return context;
};
