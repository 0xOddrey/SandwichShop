import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Token from "./Components/Token";



export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
      </Route>
      <Route path="/token/meta/:tokenId" element={<Token />}>
      </Route>
    </ Routes>
  );
}
