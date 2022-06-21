// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./plugin/utils/Ownable.sol";
import "./plugin/ERC721/ERC721.sol";
import "./plugin/ERC721/extensions/ERC721Enumerable.sol";

contract ERC721Token is ERC721, ERC721Enumerable, Ownable {
    string private _baseURIextended;
    address private _basePlatfrom = address(0);
    uint256 public PUBLIC_MINT_TIME;
    uint256 public immutable MAX_SUPPLY;
    uint256 public immutable MAX_PUBLIC_MINT;
    uint256 public immutable PRICE_PER_TOKEN;

    mapping(uint256 => address) private _baseApproved;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseUri,
        uint256 supply,
        uint256 limit,
        uint256 price,
        uint256 time
    ) ERC721(name, symbol) Ownable(tx.origin) {
        MAX_SUPPLY = supply;
        PRICE_PER_TOKEN = price;
        MAX_PUBLIC_MINT = limit;
        _baseURIextended = baseUri;
        PUBLIC_MINT_TIME = time;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function setPublicMintTime(uint256 newTime_) external onlyOwner {
        require(block.timestamp <= PUBLIC_MINT_TIME);
        PUBLIC_MINT_TIME = newTime_;
    }

    function burn(uint256 tokenId) public virtual {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721Burnable: caller is not owner nor approved"
        );
        _burn(tokenId);
    }

    function mint(uint256 numberOfTokens) public payable {
        uint256 ts = totalSupply();
        require(
            numberOfTokens <= MAX_PUBLIC_MINT,
            "Exceeded max token purchase"
        );
        require(
            ts + numberOfTokens <= MAX_SUPPLY,
            "Purchase would exceed max tokens"
        );
        require(
            PRICE_PER_TOKEN * numberOfTokens <= msg.value,
            "Ether value sent is not correct"
        );

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, ts + i);
            approve(_basePlatfrom, ts + i);
        }
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
