const cron = require('node-cron')
const config = require('config')

const {transactionModel} = require('../models/transactionModel')
const {ethereumPriceModel} = require('../models/ethereumPriceModel')
const coingeckoURL = config.get('api.coingecko');
const etherscanAPI = config.get('api.etherscan');

async function fetchTransactions(address) {
    let etherscanAddress = address;
    let etherscanURL = `https://api.etherscan.io/api?module=account&action=txlist&address=${etherscanAddress}&startblock=0&endblock=99999999&offset=1000&sort=asc&apikey=${etherscanAPI}`
    try {
        let response = await fetch(etherscanURL);
        let data = await response.json();
        //console.log(data);
        return data["result"];
    } catch (error) {
        console.log(error);
        return null;
    }
}


async function fetchEthPrice() {
    try {
        let response = await fetch(coingeckoURL);
        let price = await response.json();
        console.log(price);
        return price;
    } catch (error) {
        console.log(error);
        return err;
    }
}


getBalance = async (req, res) => {
    let usrEthAddress = req.body.address;
    let tranxs = await fetchTransactions(usrEthAddress);
    if (tranxs === null) {
        res.status(500).send("Server Error: Failed to calculate balance.")
        return
    }
    let price = await fetchEthPrice();
    const balance = tranxs.reduce((accumulator, currentValue) => { 
        if (currentValue.to == usrEthAddress) {
            return Number(accumulator) + Number(currentValue.value) 
        } else {
            return Number(accumulator) - Number(currentValue.value)
        }
    }, 0);
    console.log(balance)
    res.status(201).send([balance, price]);

}


getEthPrice = function () {
    
    cron.schedule("* 10 * * * *", async function() {
        let price = await fetchEthPrice()        
        const doc = new ethereumPriceModel({
            ethereum : { price : price.ethereum.inr}
        });
        doc.save()
        .catch(err => console.log(err))
    });
}


getTransactions = async (req, res) => {
    let usrEthAddress = req.body.address;
    let tranxs = await fetchTransactions(usrEthAddress);
    if (tranxs === null) {
        res.status(500).send("Server Error: Failed to Fetch Transactions")
        return
    } else {
        res.status(201).send(tranxs);
    }

    tranxs.map((tranx) => {
        const doc = new transactionModel({
            blockNumber : tranx.blockNumber,
            timeStamp: tranx.timeStamp,
            hash: tranx.hash,
            nonce: tranx.nonce,
            blockHash: tranx.blockHash,
            transactionIndex: tranx.transactionIndex,
            from: tranx.from,
            to: tranx.to,
            value: tranx.value,
            gas: tranx.gas,
            gasPrice: tranx.gasPrice,
            contractAddress: tranx.contractAddress,
            cumulativeGasUsed: tranx.cumulativeGasUsed,
            gasUsed: tranx.gasUsed,
            confirmations: tranx.confirmations
        });
        doc.save()
        .catch(err => console.log(err))
    });
}

module.exports = {
    getBalance,
    getEthPrice,
    getTransactions
};


