start powershell -NoExit -Command "cd client ; npm run start"
start powershell -NoExit -Command "npx hardhat node"
start powershell -NoExit -Command "npx hardhat run --network localhost scripts/deploy.js"