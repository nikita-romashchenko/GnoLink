import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useWalletConnect } from "@/hooks/use-wallet-connect";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useProvider, useAccount, useAppKit } from "@reown/appkit-react-native";
import { BrowserProvider, formatEther } from "ethers";

export function WalletConnect() {
  const { address, isConnecting, isConnected, connect, disconnect } = useWalletConnect();
  const { open: openModal } = useAppKit();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { provider } = useProvider();
  const { chainId } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      if (isConnected && address && provider) {
        setIsLoadingBalance(true);
        try {
          const ethersProvider = new BrowserProvider(provider);
          const balanceWei = await ethersProvider.getBalance(address);
          const balanceFormatted = formatEther(balanceWei);
          setBalance(balanceFormatted);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          setBalance(null);
        } finally {
          setIsLoadingBalance(false);
        }
      } else {
        setBalance(null);
      }
    }

    fetchBalance();
  }, [isConnected, address, provider, chainId]);

  if (isConnected && address) {
    // Show wallet info + disconnect button
    return (
      <View style={[styles.container, { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" }]}>
        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#999" : "#666" }]}>
            Connected Wallet
          </Text>
          <Text style={[styles.address, { color: isDark ? "#fff" : "#000" }]}>
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </Text>
          <Text style={[styles.fullAddress, { color: isDark ? "#666" : "#999" }]}>
            {address}
          </Text>

          {/* Chain Info */}
          <View style={styles.balanceContainer}>
            <Text style={[styles.label, { color: isDark ? "#999" : "#666", marginTop: 8 }]}>
              Network
            </Text>
            <View style={styles.chainRow}>
              <Text style={[styles.chainInfo, { color: isDark ? "#fff" : "#000" }]}>
                {chainId === 100 ? "Gnosis Chain" : chainId === 1 ? "Ethereum" : `Chain ${chainId}`}
              </Text>
              {chainId !== 100 && (
                <TouchableOpacity
                  style={styles.switchButton}
                  onPress={() => openModal({ view: "Networks" })}
                >
                  <Text style={styles.switchButtonText}>Switch Network</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Balance Display */}
          <View style={styles.balanceContainer}>
            <Text style={[styles.label, { color: isDark ? "#999" : "#666", marginTop: 8 }]}>
              Balance
            </Text>
            {isLoadingBalance ? (
              <ActivityIndicator size="small" color={isDark ? "#fff" : "#000"} />
            ) : balance ? (
              <Text style={[styles.balance, { color: isDark ? "#fff" : "#000" }]}>
                {parseFloat(balance).toFixed(5)} {chainId === 100 ? "xDAI" : "ETH"}
              </Text>
            ) : (
              <Text style={[styles.balance, { color: isDark ? "#666" : "#999" }]}>
                --
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.disconnectButton]}
          onPress={disconnect}
        >
          <Text style={styles.disconnectButtonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show connect button
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.connectButton,
        { backgroundColor: isDark ? "#007AFF" : "#007AFF" },
      ]}
      onPress={connect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.connectButtonText}>Connect Wallet</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoSection: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  address: {
    fontSize: 24,
    fontWeight: "bold",
  },
  fullAddress: {
    fontSize: 10,
    fontFamily: "monospace",
  },
  balanceContainer: {
    marginTop: 4,
  },
  chainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  chainInfo: {
    fontSize: 14,
    fontWeight: "500",
  },
  switchButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  switchButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  balance: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  connectButton: {
    backgroundColor: "#007AFF",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disconnectButton: {
    backgroundColor: "#FF3B30",
  },
  disconnectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
