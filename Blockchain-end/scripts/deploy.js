const hre = require("hardhat");
const { ethers } = require("hardhat");

//we can make our program wait for 'ms' seconds, before executing the next

// async function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

async function main() {
  const provider = ethers.provider;

  //Todo: NFT Contract
  const NftContract = await hre.ethers.getContractFactory("CryptoDevsNFT");
  const nftContract = await NftContract.deploy();
  await nftContract.deployed();

  const NftContractAddress = nftContract.address;
  console.log("CryptoDevsNFT deployed to:", NftContractAddress);

  //Todo: Fake Marketplace Contract
  const FakeNftMarketplaceContract = await hre.ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplaceContract = await FakeNftMarketplaceContract.deploy();
  await fakeNftMarketplaceContract.deployed();

  const fakeNftMarketplaceAddress = fakeNftMarketplaceContract.address;
  console.log("FakeNFTMarketplace deployed to:", fakeNftMarketplaceAddress);

  const amount = ethers.utils.parseEther("1");

  const DaoContract = await hre.ethers.getContractFactory("CryptoDevsDAO");
  const daoContract = await DaoContract.deploy(
    fakeNftMarketplaceAddress,
    NftContractAddress,
    { value: amount }
  );
  await daoContract.deployed();
  console.log("CryptoDevsDAO deployed to:", daoContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
