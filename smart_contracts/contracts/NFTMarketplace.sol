// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "./ERC721Token.sol";
// import "./ERC1155Token.sol";
import "./plugin/utils/Ownable.sol";
import "./plugin/ERC721/IERC721.sol";
import "./plugin/ERC1155/IERC1155.sol";

contract NFTMarketplace is Ownable {
    uint256 public coCount;
    // 标准类型, 0为ERC721, 1为ERC1155.
    mapping(address => uint8) public Protocol;
    mapping(uint256 => address) public Address;
    mapping(address => mapping(uint256 => Listing721)) ListingERC721;
    mapping(address => mapping(address => mapping(uint256 => Listing1155))) ListingERC1155;

    constructor() Ownable(msg.sender) {}

    struct Listing721 {
        uint256 price;
        address seller;
    }

    struct Listing1155 {
        uint256 price;
        uint256 number;
    }

    // function createERC721Collection(
    //     string memory name_,
    //     string memory symbol_,
    //     string memory baseUri_,
    //     uint256 supply_,
    //     uint256 limit,
    //     uint256 price_,
    //     uint256 time
    // ) public {
    //     coCount++;
    //     ERC721Token newCollection = new ERC721Token(
    //         name_,
    //         symbol_,
    //         baseUri_,
    //         supply_,
    //         limit,
    //         price_,
    //         time
    //     );
    //     Protocol[address(newCollection)] = 0;
    //     Address[coCount] = address(newCollection);
    // }

    // function createERC1155Collection(
    //     string memory uri_,
    //     string memory name_,
    //     string memory symbol_,
    //     uint256[] memory supply_,
    //     uint256[] memory limit_,
    //     uint256[] memory price_
    // ) public {
    //     coCount++;
    //     ERC1155Token newCollection = new ERC1155Token(
    //         uri_,
    //         name_,
    //         symbol_,
    //         supply_,
    //         limit_,
    //         price_
    //     );
    //     Protocol[address(newCollection)] = 1;
    //     Address[coCount] = address(newCollection);
    // }

    function listERC721Item(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        require(msg.sender == owner);
        require(ListingERC721[nftAddress][tokenId].seller == address(0));
        require(nft.getApproved(tokenId) == address(this));
        ListingERC721[nftAddress][tokenId] = Listing721(price, msg.sender);
    }

    function listERC1155Item(
        address nftAddress,
        uint256 tokenId,
        uint256 number,
        uint256 price
    ) external {
        IERC1155 nft = IERC1155(nftAddress);
        uint256 balance = nft.balanceOf(msg.sender, tokenId);
        require(
            ListingERC1155[nftAddress][msg.sender][tokenId].number + number <=
                balance
        );
        require(nft.isApprovedForAll(msg.sender, address(this)));
        ListingERC1155[nftAddress][msg.sender][tokenId].price = price;
        ListingERC1155[nftAddress][msg.sender][tokenId].number += number;
    }

    function cancelListERC721Item(address nftAddress, uint256 tokenId)
        external
    {
        require(ListingERC721[nftAddress][tokenId].seller == msg.sender);
        delete (ListingERC721[nftAddress][tokenId]);
    }

    function cancelListERC1155Item(
        address nftAddress,
        uint256 tokenId,
        uint256 number
    ) external {
        ListingERC1155[nftAddress][msg.sender][tokenId].number -= number;
    }

    function updateListERC721Item(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    ) external {
        require(msg.sender == ListingERC721[nftAddress][tokenId].seller);
        require(newPrice > 0);
        ListingERC721[nftAddress][tokenId].price = newPrice;
    }

    function updateListERC1155Item(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice,
        uint256 newNumber
    ) external {
        IERC1155 nft = IERC1155(nftAddress);
        uint256 balance = nft.balanceOf(msg.sender, tokenId);
        require(newNumber <= balance);
        require(newPrice > 0);
        ListingERC1155[nftAddress][msg.sender][tokenId] = Listing1155(
            newPrice,
            newNumber
        );
    }

    function buyERC721Item(address nftAddress, uint256 tokenId)
        external
        payable
    {
        address seller = ListingERC721[nftAddress][tokenId].seller;
        require(seller != address(0));
        require(msg.value == ListingERC721[nftAddress][tokenId].price);
        payable(seller).transfer((msg.value * 97) / 100);
        IERC721(nftAddress).safeTransferFrom(seller, msg.sender, tokenId);
        delete ListingERC721[nftAddress][tokenId];
    }

    function buyERC1155Item(
        address nftAddress,
        uint256 tokenId,
        address from,
        uint256 number
    ) external payable {
        require(ListingERC1155[nftAddress][from][tokenId].number >= number);
        require(
            ListingERC1155[nftAddress][from][tokenId].price * number ==
                msg.value
        );
        payable(from).transfer((msg.value * 97) / 100);
        IERC1155(nftAddress).safeTransferFrom(
            from,
            msg.sender,
            tokenId,
            number,
            ""
        );
        ListingERC1155[nftAddress][from][tokenId].number -= number;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
