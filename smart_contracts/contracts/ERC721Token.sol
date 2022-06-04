// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./plugin/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Token is ERC721URIStorage {
    uint256 public immutable MAX_SUPPLY;
    uint256 public immutable PRICE_PER_TOKEN;

    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        uint256 price
    ) ERC721URIStorage(name, symbol) {
        MAX_SUPPLY = number;
        PRICE_PER_TOKEN = price;
    }
}
