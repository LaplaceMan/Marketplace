import React, { useContext, useEffect, useState } from "react";
import { ethers, logger } from 'ethers';
import { NFTStorage, Blob } from "nft.storage";
import { useNavigate } from 'react-router-dom';
import { networks, nftContractABI, nftContractAddress } from '../utils/constants';
import { WalletContext } from "./WalletContext";

export const MarketplaceContext = React.createContext();

const { ethereum } = window;

const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE4ZThFQjVBOTFFYjMzRjJCNTExN0JlODIwRTNEMzZhN0U5MEY5YUQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzcwNDQ1NjcyMCwibmFtZSI6Ik5GVCBNYXJrZXRwbGFjZSJ9.Fr1XcsAseRSZNeF7Nqc6jMyWEjfJ_Cq9RMxcWLKGk1A" })

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(nftContractAddress, nftContractABI, signer);
    const network = await provider.getNetwork();

    marketplaceContract.on("Transfer", (from, to, amount, event) => {
        console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
    });

    return marketplaceContract;
};


export const MarketplaceProvider = ({ children }) => {

    const { currentAccount } = useContext(WalletContext);
    let navigate = useNavigate();

    const [allCollections, setALLCollections] = useState([]);
    const [itemDetails, setItemDetails] = useState({ image: { preview: "", raw: "", visible: false, file: '' }, name: "", extlink: "", description: "", price: "" });
    const [user, setUser] = useState({ name: "", imageURL: "" });
    const [uploadStatus, setUploadStatus] = useState({
        imageUploaded: false,
        metadataUploaded: false,
        transactionApproved: false,
        transactionRejected: false,
        nftListed: false,
        nftCreated: false,
        boughtNFT: false,
        addedToCollection: false,
        collectionCreated: false,
        userCreated: false
    });

    function handleChange(name) {
        setUploadStatus(prevState => ({
            ...prevState,
            [name]: true,
        }));
    }

    const storeImage = async (image) => {
        const fileCid = await client.storeBlob(new Blob([image.file]));
        handleChange("imageUploaded");

        return "https://ipfs.io/ipfs/" + fileCid;
    };


    //storing file and json metadata on IPFS storage
    const storeNFTonIPFS = async () => {

        const fileUrl = await storeImage(itemDetails.image);


        const nftData = {
            "name": itemDetails.name,
            "image": fileUrl,
            "description": itemDetails.description,
            "extlink": itemDetails.extlink
        };

        const metadata = new Blob([JSON.stringify(nftData)], { type: 'application/json' });
        const metadataCid = await client.storeBlob(metadata);
        const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;
        handleChange("metadataUploaded");

        return metadataUrl;

    };

    //Listing the NFT on the market for sale
    const listNFTonMarket = async (tokenId, price, collectionId) => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const marketplaceContract = await getEthereumContract();

            marketplaceContract.createMarketItem(tokenId, price, collectionId).then( async (res) => {
                handleChange("transactionApproved");
                await res.wait();

                handleChange("nftListed");
            }).catch((err) => {
                handleChange("transactionRejected");
            });

        } catch (error) {
            console.log(error);
        }
    };

    const addToCollection = async (tokenId, collectionId) => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const marketplaceContract = await getEthereumContract();

            const hash = await marketplaceContract.addToCollection(tokenId, collectionId);

            await hash.wait();
            handleChange("addedToCollection");

        } catch (error) {
            console.log(error);
        }
    };


    //Creating NFT
    const createItem = async (listNft, collectionId) => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const { price } = itemDetails;
            const marketplaceContract = await getEthereumContract();

            const uri = await storeNFTonIPFS();

            const parsedAmount = price ? ethers.utils.parseEther(price) : ethers.utils.parseEther("0.1");

            marketplaceContract.createToken(uri, parsedAmount, collectionId).then(async (mintHash) => {
                console.log(mintHash);

                handleChange("transactionApproved");
                const rc = await mintHash.wait();

                const event = rc.events.find(event => event.event === 'Transfer');      //getting tokenId value returned from the call
                let [from, to, tokenId] = event.args;
                console.log(from, to, tokenId);

                tokenId = parseInt(tokenId._hex, 16);
                console.log(tokenId);
                handleChange("nftCreated");

                if (listNft) {
                    await listNFTonMarket(tokenId, parsedAmount, collectionId);
                }

                if (collectionId) {
                    await addToCollection(tokenId, collectionId);
                }
            }).catch((err) => {
                console.log(err);
                handleChange("transactionRejected");
            });


        } catch (error) {
            console.log(error);
        }
    };

    const createCollection = async (collection) => {
        console.log(collection);
        if (!ethereum) return alert("Please install Metamask");

        const { name, description, image } = collection;

        const fileUrl = await storeImage(collection.image);

        console.log(fileUrl);

        const marketplaceContract = await getEthereumContract();

        const temp = await marketplaceContract.createCollection(name, description, fileUrl).then(async (res) => {
            handleChange("transactionApproved");
            await res.wait();

            handleChange("collectionCreated");

        }).catch((err) => {
            handleChange("transactionRejected");
        })




    };

    const getAllCollections = async () => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();
        const collections = await marketplaceContract.getAllCollections();

        console.log(collections);
        setALLCollections(collections);

        return collections;

    };

    const getSingleCollection = async (id) => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();
        const collection = await marketplaceContract.getSingleCollection(id);

        console.log(collection);

        return collection;

    };

    const getSingleNFT = async (id) => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();
        const nft = await marketplaceContract.idToSingleItem(id);

        console.log(nft);

        return nft;
    };

    const buyNFT = async (price, id) => {
        const value = ethers.utils.formatEther(price.toString());
        console.log(value);

        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();

        const options = { value: ethers.utils.parseEther(value) };
        console.log(options);
        marketplaceContract.createMarketSale(id, options).then(async (res) => {
            handleChange("transactionApproved");
            await res.wait();
            handleChange("boughtNFT");
        }).catch((err) => {
            console.log(err);
            handleChange("transactionRejected");
        });
    };

    const fetchNFTs = async () => {
        console.log("fetch my nfts");

        try {
            if (!ethereum) return alert("Please install Metamask");

            const marketplaceContract = await getEthereumContract();
            const myNFTs = await marketplaceContract.fetchAllNFTs();

            console.log(myNFTs);

            return myNFTs;
        } catch (error) {

        }
    };

    const checkIfUserCreated = async () => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();
        console.log(currentAccount);
        const data = await marketplaceContract.idToUser(currentAccount);

        console.log(data);
        setUser({
            name: data.name,
            imageURL: data.imageURL
        });
        if (!data.userCreated) {
            navigate('/create/user');
        }
    };

    const createUser = async (user) => {
        console.log(user);
        if (!ethereum) return alert("Please install Metamask");

        const { name } = user;

        const fileUrl = await storeImage(user.image);

        const marketplaceContract = await getEthereumContract();

        marketplaceContract.createUser(name, fileUrl).then(async (res) => {
            handleChange("transactionApproved");
            await res.wait();
            handleChange("userCreated");
        }).catch((err) => {
            console.log(err);
            handleChange("transactionRejected");
        });
    };

    const getUserInfo = async (userAddress) => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();

        const user = await marketplaceContract.idToUser(userAddress);

        console.log("userInfo", user);
        return user;
    };

    const getCollectionInfo = async (collectionId) => {
        if (!ethereum) return alert("Please install Metamask");

        const marketplaceContract = await getEthereumContract();

        const col = await marketplaceContract.idToCollectionData(collectionId);

        console.log("collectionInfo", col, collectionId);
        return col;
    };



    useEffect(() => {
        getAllCollections();
        checkIfUserCreated();
    }, [currentAccount]);


    return (
        <MarketplaceContext.Provider
            value={{
                user,
                itemDetails,
                setItemDetails,
                createItem,
                listNFTonMarket,
                fetchNFTs,
                uploadStatus,
                createCollection,
                allCollections,
                getAllCollections,
                getSingleCollection,
                getSingleNFT,
                buyNFT,
                createUser,
                getUserInfo,
                getCollectionInfo
            }}>
            {children}
        </MarketplaceContext.Provider>
    )
};