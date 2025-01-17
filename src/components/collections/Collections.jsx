/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import gradientBg from "../../assets/img/gradient_light.jpg";
import collectionData from "../../assets/json/Collection";
import buyNftData from "../../assets/json/Buynft";
import NFTService from "../../services/nftService";
import { useAccount } from "wagmi";

const Collections = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [ownedNfts, setOwnedNfts] = useState([]); // Store owned NFTs
  const [monthlyCollections, setMonthlyCollections] = useState([]); // Store monthly NFT collections
  const [combinedData, setCombinedData] = useState([]); // Store combined data for tab1
  const { address: account } = useAccount();
  console.log("address is----->", account);

  useEffect(() => {
    if (account) {
      const fetchOwnedNfts = async () => {
        let nftCount = await NFTService.getOwnedNFTs(account);
        const userOwnedNfts = buyNftData.slice(0, parseInt(nftCount.toString())); // Get only the number of NFTs owned by the user
        setOwnedNfts(userOwnedNfts);
      };

      const fetchMonthlyCollections = async () => {
        try {
          let roiHistory = await NFTService.getROIHistory(account);
          const totalMonthlyCount = roiHistory.reduce(
            (total, monthData) => total + monthData.count,
            0
          ); // Calculate total NFTs in monthly collections
          const userMonthlyCollections = buyNftData.slice(0, totalMonthlyCount); // Get data based on total count
          setMonthlyCollections(userMonthlyCollections);
        } catch (error) {
          console.error("Error fetching monthly collections:", error);
        }
      };

      const fetchCombinedData = async () => {
        let nftCount = await NFTService.getOwnedNFTs(account);
        let roiHistory = await NFTService.getROIHistory(account);
        console.log("roi history is",roiHistory);
        const totalMonthlyCount = roiHistory?.reduce(
          (total, monthData) => total + monthData.count,
          0
        );
        console.log("total monthly count",totalMonthlyCount)
        const totalCount = parseInt(nftCount.toString()); 
        // const totalCount = parseInt(nftCount.toString()) + totalMonthlyCount?totalMonthlyCount:0; // Combine counts from both sources
        const combinedNfts = buyNftData.slice(0, totalCount); // Get combined data
        console.log("total count",totalCount);
        setCombinedData(combinedNfts);
      };

      fetchOwnedNfts();
      fetchMonthlyCollections();
      fetchCombinedData();
    }
  }, [account]);

  const renderCards = (data) => (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex rounded-2.5xl border border-jacarta-100 bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700"
        >
          <figure className="mr-4 shrink-0">
            <a href="#" className="relative block">
              <img
                src={item.img}
                alt={item.title}
                className="rounded-2lg"
                loading="lazy"
              />
              <div className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-2/4 items-center justify-center rounded-full border-2 border-white bg-jacarta-700 text-xs text-white dark:border-jacarta-600">
                {item.id}
              </div>
              <div className="absolute -left-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                </svg>
              </div>
            </a>
          </figure>
          <div>
            <a href="#" className="block">
              <span className="font-display font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                {item.title}
              </span>
            </a>
            <span className="text-sm dark:text-jacarta-300">
              {item.rateprice}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Top Collections  */}
      <section className="relative py-24  dark:bg-jacarta-900" id="collection">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src={gradientBg} alt="gradient" className="h-full w-full" />
        </picture>
        <div className="container">
          <div className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <h2 className="inline">Top collections over</h2>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between">
            <ul className="flex flex-wrap items-center">
              {["tab1", "tab2", "tab3"].map((tab, index) => (
                <li
                  key={tab}
                  className={`my-1 mr-2.5 tab ${
                    activeTab === tab
                      ? "bg-accent text-white"
                      : "bg-white text-jacarta-500"
                  } rounded-lg px-4 py-2 cursor-pointer
                                group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
                  onClick={() => setActiveTab(tab)}
                >
                  {index === 0 && "All"}
                  {index === 1 && "Buy NFT"}
                  {index === 2 && "Monthly Collections"}
                </li>
              ))}
            </ul>
          </div>
          {activeTab === "tab1" && renderCards(combinedData)}
          {activeTab === "tab2" && renderCards(ownedNfts)}
          {activeTab === "tab3" && renderCards(monthlyCollections)}
          <div className="mt-10 text-center">
            <a
              href="#"
              className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Go to Rankings
            </a>
          </div>
        </div>
      </section>
      {/* end top collections  */}
    </>
  );
};

export default Collections;
