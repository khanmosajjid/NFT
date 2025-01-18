import { readContract, writeContract } from "@wagmi/core";
// Define nftContract with address and ABI
import { config } from "../App";
import ABI from "./nftABI.json";
import { parseEther } from "viem";

const nftContractAddress = "0x2b3edaACb2766eA581A28613bF185cD8f93bA3Bc";

const NFTService = {
  async buyNFT() {
    console.log("this function is called");
    // const nftPrice = 0.01; // 0.01 BNB per NFT
    // const quantity = 1; // Number of NFTs
    // const totalCost = nftPrice * quantity * 1e18;

    try {
      const value = (BigInt(100) * BigInt(1e18)) / 100n; // 1 ETH = 100 NFTs
      console.log("value is---->", value.toString());
      const tx = await writeContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "buyNFT",
        args: [100],
        value: parseEther("0.01"), // Send ETH
      });
      return tx;
    } catch (error) {
      console.error("Error buying NFTs:", error);
      throw error;
    }
  },

  // View NFTs owned by the user
  async getOwnedNFTs(account) {
    if (!account) {
      throw new Error("Account is required to fetch owned NFTs.");
    }
    try {
      const ownedNFTs = await readContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "balanceOf",
        args: [account, 1], // Assuming token ID is 1 for all NFTs
      });
      return ownedNFTs;
    } catch (error) {
      console.error("Error fetching owned NFTs:", error);
      throw error;
    }
  },

  // View all NFTs (including unsold ones)
  async getAllNFTs() {
    try {
      const totalSupply = await readContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "totalSupply",
        args: [1], // Assuming token ID is 1
      });
      return totalSupply;
    } catch (error) {
      console.error("Error fetching all NFTs:", error);
      throw error;
    }
  },

  // Claim ROI NFTs
  async claimMonthlyROI(account) {
    if (!account) {
      throw new Error("Account is required to claim ROI NFTs.");
    }
    try {
      const tx = await writeContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "claimMonthlyROI",
        args: [],
      });
      return tx;
    } catch (error) {
      console.error("Error claiming ROI NFTs:", error);
      throw error;
    }
  },

  // View user's ROI history
  async getROIHistory(account) {
    if (!account) {
      throw new Error("Account is required to fetch ROI history.");
    }
    try {
      const roiHistory = await readContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "getUserDetails",
        args: [account],
      });
      console.log("roi history is------>", roiHistory);
      return roiHistory[1]; // Assuming it returns `monthlyCollections` in the response
    } catch (error) {
      console.error("Error fetching ROI history:", error);
      throw error;
    }
  },

  // Fetch NFT sellable status
  async getSellableNFTs(account) {
    if (!account) {
      throw new Error("Account is required to fetch sellable NFTs.");
    }
    try {
      const sellableNFTs = await readContract(config, {
        address: nftContractAddress,
        abi: ABI,
        functionName: "getUserDetails",
        args: [account],
      });
      return sellableNFTs.sellable; // Assuming it returns `sellable` in the response
    } catch (error) {
      console.error("Error fetching sellable NFTs:", error);
      throw error;
    }
  },
};

export default NFTService;
