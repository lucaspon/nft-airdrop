const ethers = require("ethers");

// Replace with your private key
const privateKey = "private_key_here";

// Ethereum network provider (e.g., Infura)
const provider = new ethers.providers.JsonRpcProvider("infura_URL");

// Replace with the NFT contract address
const nftContractAddress = "address";

// Replace with the wallet address that holds the NFTs
const fromAddress = "from address";

// Replace with the list of recipient addresses and corresponding token IDs
const recipients = [
    { to: '0x0000000000000000000000000000000000000000', tokenId: 1 },
    // ...
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






































