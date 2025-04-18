"use client"; // Enables interactivity (required for Next.js App Router)

import Link from "next/link";
import { useState } from "react";

interface CategoryProps {
  name: string;
  description: string;
  link: string;
}

export default function CategoryCard({ name, description, link }: CategoryProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          width: "280px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: hovered ? "#e0e0e0" : "#f9f9f9",
          transition: "0.3s",
          cursor: "pointer"
        }}
      >
        <h2 style={{ fontSize: "20px", margin: "10px 0" }}>{name}</h2>
        <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
      </div>
    </Link>
  );
}
