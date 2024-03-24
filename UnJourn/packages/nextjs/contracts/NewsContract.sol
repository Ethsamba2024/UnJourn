// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract UnjournNewsLetter is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
    mapping(address => uint256) public purchasesPerWallet;
    uint public maxPerWallet = 5;

    constructor(string memory uri) ERC1155(uri) {}

    function setURI(string memory newUri) public onlyOwner {
        _setURI(newUri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 id, uint256 amount) public payable {
        require(purchasesPerWallet[msg.sender] + amount <= maxPerWallet, "Exceeds max per wallet");
        _mint(msg.sender, id, amount, "");
        purchasesPerWallet[msg.sender] += amount;
    }

    function allowListMint(uint256 id, uint256 amount) public payable {
        // Implement allow list minting logic here
    }

    function withdraw(address payable _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        _addr.transfer(balance);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
        // Additional logic here if needed
    }

    // Implement any additional functions or overrides as needed
}
