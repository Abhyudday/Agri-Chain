const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SupplyChain contract...");

  // Get the ContractFactory and Signers here.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy the contract
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();

  await supplyChain.waitForDeployment();
  
  const contractAddress = await supplyChain.getAddress();
  console.log("SupplyChain deployed to:", contractAddress);

  // Save the contract address and ABI to a file for the frontend
  const fs = require('fs');
  const contractsDir = "./frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ SupplyChain: contractAddress }, undefined, 2)
  );

  // Copy the compiled contract ABI
  const contractArtifact = require("../artifacts/contracts/SupplyChain.sol/SupplyChain.json");
  fs.writeFileSync(
    contractsDir + "/SupplyChain.json",
    JSON.stringify(contractArtifact, null, 2)
  );

  console.log("Contract address and ABI saved to frontend/src/contracts/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 