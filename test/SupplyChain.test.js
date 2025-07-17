const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChain", function () {
  let SupplyChain;
  let supplyChain;
  let owner;
  let farmer;
  let verifier;
  let otherAccount;

  beforeEach(async function () {
    [owner, farmer, verifier, otherAccount] = await ethers.getSigners();
    
    SupplyChain = await ethers.getContractFactory("SupplyChain");
    supplyChain = await SupplyChain.deploy();
    await supplyChain.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await supplyChain.owner()).to.equal(owner.address);
    });

    it("Should add deployer as authorized verifier", async function () {
      expect(await supplyChain.authorizedVerifiers(owner.address)).to.be.true;
    });
  });

  describe("Product Registration", function () {
    it("Should register a new product", async function () {
      const tx = await supplyChain.connect(farmer).registerProduct(
        "Organic Apples",
        "Fruits",
        "Green Valley Farm",
        "QmTestHash"
      );
      
      await expect(tx)
        .to.emit(supplyChain, "ProductRegistered")
        .withArgs(1, "Organic Apples", farmer.address);

      const product = await supplyChain.getProduct(1);
      expect(product.name).to.equal("Organic Apples");
      expect(product.category).to.equal("Fruits");
      expect(product.farmer).to.equal(farmer.address);
      expect(product.isActive).to.be.true;
    });

    it("Should increment product ID for each new product", async function () {
      await supplyChain.connect(farmer).registerProduct("Product 1", "Category", "Location", "");
      await supplyChain.connect(farmer).registerProduct("Product 2", "Category", "Location", "");
      
      expect(await supplyChain.getCurrentProductId()).to.equal(2);
    });
  });

  describe("IoT Data", function () {
    beforeEach(async function () {
      await supplyChain.connect(farmer).registerProduct(
        "Test Product",
        "Category",
        "Location",
        ""
      );
    });

    it("Should allow farmer to add IoT data", async function () {
      const tx = await supplyChain.connect(farmer).addIoTData(
        1,
        250, // 25.0°C
        650, // 65.0%
        "Field A"
      );

      await expect(tx)
        .to.emit(supplyChain, "IoTDataAdded")
        .withArgs(1, 250, 650);

      const iotData = await supplyChain.getProductIoTData(1);
      expect(iotData.length).to.equal(1);
      expect(iotData[0].temperature).to.equal(250);
      expect(iotData[0].humidity).to.equal(650);
      expect(iotData[0].location).to.equal("Field A");
    });

    it("Should allow authorized verifier to add IoT data", async function () {
      await supplyChain.connect(owner).addVerifier(verifier.address);
      
      await supplyChain.connect(verifier).addIoTData(
        1,
        220,
        700,
        "Verification Site"
      );

      const iotData = await supplyChain.getProductIoTData(1);
      expect(iotData.length).to.equal(1);
    });

    it("Should reject IoT data from unauthorized users", async function () {
      await expect(
        supplyChain.connect(otherAccount).addIoTData(1, 250, 650, "Field A")
      ).to.be.revertedWith("Only farmer or authorized verifier can add IoT data");
    });
  });

  describe("Compliance Verification", function () {
    beforeEach(async function () {
      await supplyChain.connect(farmer).registerProduct(
        "Test Product",
        "Category",
        "Location",
        ""
      );
    });

    it("Should allow authorized verifier to add compliance record", async function () {
      const tx = await supplyChain.connect(owner).verifyCompliance(
        1,
        "Organic Certified",
        true,
        "zkProofHash123"
      );

      await expect(tx)
        .to.emit(supplyChain, "ComplianceVerified")
        .withArgs(1, "Organic Certified", true);

      const compliance = await supplyChain.getProductCompliance(1);
      expect(compliance.length).to.equal(1);
      expect(compliance[0].claimType).to.equal("Organic Certified");
      expect(compliance[0].verified).to.be.true;
      expect(compliance[0].zkProofHash).to.equal("zkProofHash123");
    });

    it("Should reject compliance verification from unauthorized users", async function () {
      await expect(
        supplyChain.connect(otherAccount).verifyCompliance(
          1,
          "Organic Certified",
          true,
          "zkProofHash123"
        )
      ).to.be.revertedWith("Not an authorized verifier");
    });
  });

  describe("Verifier Management", function () {
    it("Should allow owner to add verifier", async function () {
      const tx = await supplyChain.connect(owner).addVerifier(verifier.address);
      
      await expect(tx)
        .to.emit(supplyChain, "VerifierAdded")
        .withArgs(verifier.address);

      expect(await supplyChain.authorizedVerifiers(verifier.address)).to.be.true;
    });

    it("Should reject verifier addition from non-owner", async function () {
      await expect(
        supplyChain.connect(farmer).addVerifier(verifier.address)
      ).to.be.revertedWithCustomError(supplyChain, "OwnableUnauthorizedAccount");
    });
  });

  describe("Product Deactivation", function () {
    beforeEach(async function () {
      await supplyChain.connect(farmer).registerProduct(
        "Test Product",
        "Category",
        "Location",
        ""
      );
    });

    it("Should allow farmer to deactivate their product", async function () {
      await supplyChain.connect(farmer).deactivateProduct(1);
      
      const product = await supplyChain.getProduct(1);
      expect(product.isActive).to.be.false;
    });

    it("Should allow owner to deactivate any product", async function () {
      await supplyChain.connect(owner).deactivateProduct(1);
      
      const product = await supplyChain.getProduct(1);
      expect(product.isActive).to.be.false;
    });

    it("Should reject deactivation from unauthorized users", async function () {
      await expect(
        supplyChain.connect(otherAccount).deactivateProduct(1)
      ).to.be.revertedWith("Only farmer or owner can deactivate product");
    });
  });
}); 