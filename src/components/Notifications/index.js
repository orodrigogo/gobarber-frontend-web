import React, { useState, useEffect, useMemo } from "react";
import { MdNotifications } from "react-icons/md";
/*
  parseISO converte uma data em texto para o tipo de data do JavaScript.
  formatDistance, para calcular a distancia entre duas datas. Por exemplo, à 5 minutos atrás.
  */
import { parseISO, formatDistance } from "date-fns";
// pt para formatar as datas em pt-br.
import pt from "date-fns/locale/pt";
import api from "~/services/api";

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll
} from "./styles";

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // useMemo mais performatico para escutar quando um estado muda para fazer algum calculo ou verificacao.
  const hasUnread = useMemo(
    // Ao utilizar !! estamos dizendo que o retorno deve ser Boolean (true ou false)
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    // Criamos uma função só para conseguir usar o async await, pois no effect não permite.
    async function loadNotifications() {
      const response = await api.get("notifications");

      // Percorremos o data de responde para remontar uma lista agora cocm o time Distance.
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: "true", // addSuffix coloca o há dias atras... por exemplo.
            locale: pt
          }
        )
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
