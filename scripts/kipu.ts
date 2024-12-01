const hre = require("hardhat");

async function main() {
    const accounts = await hre.ethers.getSigners();
    const provider = hre.ethers.provider;
    const RECEIPT_ADDRESS = "0x21AA0AD5E70B5c09b2477724a936e0334351edec";

    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log("main - blockNumbre:", blockNumber);

    for (const account of accounts) {
        console.log(account.address);
        const accountBalance = await provider.getBalance(account.address);
        console.log('main - accountBalace:', accountBalance);

        const sendAmount = Number(accountBalance) * 0.02; // 2 % of the balance
        const tx = await account.sendTransaction({
            to: RECEIPT_ADDRESS,
            value: BigInt(Math.round(sendAmount)),
        });
        const receipt = await tx.wait();
        console.log("main - receipt:", receipt);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});