<h1>APTOFY :radio:</h1>
<p>An Audio Streaming </p>

## Contract Deployment and Local Setup

1. Clone the repository
```bash
git clone https://github.com/Sigma2345/Aptofy.git
```
2. Ensure that <a href="https://aptos.dev/tools/aptos-cli/install-cli/">Aptos CLI</a> is installed on your system. 
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
2. Change the module address to the account address obtained after publishing the module in constants.js. 
3. Install all the packages using yarn and start an instance using yarn
```bash
yarn 
yarn dev
```
### Setting up indexer service
1. Install <a href="https://www.mongodb.com/docs/compass/current/install/">MongoDB Compass</a>
2. Start Mongo Compass instance. 
3. Make a .env file in indexerService and write the following contents in the file. 
```.env
mongo_url=<mongo-url-from-compass>
module_address=<account-address-where-module-is-updated>
db_name=<db-name-where-tx-are-stored>
interval=10000
```

