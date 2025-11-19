import "@walletconnect/react-native-compat";

import { createAppKit } from "@reown/appkit-react-native";
import { EthersAdapter } from "@reown/appkit-ethers-react-native";
import { mainnet, polygon, arbitrum, gnosis } from "viem/chains";
import { storage } from "./storage";

// Project ID from WalletConnect Cloud
export const projectId = "6bc2b2352bb63a386210278ed3e701fa";

// Create Ethers adapter
const ethersAdapter = new EthersAdapter();

// App metadata
const metadata = {
  name: "GnoLink",
  description: "GnoLink Wallet Connection",
  url: "https://gnolink.app",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "gnolink://",
  },
};

// Create and export AppKit instance
export const appKit = createAppKit({
  projectId,
  metadata,
  networks: [mainnet, polygon, arbitrum, gnosis],
  adapters: [ethersAdapter],
  storage,
  features: {
    analytics: false, // Disable to avoid synthetic event errors
  },
});
