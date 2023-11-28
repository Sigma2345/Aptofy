import '../styles/globals.css'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
function MyApp({ Component, pageProps }) {
  const getwallets = [new PetraWallet()];
  return <AptosWalletAdapterProvider
    plugins={getwallets}
    autoConnect={true}
  >
    <Component {...pageProps} />
  </AptosWalletAdapterProvider>
}

export default MyApp
