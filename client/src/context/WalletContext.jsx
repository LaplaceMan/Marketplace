import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress, networks } from '../utils/constants';

export const WalletContext = React.createContext();

const { ethereum } = window;


export const WalletProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [isChainValid, setIsChainValid] = useState(false);

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount("");
                }
            });
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object.");
        }
    }


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object.");
        }

        console.log(currentAccount);
    };

    const changeNetwork = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            console.log(networks);
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: networks.mumbai_testnet.chainId,
                    chainName: networks.mumbai_testnet.chainName,
                    rpcUrls: networks.mumbai_testnet.rpcUrls
                }]
            });

            setIsChainValid(true);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        checkIfWalletIsConnected();
        addWalletListener();
        const networkId = window.ethereum.networkVersion;
        const chainValid = parseInt(networkId) === networks.mumbai_testnet.networkId ? true : false;

        setIsChainValid(chainValid);

        window.ethereum.on("chainChanged", (chainId) => {
            console.log("netowrk changed", chainId);
            
            const networkId = window.ethereum.networkVersion;
            const chainValid = parseInt(networkId) === networks.mumbai_testnet.networkId ? true : false;

            setIsChainValid(chainValid);
        });
    }, []);


    return (
        <WalletContext.Provider value={{ connectWallet, currentAccount, isChainValid, changeNetwork }}>
            {children}
        </WalletContext.Provider>
    )
}