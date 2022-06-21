const { ethers } = require("hardhat");
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");


async function main() {
  // Deploy the DemoNFTMarketplace contract first
  const DemoNFTMarketplace = await ethers.getContractFactory(
    "DemoNFTMarketplace"
  );
  const demoNftMarketplace = await DemoNFTMarketplace.deploy();
  await demoNftMarketplace.deployed();

  console.log("DemoNFTMarketplace deployed to: ", demoNftMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    demoNftMarketplace.address,
    CRYPTO_DEVS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("0.1"),
    }
  );
  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });