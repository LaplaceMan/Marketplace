const main = async () => {
  const nftMarketplaceFactory = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplaceContract = await nftMarketplaceFactory.deploy();

  await nftMarketplaceContract.deployed();

  console.log("NftMarketplace contract address: ", nftMarketplaceContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();