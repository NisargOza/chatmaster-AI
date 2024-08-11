import React from "react";

export default function H1({ children, classes }) {
  return <h1 className={`text-4xl font-bold ${classes}`}>{children}</h1>;
}
