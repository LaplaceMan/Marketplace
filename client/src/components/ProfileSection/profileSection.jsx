import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react'
import { WalletContext } from '../../context/WalletContext';
import NFTCard from '../NFT/NFTCard';
import { nfts } from '../Items';

export default function ProfileSection() {
  const { connectWallet, currentAccount } = useContext(WalletContext);
  const [onSale, setOnSale] = useState(true);
  const [owned, setOwned] = useState(false);
  const [bought, setBought] = useState(false);
  const [nftList, setNftList] = useState([]);
  

  const NoItems = () => {
    return (
      <>
        <div className="flex flex-col mx-auto my-[60px]">
          <div className={classNames(
            "flex flex-col text-white",
            'max-w-[360px] mx-auto text-center',
          )}>
            <span className={classNames(
              'font-bold text-[26px]'
            )}>{`没有发现任何数字藏品`}</span>
            <span className={classNames(
              'text-[#828282] text-[18px] mt-1'
            )}>请刷新页面重试! 或者前面前往售卖中心选购心仪的数字藏品</span>
            <div className="flex mt-[16px] justify-center">
              <div className='bg-[#2952e3] text-white py-2 rounded-full cursor-pointer  hover:bg-[#2546bd] w-[200px]'>
                前往数字藏品市场
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='flex justify-center'>
      <div className={classNames(
        "mt-[30px] mb-[100px] md:w-[1000px] w-[700px]",
      )}>
        <div className='max-w-[1000px] mx-auto rounded-[15px] h-[260px] bg-cover' style={{backgroundImage: `url("https://lh3.googleusercontent.com/P3RpreFAUcZIt1FeVB-y2o95x3zw7DWBU9dXsihVsgdfElfZcl0_8g601ydvtTaOIIN6Pae0VXmZTuN_xictxe6_DsCmR0pO_dSFZg=h600")`}}>
          <div className={classNames(
            "pt-[200px] flex justify-center align-bottom"
          )}>
            <img className={classNames(
              "shrink-0 w-[100px] h-[100px] rounded-[50%]"
            )} src={'https://lh3.googleusercontent.com/bY6b8qK5NeNeFhxk_BcCBtTOtu0LAzVv2GxSYty9_OlfGh1AcDz9GIJ6m08Szz7jwmdcpsD4aKFM1i07fCp-G5aZscOM0BWKN0dseis=w600'} />
          </div>
        </div>
        <p className='flex items-center justify-center text-gray-400 text-[14px] font-bold mt-[3.5rem] py-1 eBApMP mx-auto rounded-[20px] max-w-[370px]'>
          {currentAccount}
        </p>

        <div className='mt-[30px]'>
          <div className='flex justify-center'>
            <div className={classNames(
              'hover:cursor-pointer ',
              'text-[16px] mx-3 font-semibold',
              owned ? 'text-white' : 'text-gray-400 nLPsul'
            )} onClick={() => {
              if (owned === false) {
                setOwned(true);
                setOnSale(false);
                setBought(false);
              }
            }}>已拥有</div>
            
            <div className={classNames(
              'hover:cursor-pointer ',
              'text-[16px] mx-3 font-semibold',
              onSale ? 'text-white' : 'text-gray-400 nLPsul'
            )} onClick={() => {
              if (onSale === false) {
                setOnSale(!onSale);
                setOwned(false);
                setBought(false);
              }
              }} >在售中</div>
            
            <div className={classNames(
              'hover:cursor-pointer ',
              'text-[16px] mx-3 font-semibold',
              bought ? 'text-white' : 'text-gray-400 nLPsul'
            )} onClick={() => {
              if (bought === false) {
                setOnSale(false);
                setOwned(false);
                setBought(true);
              }
            }}>待支付</div>
          </div>
          
          <div className=' w-full h-[0.25px] bg-gray-400 mt-5' />

          {nftList.length === 0 && (onSale || bought) && <NoItems info='item' />}

          <div className='flex-initial mt-[50px] grid md:grid-cols-4 gap-[50px] md:gap-[66px] grid-cols-3'>
            {nftList.length > 0 && onSale && <>
              {
                nftList.filter((nft) => {
                  return nft.isListed && nft.seller.toLowerCase() === currentAccount.toLowerCase()
                }).map((nft, index) => {
                    return <div key={index}><Card props={nft} /></div>;
                })
              }
            </>}
            {owned && <>
              {
                nfts.map((item, index) => <NFTCard key={index} props={item} />)
                // nftList.filter((nft) => {
                //   return nft.owner.toLowerCase() === currentAccount.toLowerCase()
                // }).map((nft, index) => {
                //     return <div key={index}><Card props={nft} /></div>;
                // })
              }
            </>}
            {nftList.length > 0 && bought && <>
              {
                nftList.filter((nft) => {
                  return nft.sold && nft.owner.toLowerCase() === currentAccount.toLowerCase();
                }).map((nft, index) => {
                  if (nft.sold) {
                    return <div key={index}><Card props={nft} /></div>;
                  }
                  return
                })
              }
              </>}
          </div>
        </div>
      </div>
    </div>
  )
}
