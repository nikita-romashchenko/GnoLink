import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { useProvider, useAccount } from "@reown/appkit-react-native";
import { BrowserProvider, parseEther } from "ethers";

export function WalletGenerator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { provider } = useProvider();
  const { address: connectedAddress, isConnected, chainId } = useAccount();

  const [newWallet, setNewWallet] = useState<{ address: string; privateKey: string } | null>(null);
  const [amount, setAmount] = useState("0.001");
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const generateWallet = () => {
    // Generate a new private key
    const privateKey = generatePrivateKey();
    // Get the account from the private key
    const account = privateKeyToAccount(privateKey);

    setNewWallet({
      address: account.address,
      privateKey: privateKey,
    });
    setTxHash(null);
  };

  const sendTokens = async () => {
    if (!newWallet || !provider || !connectedAddress || chainId !== 100) {
      alert("Please connect to Gnosis Chain and generate a wallet first");
      return;
    }

    setIsSending(true);
    try {
      const ethersProvider = new BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Create transaction
      const tx = await signer.sendTransaction({
        to: newWallet.address,
        value: parseEther(amount),
      });

      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      await tx.wait();
      alert("Transaction confirmed!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed: " + (error as Error).message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Wallet Generator
      </Text>

      {/* Generate Wallet Button */}
      {!newWallet ? (
        <TouchableOpacity
          style={[styles.button, styles.generateButton]}
          onPress={generateWallet}
        >
          <Text style={styles.buttonText}>Generate New Wallet</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.walletInfo}>
          {/* New Wallet Address */}
          <View style={[styles.infoBox, { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" }]}>
            <Text style={[styles.label, { color: isDark ? "#999" : "#666" }]}>
              New Wallet Address
            </Text>
            <Text
              selectable
              style={[styles.address, { color: isDark ? "#fff" : "#000" }]}
            >
              {newWallet.address}
            </Text>
          </View>

          {/* Private Key */}
          <View style={[styles.infoBox, styles.warningBox]}>
            <Text style={[styles.label, styles.warningLabel]}>
              ⚠️ Private Key (Keep Secret!)
            </Text>
            <Text
              selectable
              style={[styles.privateKey, { color: "#333" }]}
            >
              {newWallet.privateKey}
            </Text>
          </View>

          {/* Send Tokens Section */}
          {isConnected && chainId === 100 && (
            <View style={[styles.infoBox, { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" }]}>
              <Text style={[styles.label, { color: isDark ? "#999" : "#666" }]}>
                Send xDAI to New Wallet
              </Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: isDark ? "#1a1a1a" : "#fff",
                  color: isDark ? "#fff" : "#000",
                }]}
                value={amount}
                onChangeText={setAmount}
                placeholder="Amount (xDAI)"
                placeholderTextColor={isDark ? "#666" : "#999"}
                keyboardType="decimal-pad"
              />
              <TouchableOpacity
                style={[styles.button, styles.sendButton]}
                onPress={sendTokens}
                disabled={isSending}
              >
                {isSending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send {amount} xDAI</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Transaction Hash */}
          {txHash && (
            <View style={[styles.infoBox, { backgroundColor: isDark ? "#1a4d1a" : "#d4edda" }]}>
              <Text style={[styles.label, { color: isDark ? "#90ee90" : "#155724" }]}>
                ✓ Transaction Sent
              </Text>
              <Text style={[styles.txHash, { color: isDark ? "#90ee90" : "#155724" }]}>
                {txHash}
              </Text>
            </View>
          )}

          {/* Generate Another Button */}
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={generateWallet}
          >
            <Text style={styles.buttonText}>Generate Another</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  generateButton: {
    backgroundColor: "#28a745",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  walletInfo: {
    gap: 12,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  warningBox: {
    backgroundColor: "#fff3cd",
    borderWidth: 2,
    borderColor: "#ffc107",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  warningLabel: {
    color: "#856404",
  },
  address: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  privateKey: {
    fontSize: 10,
    fontFamily: "monospace",
    lineHeight: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  txHash: {
    fontSize: 10,
    fontFamily: "monospace",
  },
});
