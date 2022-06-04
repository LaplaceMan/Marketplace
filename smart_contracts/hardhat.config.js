require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/jCQbLWYH8JN1exeQJO4b_OZDOMEYiEUU",
      accounts: ['05377321e483630ed83671bb8b6fa053e358ddc33d9d44352e18235bdb00159d'],
    },
  },
};