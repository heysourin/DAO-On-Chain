// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FakeNFTMarketplace {
    mapping(uint256 => address) public tokens;

    uint256 nftPrice = 0.001 ether;

    function purchase(uint256 _tokenId) external payable {
        require(msg.value >= nftPrice, "This NFT costs 0.001 ether");
        tokens[_tokenId] = msg.sender;
    }

    function getPrice() external view returns (uint256) {
        return nftPrice;
    }

    //available()== true: token is available for sale
    function available(uint256 _tokenId) external view returns (bool) {
        if (tokens[_tokenId] == address(0)) {
            return true;
        }
        return false;
    }
}
//The FakeNFTMarketplace exposes some basic functions that we will be using from the DAO contract to purchase NFTs if a proposal is passed
