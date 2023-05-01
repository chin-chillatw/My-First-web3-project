import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => ( //why 小括號！？

   <div className="flex border border-white rounded-md  justify-center items-center w-full p-2 mb-3"> 
      <div className={`me-2 ${color}`}>{icon}</div>
      <div className="flex-1 ">
         <h3 className="flex text-white text-xl">{title}</h3>
         <p className="text-white text-base">{subtitle}</p>
      </div>
   </div>
)

const Service = () =>{
   
   return (
   <div className="gradient-bg-services ">
      <div className="md:w-5/6 m-auto justify-center items-center md:flex md:flex-row flex-col">
         <div className="md:flex-1 p-2">
            <h1 className=" text-white text-gradient white md:text-4xl  text-3xl text-center md:text-start ">
               Service that we <br/>
               continue to improve 
            </h1>
         </div>
         <div className=" p-2 md:flex-1">
            <ServiceCard 
               color= "text-sky-400/100"
               title ="Security Guaranteed"
               icon={ <BsShieldFillCheck className="text-3xl "/>}
               subtitle ="Security is quaranteed Security is quaranteed Security is quaranteed Security is quaranteed "
            />
            <ServiceCard
               color= "text-[#6643b5]"
               title ="Best Exchange Rates"
               icon={ <BiSearchAlt className="text-3xl "/>}
               subtitle ="Best Exchange Rates Best Exchange Rates Best Exchange Rates Best Exchange Rates Best Exchange Rates Best Exchange Rates "
            />
            <ServiceCard
               color= "text-[#eb2632]"
               title ="Fastest Transaction"
               icon={ <RiHeart2Fill className="text-3xl "/>}
               subtitle ="Fastest Transaction Fastest Transaction Fastest Transaction Fastest Transaction Fastest Transaction Fastest Transaction"
            />
         </div>
      </div>
   </div>
    
   )     
}
export default Service