import React,{useContext} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";

import { TransactionContext } from "../context/TransactionContext";
import {shortenAddress} from "../utils/shortenAddress.js";

//可以重複使用的component
const Inputs = ({ placeholder, name, type, value, handleChange }) => (
   //它接收了多個 props： "placeholder"， "name"， "type"， "value" 和 "handleChange"
   <input
     placeholder={placeholder}
     type={type}
     step="0.0001"
     value={value}
     onChange={(e) => handleChange(e, name)}
     className=" my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
   />
 );

//記得加step 位數 
//handleChange函數記在 useContext裡面

function Welcome() {
   const gridStyle = "border-[0.5px] border-gray-400 text-white p-2 flex justify-center font-light text-sm ";
   ; 
   const {connectWallet, currentAccount, formData, handleChange, sendTransaction,isLoading} = useContext(TransactionContext);
  

   const handleSubmit =(e)=>{
      const { addressTo, amount, keyword, message } = formData;//解構取formData物件的值 The function first extracts the values of addressTo, amount, keyword, and message from the formData object.
      e.preventDefault();//不想要頁面重刷 
      if(!addressTo|| !amount|| !keyword || !message)return;//如果其中一個沒有值,the function returns 就不會繼續執行下面的程式
      sendTransaction();
   }

   return (
      <div className="w-full md:flex justify-center  items-center px-4">
         {/* <div className="h-full  flex-1 flex-col justify-between content-stretch"> */}
            <div className=" h-full md:ps-12 flex-1 flex-col justify-between content-stretch px-3">
               <h1 className="text-white md:text-5xl justify-center my-2 text-gradient text-5xl font-semibold">
                  Send Crypto <br /> across the world
               </h1>
               <p className="text-white text-base py-2">
                  Explore the crypto world.Buy and sell cryptos easily on Krypto.
               </p>
               {/* 如果已經連結metamask 將不再出現connect wallet 按鈕 */}
               {!currentAccount && 
                  (<button onClick={connectWallet} className="cursor-pointer bg-[#2952e3] py-2 px-7 my-4 rounded-full w-[90%] m-auto" >
                     <p className="text-white font-semibold">Connect Wallet</p>
                  </button>)
               }
               <div className="grid grid-cols-3 flex justify-center items-center my-4">
                  <div className={`rounded-tl-lg ${gridStyle} `}>Reliability</div>
                  <div className={`${gridStyle} `}>security</div>
                  <div className={`rounded-tr-lg ${gridStyle} `}>Ethereum</div>
                  <div className={`rounded-bl-lg ${gridStyle} `}>Web 3.0</div>
                  <div className={`${gridStyle} `}>Low fees</div>
                  <div className={`rounded-br-lg ${gridStyle} `}>Blockchain</div>
               </div>
            </div>
         {/* </div> */}
         
         <div className="w-full flex-1 flex-col justify-center p-4 justify-center ">
            <div>
               <div className="eth-card  rounded-lg w-[300px] mx-auto p-2 white-glassmorphism border-none md:py-4 md:mt-5">
                  <div className="flex justify-between">
                     <SiEthereum className="text-white border-2 rounded-full text-3xl p-1"></SiEthereum>
                     <BsInfoCircle className="text-white"></BsInfoCircle>
                  </div>
                  <br />
                  <br />
                  <p className="text-white font-light text-[13px]">{shortenAddress(currentAccount)}</p>
                  <p className="text-white font-semibold">Ethereum</p>
               </div>
               <div className="w-[70%] m-auto  blue-glassmorphism rounded-lg my-3 flex-col py-1 px-3">
                  <Inputs placeholder="Address To"  type= "text" name="addressTo"  handleChange={handleChange} />
                  <Inputs placeholder="Amount(ETh)" type= "number" name="amount" handleChange={handleChange}/>
                  <Inputs placeholder="Keyword(Gif)" type= "text" name="keyword" handleChange={handleChange}/>
                  <Inputs placeholder="Enter Message" type= "text" name="message" handleChange={handleChange}/>
                  <hr className="border-1 my-1"/>

                  {isLoading ?(
                     <Loader />
                  ):(
                     <button
                     type="button" 
                     className="rounded-full border-[1px] text-white border-gray-400 p-1 w-full my-2 cursor-pointer" onClick={handleSubmit} >
                  Send Now
                  </button>
                  )}
                  
                  
               </div>
            </div>
         </div>
      </div>
   );
}
export default Welcome