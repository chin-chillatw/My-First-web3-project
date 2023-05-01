import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../../images/logo.png';
import { useState } from "react";

//NavItem元件
const NavItem = ({ title, classprops }) => (
   <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
 );
 

const Navbar = () =>{
   const [toggleNavItem,setToggleNavItem]= useState(false);
   return (
      <nav className=" w-full flex md:justify-center justify-between p-4 items-center"> 
    {/*上面 0-最大768都是justify-center 我要justify-center 其他都justify-between  */} 
    {/* Use items-center to align items along the center of the container’s cross axis: */}
         <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" />
         </div>
   
         <ul className=" text-white justify-center items-center hidden md:flex">
            {[ "Market", "Exchange", "Tutorials", "Wallets"].map((item, index)=>(
            <NavItem key={item + index} title={item}/>
                 /* 因為箭頭函示 {}中放的是 jsx code 所以把{} 替換成（） */
            ))}
            <li className="mx-4 cursor-pointer bg-[#2952e3] py-2 px-7 mx-4 rounded-full hover:bg-slate-300 ">Login</li> 
         </ul>

      <div className="relative">       
         {!toggleNavItem && (
            <HiMenuAlt4 fontSize="28px" className="text-white md:hidden" onClick={()=>setToggleNavItem(true)} />
         )}   
         {toggleNavItem && (
            <AiOutlineClose fontSize="28px" className="text-white md:hidden" onClick={()=>setToggleNavItem(false)}  />
         )}

         {toggleNavItem && (
            <ul className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-center items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            {/* Use fixed to position an element relative to the browser window. */}
               <li>
                  <AiOutlineClose fontSize="28px" className="md:hidden text-xl " onClick={()=>setToggleNavItem(false)}  />
               </li>
               {[ "Market", "Exchange", "Tutorials", "Wallets"].map((item, index)=>(
                  <NavItem key={item + index} title={item} classprops=" text-lg"/>
               ))}
            </ul>
         )} 
      </div> 
    </nav>
   ); 
};
export default Navbar;