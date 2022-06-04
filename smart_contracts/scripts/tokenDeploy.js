const main = async () => {
  const tokensFactory = await hre.ethers.getContractFactory("NFTDungeonToken");
  const tokensContract = await tokensFactory.deploy();

  await tokensContract.deployed();

  console.log("Token address: ", tokensContract.address);
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