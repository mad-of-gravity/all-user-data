import { useEffect, useState } from "react";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./App.module.scss";
const { Meta } = Card;

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/users?limit=100");

      if (response.ok) {
        const regUsers = await response.json();
        setRegisteredUsers(...registeredUsers, regUsers.users);
      } else {
        console.error("Error retrieving data..");
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Container}>
      {registeredUsers.map((user) => (
        <Card
          key={user.id}
          style={{
            width: 200,
          }}
          cover={<img alt="example" src={user.image} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta title={user.firstName + " " + user.lastName} description="www.instagram.com" />
        </Card>
      ))}
    </div>
  );
}

export default App;
