import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Homepage from "./components/Homepage"
import Token from "./components/Token"


export default function Home() {
  
  return (
    <>
      <Routes>
          <Route path="/" element={<Homepage />}>
          </Route>
          <Route path="/token/meta/:tokenId" element={<Token />}>
          </Route>
      </Routes>
    </>
  );
}
