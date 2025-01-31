import 'dotenv/config'
import Web3 from 'web3';
import Common, { Chain } from '@ethereumjs/common'
import { Transaction } from '@ethereumjs/tx'
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/' + process.env.INFURA_KEY);
const account = '';

const contract_Address = "";
const abi: any[] =[];
const chck = web3.utils.toChecksumAddress(contract_Address)
const contract = new web3.eth.Contract(abi, contract_Address);


class Song {

    constructor() {

    }
    signTransaction(smartContractFunction: any) {

        web3.eth.getTransactionCount(account, (err, txCount) => {
            web3.eth.getGasPrice(function (e, r) {
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: contract_Address,
                    value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
                    gasLimit: web3.utils.toHex(2100000),
                    gasPrice: web3.utils.toHex(r),
                    data: smartContractFunction
                }
                const common = new Common({ chain: Chain.Ropsten })
                const tx = Transaction.fromTxData(txObject, { common })
                const privateKey = Buffer.from(
                    'xxxxxxxxxxxxxcc22184c848da5fcafc47e6873db97xxxxxxxxxxxxxxxxxxx',
                    'hex',
                )
                const serializedTx = tx.sign(privateKey).serialize().toString('hex')
                web3.eth.sendSignedTransaction('0x' +serializedTx).on('receipt', receipt => {
                    console.log(receipt);
                })
            });
        })
    }
    /**
     * create Song
     * @param SongName
     * @param ArtistName
     */

    createSong(SongName: any, ArtistName: any) {

        const smartContractFunction = contract.methods.create(SongName, ArtistName).encodeABI();
        this.signTransaction(smartContractFunction);
    }
    /**
     * get Song details
     * @param SongId
     */

    readSong(SongId: any) {
        contract.methods.read(SongId).call().then(function (result: any) {
            console.log(result);
        });
    }
    updateSong(SongId: any, SongName: any, ArtistName: any) {
        const smartContractFunction = contract.methods.update(SongId, SongName, ArtistName).encodeABI();
        this.signTransaction(smartContractFunction);
    }
    deleteSong(SongId: any) {
        const smartContractFunction = contract.methods.destroy(SongId).encodeABI();
        this.signTransaction(smartContractFunction);
    }

}

let obj = new Song();
obj.readSong(0);