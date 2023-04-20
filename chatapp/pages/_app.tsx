import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Analytics />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
