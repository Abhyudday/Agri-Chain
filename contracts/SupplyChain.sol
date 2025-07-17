// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    uint256 private _productIdCounter;
    
    struct Product {
        uint256 id;
        string name;
        string category;
        address farmer;
        uint256 timestamp;
        string location;
        bool isActive;
        string ipfsHash; // For storing additional product data
    }
    
    struct IoTData {
        uint256 temperature;
        uint256 humidity;
        uint256 timestamp;
        string location;
    }
    
    struct ComplianceRecord {
        uint256 productId;
        string claimType; // e.g., "organic", "fair-trade", "gmo-free"
        bool verified;
        uint256 timestamp;
        string zkProofHash; // Hash of ZK proof (mocked for simplicity)
        address verifier;
    }
    
    mapping(uint256 => Product) public products;
    mapping(uint256 => IoTData[]) public productIoTData;
    mapping(uint256 => ComplianceRecord[]) public productCompliance;
    mapping(address => bool) public authorizedVerifiers;
    
    event ProductRegistered(uint256 indexed productId, string name, address farmer);
    event IoTDataAdded(uint256 indexed productId, uint256 temperature, uint256 humidity);
    event ComplianceVerified(uint256 indexed productId, string claimType, bool verified);
    event VerifierAdded(address verifier);
    
    constructor() Ownable(msg.sender) {
        // Add the contract deployer as the first authorized verifier
        authorizedVerifiers[msg.sender] = true;
    }
    
    modifier onlyAuthorizedVerifier() {
        require(authorizedVerifiers[msg.sender], "Not an authorized verifier");
        _;
    }
    
    function addVerifier(address _verifier) external onlyOwner {
        authorizedVerifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }
    
    function registerProduct(
        string memory _name,
        string memory _category,
        string memory _location,
        string memory _ipfsHash
    ) external returns (uint256) {
        _productIdCounter++;
        uint256 newProductId = _productIdCounter;
        
        products[newProductId] = Product({
            id: newProductId,
            name: _name,
            category: _category,
            farmer: msg.sender,
            timestamp: block.timestamp,
            location: _location,
            isActive: true,
            ipfsHash: _ipfsHash
        });
        
        emit ProductRegistered(newProductId, _name, msg.sender);
        return newProductId;
    }
    
    function addIoTData(
        uint256 _productId,
        uint256 _temperature,
        uint256 _humidity,
        string memory _location
    ) external {
        require(products[_productId].isActive, "Product not found or inactive");
        require(
            products[_productId].farmer == msg.sender || authorizedVerifiers[msg.sender],
            "Only farmer or authorized verifier can add IoT data"
        );
        
        productIoTData[_productId].push(IoTData({
            temperature: _temperature,
            humidity: _humidity,
            timestamp: block.timestamp,
            location: _location
        }));
        
        emit IoTDataAdded(_productId, _temperature, _humidity);
    }
    
    function verifyCompliance(
        uint256 _productId,
        string memory _claimType,
        bool _verified,
        string memory _zkProofHash
    ) external onlyAuthorizedVerifier {
        require(products[_productId].isActive, "Product not found or inactive");
        
        productCompliance[_productId].push(ComplianceRecord({
            productId: _productId,
            claimType: _claimType,
            verified: _verified,
            timestamp: block.timestamp,
            zkProofHash: _zkProofHash,
            verifier: msg.sender
        }));
        
        emit ComplianceVerified(_productId, _claimType, _verified);
    }
    
    function getProduct(uint256 _productId) external view returns (Product memory) {
        return products[_productId];
    }
    
    function getProductIoTData(uint256 _productId) external view returns (IoTData[] memory) {
        return productIoTData[_productId];
    }
    
    function getProductCompliance(uint256 _productId) external view returns (ComplianceRecord[] memory) {
        return productCompliance[_productId];
    }
    
    function getCurrentProductId() external view returns (uint256) {
        return _productIdCounter;
    }
    
    function deactivateProduct(uint256 _productId) external {
        require(
            products[_productId].farmer == msg.sender || owner() == msg.sender,
            "Only farmer or owner can deactivate product"
        );
        products[_productId].isActive = false;
    }
} 