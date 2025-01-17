/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './components/header/Header'

import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom';
import Profile from './components/pages/profile/Profile'
import Main from './components/pages/landing/Main';
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  polygonMumbai,
  bscTestnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const config = getDefaultConfig({
  appName: "NFT",
  projectId: "1ade470e0a2103b5f8113ed21f634435",
  chains: [bscTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

function App() {

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
  

export default App
