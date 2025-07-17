# 🌾 AgriChain - Agricultural Supply Chain Tracker

A blockchain-based supply chain tracking system for agricultural products, featuring QR code scanning, IoT data integration, and Zero-Knowledge Proof compliance verification.

## ✨ Features

### Core Functionality
- **🔗 Blockchain Integration**: Immutable product registration and tracking using Solidity smart contracts
- **📱 QR Code Scanner**: Scan product tags to retrieve blockchain data instantly  
- **🆔 Unique Product IDs**: Each product gets a unique identifier for complete traceability
- **📡 IoT Data Simulation**: Mock real-time sensor data logging (temperature, humidity, location)
- **🔐 Zero-Knowledge Proofs**: Privacy-preserving compliance verification
- **✅ Compliance Tracking**: Verify certifications like "Organic", "Fair Trade", "GMO-Free"

### User Roles
- **👨‍🌾 Farmers**: Register products, add IoT sensor data
- **👨‍💼 Verifiers**: Submit compliance records with ZKP attestations  
- **🛍️ Consumers**: Scan QR codes to view product history
- **🏪 Vendors**: Track supply chain transparency

## 🏗️ Architecture

### Smart Contracts (Solidity)
- **SupplyChain.sol**: Main contract handling products, IoT data, and compliance
- OpenZeppelin integration for security and access control
- Event-driven architecture for frontend updates

### Frontend (React)
- **Dashboard**: Overview of products and system stats
- **QR Scanner**: Camera-based QR code scanning with manual entry fallback
- **Product Registration**: Form for adding new products to blockchain
- **Product Details**: Comprehensive view of product data, IoT readings, and compliance
- **IoT Simulator**: Real-time sensor data generation and submission
- **Compliance Form**: ZKP-based verification for authorized verifiers

### Web3 Integration
- Ethers.js for blockchain interactions
- MetaMask wallet connection
- Local Hardhat network support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (recommended)

### Installation

1. **Clone and install dependencies**:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

2. **Compile smart contracts**:
```bash
npm run compile
```

3. **Start local blockchain**:
```bash
# Terminal 1
npm run hardhat
```

4. **Deploy contracts**:
```bash
# Terminal 2
npm run deploy
```

5. **Start frontend**:
```bash
# Terminal 3
npm run frontend
```

6. **Access the application**:
   - Open http://localhost:3000
   - Connect MetaMask to localhost:8545
   - Import Hardhat test accounts if needed

## 📖 Usage Guide

### Setting Up MetaMask
1. Install MetaMask browser extension
2. Add custom network:
   - Network Name: Hardhat Local
   - RPC URL: http://localhost:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

### Using the Application

#### 1. Register a Product
- Navigate to "Register Product"
- Fill in product details (name, category, location)
- Submit transaction to blockchain
- Note the generated Product ID

#### 2. Add IoT Data
- Go to "IoT Simulator"
- Enter Product ID
- Add sensor readings (temperature, humidity, location)
- Use real-time simulation for continuous data

#### 3. Verify Compliance (Authorized Verifiers Only)
- Navigate to "Compliance"
- Enter Product ID and claim type
- Provide evidence/documentation
- Submit with mock ZK proof generation

#### 4. Scan Products
- Use "QR Scanner" to scan product codes
- Or manually enter Product ID
- View complete product history and compliance

#### 5. Track Products
- View product details including:
  - Basic information and farmer details
  - IoT sensor readings over time
  - Compliance certifications
  - Generated QR code data

## 🔧 Development

### Project Structure
```
├── contracts/              # Solidity smart contracts
│   └── SupplyChain.sol     # Main supply chain contract
├── scripts/                # Deployment scripts
│   └── deploy.js           # Contract deployment
├── test/                   # Smart contract tests
│   └── SupplyChain.test.js # Contract test suite
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # Web3 service layer
│   │   └── contracts/      # Generated contract ABIs
│   └── public/             # Static assets
└── hardhat.config.js       # Hardhat configuration
```

### Available Scripts

**Backend:**
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run hardhat` - Start local blockchain
- `npm run deploy` - Deploy contracts to local network

**Frontend:**
- `npm run frontend` - Start React development server
- `npm run dev` - Start both blockchain and frontend

### Testing
```bash
# Run smart contract tests
npm run test

# Test output shows contract functionality
```

## 🔐 Security Features

### Smart Contract Security
- OpenZeppelin contracts for proven security patterns
- Access control for verifiers and farmers
- Input validation and error handling
- Event logging for transparency

### Zero-Knowledge Proofs (Mock Implementation)
- Privacy-preserving compliance verification
- Claims verification without revealing sensitive data
- Cryptographic proof generation (simulated)
- Verifier authorization system

## 🌱 Key Benefits

### For Farmers
- **Transparent tracking** of products from farm to consumer
- **Immutable records** that can't be altered or falsified
- **Direct verification** of organic and quality claims
- **IoT integration** for automated data collection

### For Consumers  
- **Complete traceability** of food products
- **Verified certifications** through blockchain records
- **QR code scanning** for instant product information
- **Trust and transparency** in food sourcing

### For Verifiers
- **Secure attestation** system using cryptographic proofs
- **Efficient verification** without revealing sensitive data
- **Immutable compliance** records on blockchain
- **Authorized access** controls

## 🔄 Future Enhancements

### Technical Improvements
- Real ZKP library integration (zk-SNARKs/STARKs)
- IPFS integration for document storage
- Multi-chain deployment support
- Mobile app development

### Feature Additions
- Supply chain analytics dashboard
- Automated IoT device integration
- NFT certificates for premium products
- Multi-language support
- Advanced reporting and insights

### Blockchain Enhancements
- Layer 2 scaling solutions
- Cross-chain interoperability
- Governance token implementation
- Staking mechanisms for verifiers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the documentation above
2. Review the code comments
3. Create an issue on GitHub
4. Contact the development team

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for development framework
- React community for frontend tools
- Ethers.js for Web3 integration
- Agricultural industry experts for domain knowledge

---

Built with ❤️ for a more transparent and sustainable agricultural supply chain. 