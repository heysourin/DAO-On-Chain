const { ethers } = require("hardhat");

const { expect } = require("chai");

describe("Lock", function () {
  describe("Deployed ki na dekhchi", function () {
    it("should be able to create one year locks", async function () {
      const provider = ethers.provider;

      //Todo: NFT Contract
      const NftContract = await hre.ethers.getContractFactory("CryptoDevsNFT");
      const nftContract = await NftContract.deploy();
      await nftContract.deployed();

      const NftContractAddress = nftContract.address;
      // console.log("CryptoDevsNFT deployed to:", NftContractAddress);

      //Todo: Fake Marketplace Contract
      const FakeNftMarketplaceContract = await hre.ethers.getContractFactory(
        "FakeNFTMarketplace"
      );
      const fakeNftMarketplaceContract =
        await FakeNftMarketplaceContract.deploy();
      await fakeNftMarketplaceContract.deployed();

      const fakeNftMarketplaceAddress = fakeNftMarketplaceContract.address;
      // console.log(
      //   "FakeNFTMarketplace deployed to:",
      //   fakeNftMarketplaceAddress
      // );

      const amount = ethers.utils.parseEther("1");

      const DaoContract = await hre.ethers.getContractFactory("CryptoDevsDAO");
      const daoContract = await DaoContract.deploy(
        fakeNftMarketplaceAddress,
        NftContractAddress,
        { value: amount }
      );
      await daoContract.deployed(6);
      
      // Wait for 6 blocks to mine.
      const balanceInWei = await provider.getBalance(daoContract.address);
      console.log(balanceInWei);
    });
  });
});
