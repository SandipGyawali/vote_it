"use client";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("SOcket io connection established");
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("hello");
        }}
      >
        <button type="submit">Click for hello event</button>
      </form>
    </main>
  );
}
