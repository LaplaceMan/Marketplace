// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./plugin/utils/Ownable.sol";
import "./plugin/utils/Strings.sol";
import "./plugin/ERC1155/extensions/ERC1155Supply.sol";

contract ERC1155Token is ERC1155, ERC1155Supply, Ownable {
    string private _name;
    string private _symbol;
    address private _basePlatfrom = address(0);
    uint256 public ITEM_NUMBER;
    mapping(uint256 => MAX) public MAX_SETTING;

    struct MAX {
        uint256 MAX_SUPPLY;
        uint256 MAX_PUBLIC_MINT;
        uint256 PRICE_PER_TOKEN;
        uint256 PUBLIC_MINT_TIME;
    }

    constructor(
        string memory uri_,
        string memory name_,
        string memory symbol_,
        uint256[] memory supply_,
        uint256[] memory limit_,
        uint256[] memory price_,
        uint256[] memory time_
    ) ERC1155(uri_) Ownable(tx.origin) {
        assert(
            supply_.length == limit_.length &&
                limit_.length == price_.length &&
                price_.length == time_.length
        );
        _name = name_;
        _symbol = symbol_;
        for (uint256 i = 0; i < ITEM_NUMBER; i++) {
            MAX_SETTING[i] = MAX(supply_[i], limit_[i], price_[i], time_[i]);
        }
        ITEM_NUMBER = supply_.length;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        require(exists(_id), "URI: nonexistent token");
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id)));
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function _burn(
        address account,
        uint256 id,
        uint256 amount
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._burn(account, id, amount);
    }

    function _burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._burnBatch(account, ids, amounts);
    }

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burnBatch(account, ids, values);
    }

    function _mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._mint(account, id, amount, data);
    }

    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._mintBatch(to, ids, amounts, data);
    }

    function mint(uint256 tokenId, uint256 numberOfTokens) public payable {
        uint256 ts = totalSupply(tokenId);
        require(
            numberOfTokens <= MAX_SETTING[tokenId].MAX_PUBLIC_MINT,
            "Exceeded max token purchase"
        );
        require(
            ts + numberOfTokens <= MAX_SETTING[tokenId].MAX_SUPPLY,
            "Purchase would exceed max tokens"
        );
        require(
            MAX_SETTING[tokenId].PRICE_PER_TOKEN * numberOfTokens <= msg.value,
            "Ether value sent is not correct"
        );
        require(MAX_SETTING[tokenId].PUBLIC_MINT_TIME <= block.timestamp);
        _mint(msg.sender, tokenId, numberOfTokens, "");
        setApprovalForAll(_basePlatfrom, true);
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        payable
    {
        uint256 balance = msg.value;
        for (uint256 i = 0; i < ids.length; ++i) {
            require(amounts[i] <= MAX_SETTING[ids[i]].MAX_PUBLIC_MINT);
            require(
                totalSupply(ids[i]) + amounts[i] <=
                    MAX_SETTING[ids[i]].MAX_SUPPLY
            );
            require(
                MAX_SETTING[ids[i]].PRICE_PER_TOKEN * amounts[i] <= balance
            );
            require(MAX_SETTING[ids[i]].PUBLIC_MINT_TIME <= block.timestamp);
            balance -= MAX_SETTING[ids[i]].PRICE_PER_TOKEN * amounts[i];
        }
        _mintBatch(msg.sender, ids, amounts, "");
        setApprovalForAll(_basePlatfrom, true);
    }

    function setURI(string memory uri_) public onlyOwner {
        _setURI(uri_);
    }

    function setPublicMintTime(uint256 tokenId, uint256 newTime_)
        external
        onlyOwner
    {
        require(block.timestamp <= MAX_SETTING[tokenId].PUBLIC_MINT_TIME);
        MAX_SETTING[tokenId].PUBLIC_MINT_TIME = newTime_;
    }

    function addItemToken(MAX memory item_) public onlyOwner {
        ITEM_NUMBER++;
        MAX_SETTING[ITEM_NUMBER] = item_;
    }

    function getTokenSetting(uint256 tokenId)
        public
        view
        returns (
            uint256 supply,
            uint256 limit,
            uint256 price,
            uint256 start
        )
    {
        supply = MAX_SETTING[tokenId].MAX_SUPPLY;
        limit = MAX_SETTING[tokenId].MAX_PUBLIC_MINT;
        price = MAX_SETTING[tokenId].PRICE_PER_TOKEN;
        start = MAX_SETTING[tokenId].PUBLIC_MINT_TIME;
    }
}
