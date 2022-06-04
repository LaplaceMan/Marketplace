// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC721Token.sol";
import "./ERC1155Token.sol";
import "./plugin/utils/Ownable.sol";

contract NFTMarketplace is Ownable {
    uint256 public coCount;
    mapping(address => uint8) public Protocol;
    mapping(uint256 => address) public Address;

    constructor() Ownable(msg.sender) {}

    function createERC721Collection(
        string memory name,
        string memory symbol,
        uint256 supply,
        uint256 price
    ) public {
        coCount++;
        ERC721Token newCollection = new ERC721Token(
            name,
            symbol,
            supply,
            price
        );
        Protocol[address(newCollection)] = 0;
    }

    function createERC1155Collection(string memory name, string memory symbol)
        public
    {
        coCount++;
        ERC1155Token newCollection = new ERC1155Token(name, symbol);
        Protocol[address(newCollection)] = 1;
    }

    function createMarketItem(uint256 tokenId, uint256 price) public {
        require(price > 0, "Price must be at least 1 wei");

        _itemsUpForSale.increment();

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }
}
