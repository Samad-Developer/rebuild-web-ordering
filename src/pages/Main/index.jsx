// src/pages/MainPage.jsx
import React from "react";
import clsx from "clsx";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";

const getItems = (panelStyle) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>just for checking</p>,
    style: panelStyle,
  },
];

const MainPage = () => {
  const loggedIn = false; // Change to false to see the other styles
  const panelStyle = {
    marginBottom: 16,
    background: 'yellow',
    borderRadius: '28px',
    border: "none",
  };
  return (
    <div
      className={clsx(
        "mx-auto p-6 rounded-lg ",
        loggedIn ? "bg-green-500 max-w-5xl" : "bg-red-500 max-w-4xl"
      )}
    >
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: 'black',
        }}
        items={getItems(panelStyle)}
      />
      <h1
        className={clsx(
          "text-4xl font-bold text-center",
          loggedIn ? "text-white" : "text-black"
        )}
      >
        {loggedIn ? "Welcome Back!" : "Welcome to the Main Page"}
      </h1>
      <p className="text-center mt-4">
        {loggedIn ? "We missed you!" : "This is the main page content."}
      </p>
    </div>
  );
};

export default MainPage;
