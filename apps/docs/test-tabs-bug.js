const React = require("react");

const children = [
  React.createElement("div", { tabKey: "overview" }),
  React.createElement("div", { key: "analytics", tabKey: "analytics" }),
];

const childrenArray = React.Children.toArray(children);
console.log(childrenArray.map((child) => child.key));
