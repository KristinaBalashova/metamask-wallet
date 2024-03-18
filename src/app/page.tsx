'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Header from './components/Header/Header';
import { MetaMaskError } from './components/MetaMaskError/MetaMaskError';
import MainSection from './components/MainSection/MainSection';
import { MetaMaskContextProvider } from '../hooks/useMetaMask';

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className={styles.main}>
        <Header />
        <MainSection />
        <MetaMaskError />
      </main>
    </MetaMaskContextProvider>
  );
}
