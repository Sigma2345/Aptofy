<h1>APTOFY :radio:</h1>

## Contract Deployment and Local Setup

1. Clone the repository
```bash
git clone https://github.com/Sigma2345/Aptofy.git
```

### Deploying the backend
```bash
cd Aptofy/backend
#initiliaze an account for backend 
#the contract is currently for testnet choose testnet
aptos init 
#compile the contract
aptos move compile --named-addresses onchainradio=default
#publish the contract
aptos move publish --named-addresses onchainradio=deafult
```

### Deploying the frontend
1. From the root directory go to Frontend/aptofy
```bash
cd Frontend/aptofy
```
2. Install all the packages using yarn and start an instance using yarn
```bash
yarn 
yarn dev
```
