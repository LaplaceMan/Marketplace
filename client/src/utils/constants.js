import abi from './NFTDungeonToken.json';
import output from "./NFTMarketplace.json";


export const contractABI = abi.abi;
export const nftContractABI = output.output.abi;
export const contractAddress = '0xC9C8640083De6b77b909E3Fc339FC0a45C9487f3';
export const nftContractAddress = '0xdde60705ec784a87e01dd3ad91c43532b777b6fd';

export const networks = {
    mumbai_testnet: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet Mumbai",
        rpcUrls: [
            "https://matic-mumbai.chainstacklabs.com",
            "https://rpc-mumbai.maticvigil.com",
            "https://matic-testnet-archive-rpc.bwarelabs.com"
        ],
        faucets: [
            "https://faucet.polygon.technology/"
        ],
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        infoURL: "https://polygon.technology/",
        shortName: "maticmum",
        networkId: 80001,
        blockExplorerUrls: [
            "https://mumbai.polygonscan.com"
        ]
    },
};

export const txColumns = [
    {
      title: '事件',
      dataIndex: 'event'
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '来自',
      dataIndex: 'from',
    },
    {
        title: '目标',
        dataIndex: 'to',
    },
    {
        title: '时间',
        dataIndex: 'time',
    },
];
  
export const txData = [
    {
        key: 1,
        event: "购买",
        price: 100,
        from: '0x000',
        to: '0x111',
        time: '2022'
    },
    {
        key: 2,
        event: "售出",
        price: 200,
        from: '0x222',
        to: '0x111',
        time: '2022'
    }
]