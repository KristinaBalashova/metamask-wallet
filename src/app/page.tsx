"use client";
import Image from 'next/image';
import styles from './page.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
import { MetaMaskContextProvider } from '../hooks/useMetaMask';

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className={styles.main}>
        <Header />
        <MainSection />
        <Footer />
      </main>
    </MetaMaskContextProvider>
  );
}
