import logo from '../../images/logo.png';


const Footer = () => {
    return (
        <div className='flex w-full flex-col justify-center items-center p-4'>
            <div className='flex justify-center items-center flex-col md:flex-row'>
                <div className='flex-initial md:w-[790px]'>
                    <img src={logo} alt="logo" className='w-[160px]' />
                </div>
                <div className='flex justify-center items-center md:mt-0 mt-5'>
                    <div className='text-white text-base text-center mx-2 cursor-pointer'>浏览市场</div>
                    <div className='text-white text-base text-center mx-2 cursor-pointer'>铸造</div>
                    <div className='text-white text-base text-center mx-2 cursor-pointer'>元宇宙文创</div>
                </div>
            </div>

            <div className='flex justify-center items-center flex-col mt-5'>
                <p className='text-white text-sm text-center'>加入我们</p>
                <p className='text-white text-sm text-center'>info@nftd.com</p>
            </div>
        </div>
    )
}

export default Footer;