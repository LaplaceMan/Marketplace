import { useContext, useState } from 'react';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { WalletContext } from '../context/WalletContext';
import { shortenAddress } from '../utils/shortnerAddress';


const NavbarItem = ({item, classProps}) => {
    return (
        <Link to={item.link}>
            <li className={`mx-4 cursor-pointer text-white ${classProps}`}>
                {item.title}
            </li>
        </Link>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { connectWallet, currentAccount} = useContext(WalletContext);
    return (
        <nav className='flex md:justify-center justify-between items-center p-4 gradient-bg-nabar'>
            <Link to="/">
                <img src={logo} className='w-[160px] cursor-pointer' />
            </Link>
            <div className='flex w-[220px] rounded-full bg-white h-[35px] items-center md:mr-[130px] md:ml-[130px] mx-2'>
                <div style={{marginLeft: '10px', marginRight: '5px'}}><AiOutlineSearch fontSize={25} color="#2952e3"/></div>
                <input type='search' style={{width: '160px', height: '100%', outline: 'none', fontSize: '18px'}}/>
            </div>
            <ul className='md:flex hidden list-none flex-row justify-between items-center flex-initial mb-0'>
                {[{ title: "浏览市场", link: 'marketplace' }, { title: "铸造", link: 'create' }, { title: "元宇宙文创", link: 'main-network'}].map((item, index) => (
                    <NavbarItem key={index} item={item} /> //{ title: "社区", link: 'community' },
                ))}
            </ul>
            <div className='flex items-center'>
            {!currentAccount ?
                (<div onClick={connectWallet} className='bg-[#2952e3] text-white py-2 px-7 ml-4 mr-4 md:mr-0 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    连接钱包
                </div>) : 
                (<Link to='/profile'>
                    <div className='eBApMP py-2 px-7 ml-4 mr-4 md:mr-0 rounded-full cursor-pointer text-sm'>
                        {shortenAddress(currentAccount)}
                    </div>
                </Link>)
            }

            <div className='flex relative w-[28px] md:w-0'>
                {toggleMenu ? 
                <AiOutlineClose fontsize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} /> 
                : 
                <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} /> }
                {toggleMenu && (
                    <ul 
                        className='z-10 fixed top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list:none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
                    >
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {[{ title: "浏览市场", link: 'marketplace' }, { title: "铸造", link: 'create' }, { title: "元宇宙文创", link: 'main-network' }, {title: '个人中心', link: 'profile'}].map((item, index) => (
                            <NavbarItem key={index} item={item} classProps={"my-2 text-lg"} /> //{ title: "社区", link: 'community' }, 
                        ))} 
                    </ul>
                )}
            </div>
            </div>    
        </nav>
    )
}

export default Navbar;