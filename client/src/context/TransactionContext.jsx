import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';



import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window; //解構window.ethereum; get ethereum from window (window.etheruem )

const getEthereumContract = ()=>{
    //// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(ethereum);
console.log(provider+'provider')
const signer = provider.getSigner();
    // The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);//使用 new ethers.Contract 来创建一个已部署在以太坊区块链上的智能合约实例 address（字符串）：智能合约在以太坊区块链上的地址。这是必需的参数。abi（数组）：智能合约的 ABI。ABI 是一个 JSON 文件，描述了智能合约的函数和事件。这也是一个必需的参数。signer（对象）：提供签署合约事务的能力的对象。这是一个可选参数。如果您不提供 signer 对象，则仍然可以使用合约从区块链中读取数据，但无法写入区块链。

return transactionsContract
}

export const TransactionProvider =({children})=>{
    const [currentAccount,setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo:'', amount:'', keyworkd:'', message:''})
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([])
    const handleChange = (e,name)=>{
        setFormData((prevState)=>({ ...prevState , [name]: e.target.value})) //用到舊的state來協助過新的state要用prevState
    } //這段程式碼定義了一個狀態變數 "formData" 和一個更新該狀態的函式 "setformData"，並使用 useState hook 初始化了該狀態變數。初始的狀態對象包含了四個屬性： "addressTo", "amount", "keyword" 和 "message"，它們的值均為空字符串。接著定義了一個函式 "handleChange"，它接收兩個參數：一個事件對象 "e" 和一個字符串 "name"。當這個函式被調用時，它會使用 React 的 setState 函式來更新狀態。具體地說，它調用 "setformData" 函式，將其傳入一個回調函式作為參數。該回調函式使用 "prevState" 參數創建一個新的狀態對象，並使用 ES6 的展開運算符將原來的屬性展開到新對象中。然後，它使用方括號語法，根據傳遞給 "handleChange" 函式的 "name" 參數動態更新狀態對象的屬性。最終，這個 "handleChange" 函式的作用是根據用戶輸入的事件對象和 "name" 參數值，更新對應狀態對象的屬性值。
   
    const getAllTransactions= async ()=>{
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const transactionContract = getEthereumContract();
            console.log(transactionContract);
            const availableTransactions = await transactionContract.getAllTransactions();
            console.log('available',availableTransactions);
            const structuredTransactions = availableTransactions.map((transaction)=>({
                addressFrom: transaction.sender,
                addressTo: transaction.receiver,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(), // 將 Unix 時間戳轉換為 JavaScript Date 對象,//A Big Number object: (data structure) commonly used to represent integers that are too large to be stored in a standard 32-bit or 64-bit integer variable and Ethereum use a data type called "uint256" to represent integers that can range from 0 to 2^256 - 1.所以需要把big bnumber轉為數字 到millie seconds再轉成當地時間  
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }
            ))
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error)
        }
       
    }
    
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_accounts" });//method: "eth_accounts 印出陣列 取得此網站已連接的metamask帳戶 
            console.log(accounts);
            if( accounts.length>0){
                setCurrentAccount(accounts[0])

                getAllTransactions();
                
            }else{
                console.log('no account found')
            };
            
        } catch (error) {
            console.log(error);
            throw new Error ('No ethereum object')
        }
    }

    const checkIfTransactionsExist = async()=>{
        try {
            if(ethereum){
                const transactionContract = getEthereumContract();
                const currentTransactionCount= await transactionContract.getTransferCount();
                window.localStorage.setItem('transactionCount', transactionCount)
            }           
        } catch (error) {
            console.log(error)
        }
    }

    //點擊按鈕連結metamask 帳戶 
    const connectWallet = async()=>{
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            //method: "eth_requestAccounts 打開metamask 連接wallet
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            console.log('connectWallet'+accounts)
        } catch (error) {
            console.log(error)
            throw new Error ('No ethereum object')
        } 
    }

    const sendTransaction = async ()=>{
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            //get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract(); //getEthereumContract()上面創的會return 之前創的智慧合約內容
            const parsedAmount =ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex,
                }],
              });

              const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword) //await 讓 async 函式的執行動作暫停，等到它獲得回傳的 Promise 物件後--無論執行成功（fulfilled）或失敗（rejected）--才恢復執行 async 函式
              
              setIsLoading(true);
              console.log('Loading - ' + transactionHash.hash); //這句看不懂 我們並沒有寫 .hash這方法 且hash 值為何會這麼快就和loading 一起被印出？
              await transactionHash.wait(); //this will wait for the transaction to finish
              setIsLoading(false);
              console.log('Success - ' + transactionHash.hash);

              const transactionCount = await transactionContract.getTransferCount();
              setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error)
            throw new Error ('No ethereum object')
        }
    }
        //需要呼叫這個函式所以寫useEffect
    useEffect(() => {
        checkIfWalletIsConnected(); 
        checkIfTransactionsExist();
    }, [])//[]空白因為只有剛載入時會呼叫此函式 呼叫韓式記得加（）
    
return (
    <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction,transactions,isLoading}}>
    {children}
    </TransactionContext.Provider>
    )
    }