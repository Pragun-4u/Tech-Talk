"use client";
import Image from "next/image";
import bg from "../public/assets/images/error404.gif";

export default function custom404() {
  const theme = localStorage.getItem("theme");
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden", // Ensure the image does not overflow the viewport
        background: theme === "dark" ? "black" : "white", // Optional: Set background color for the remaining area
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <Image
          src={bg}
          alt="Error 404"
          layout="fill" // Fill the entire container
          objectFit="contain" // Fit the entire image within the container
          objectPosition="center" // Center the image within the container
        />
      </div>
    </div>
  );
}
