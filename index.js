require('dotenv').config();
const ethers = require("ethers");

// Using environment variables
const privateKey = process.env.PRIVATE_KEY;
const providerURL = process.env.PROVIDER_URL;
const nftContractAddress = process.env.NFT_CONTRACT_ADDRESS;
const fromAddress = process.env.FROM_ADDRESS;

// Ethereum network provider (e.g., Infura)
const provider = new ethers.providers.JsonRpcProvider(providerURL);

// Replace with the list of recipient addresses and corresponding token IDs
const recipients = [
    { to: '0x3181468206e54e6956319511D85D14B6CBd6b02A', tokenId: 20 },
    { to: '0xB13a5b231073faa8F52885b9F63765F502d75524', tokenId: 21 },
    { to: '0x171446B041C6683e5F138b8a3f263BBFfb8Ee74a', tokenId: 22 },
    { to: '0x5FF5afd7dd401f0283973d5C8116747A29Fa5812', tokenId: 23 },
    { to: '0xaf12f9ff76fbbc5e59b95351444f9894f9978ceb', tokenId: 24 },
    { to: '0xf17cf865b03e015938f36f53f4cf1aff5df88665', tokenId: 25 },
    { to: '0x8e8f59991F1b81826b6b0eDAd32198774677cE12', tokenId: 26 },
    { to: '0xc51505386b5A1d3e7ECb88CEc112796D8CEe0250', tokenId: 27 },
    { to: '0x1ff1f110dDa4C18A6840c83ED30090ad2Fa5be5c', tokenId: 28 },
    { to: '0x1C158f42A998aA021b9ec30FC63E5B19C4cFa5bC', tokenId: 29 },
    { to: '0x4688b6f3C384C3CFFE95c92f599213De4a9fA9cA', tokenId: 30 },
    { to: '0x10eC3e9F9CFBAD272e7596dfFbC3466a6Ae6e225', tokenId: 31 },
    { to: 'Arigreenberg.eth', tokenId: 32 },
    { to: 'hobnailboot.eth', tokenId: 33 },
    { to: '0x6dC0b58bE45a585D346017DE801dacC1028FF34B', tokenId: 34 },
    { to: '0xe8bd796d3002d8756f833e62950f25b719dd4afa', tokenId: 35 },
    { to: '0x296E0C21DB4061EbF971e55d5db85011E7Ff9797', tokenId: 36 },
    { to: '0x76498dbcB3905d4A4F5Ad295F7Af1373B1627BdE', tokenId: 37 },
    { to: 'dtjournal.eth', tokenId: 38 },
    { to: '0x6FBE3EE1F62cD0d7e6942dffE4CcF8c8C3993520', tokenId: 39 },
    { to: '0x1B6488f4DDaD414C22931Aff1D20936f070c7C28', tokenId: 40 },
    { to: '0xc2E99B53004f9d1461c68bA88794D0Aa5Ad97DB8', tokenId: 41 },
    { to: '0x87bf447ac29ba9498e5c0859513c39a0931f303a', tokenId: 42 },
    { to: '0x8441350AFBda23ba2476a4b92823bE0a0402472F', tokenId: 43 },
    { to: '0x0700fEf24e400E17eEf4D3c5B630fFfa44789aA9', tokenId: 44 },
    { to: 'lapsus.eth', tokenId: 45 },
    { to: '0x9e3B70524b34CC65084ac04Ac23C2EfaDB1463B5', tokenId: 46 },
    { to: '0xfe57Fdcd9d0dF47356CcdEbe08f3Dc454e472f9B', tokenId: 47 },
    { to: '0xCb3408baD3192777e561B362e8467c213231Ef9f', tokenId: 48 },
    { to: '0x13d735A4D5E966b8F7B19Fc2f476BfC25c0fc7Dc', tokenId: 49 },
    { to: '0x586Bc43937C2eC42348cc83Acf44CED42Fe3d5f7', tokenId: 50 }
];

async function sendNFTs() {
    // Create a wallet from the private key
    const wallet = new ethers.Wallet(privateKey, provider);

    // Load the NFT contract
    const nftContract = new ethers.Contract(nftContractAddress, ["function transferFrom(address _from, address _to, uint256 _tokenId) external"], wallet);

    // Loop through the recipients and send NFTs
    for (const recipient of recipients) {
        try {
            const tx = await nftContract.transferFrom(fromAddress, recipient.to, recipient.tokenId);
            await tx.wait();
            console.log(`Transferred NFT with Token ID ${recipient.tokenId} to ${recipient.to}`);
        } catch (error) {
            console.error(`Error transferring NFT with Token ID ${recipient.tokenId} to ${recipient.to}:`, error);
        }
    }
}

// Execute the function to send NFTs
sendNFTs()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error sending NFTs:", error);
        process.exit(1);
    });