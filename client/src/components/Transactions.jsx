
import { TransactionContext } from "../context/TransactionContext";
import {shortenAddress} from "../utils/shortenAddress.js";
import { useContext } from "react";
import dummyData from '../utils/dummyData';

//子元件
const TransactionCard = ({addressTo, addressFrom,amount, message,timestamp,url  })=>{
  return ( 
      <div className="bg-[#393646] text-white flex-col  w-[180px] m-2 p-2 text-center rounded-md ">
         <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer" >
            <p>From: {shortenAddress(addressFrom)}</p>
         </a>
         <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer" >
            <p>To: {shortenAddress( addressTo)}</p>
         </a>
         <p>Amount: {amount} ETH</p>
         {message && <p>{message}</p>}
         
         <div className="rounded-2xl bg-black text-sm">Time: {timestamp}</div>
      </div>   
  )
}

const Transactions = () =>{
   const {currentAccount, formData,transactions} = useContext(TransactionContext);
   const { addressTo, amount, keyword, message } = formData;
   return (
    <div className="gradient-bg-transactions w-full">
      {currentAccount? (
         <div>
            <div className="p-3">
               <h3 className="text-white text-2xl text-center text-gradient ">Latest Transactions</h3>
            </div>
         </div>
      ):(
         <div>
            <h3 className="text-white text-2xl text-center text-gradient">Please connect to see your latest transactions.</h3>
         </div>
      )}
      <div className="flex flex-wrap justify-center">
         {[...transactions].reverse().map((transaction,i)=>{
            return(
               <TransactionCard key={i} {...transaction}/> //在這個情境下， {...transactions} 是 JavaScript 的 spread syntax (展開語法)。它會將物件 transactions 裡面的所有屬性展開，變成一個個的 key-value pair，並傳遞給 TransactionCard（被包起來的是子元件） 組件作為 props。
            )
         })}
      </div>
      
    </div>
   )     
}
export default Transactions