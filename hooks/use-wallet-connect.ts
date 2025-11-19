import { useAppKit, useAccount } from "@reown/appkit-react-native";

export function useWalletConnect() {
  const { open, disconnect } = useAppKit();
  const { address, isConnected, status } = useAccount();

  const connect = async () => {
    try {
      // Open AppKit modal - this will show wallet options including MetaMask
      open();
    } catch (error) {
      console.error("Failed to open wallet modal:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return {
    address: address || null,
    isConnecting: status === "connecting",
    isConnected,
    connect,
    disconnect: handleDisconnect,
  };
}
