import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NFTCard from "./NFT/NFTCard";
import { Divider } from 'antd';
import { BiStoreAlt } from 'react-icons/bi';
import { nfts } from './Items';
const SingleCollection = () => {

  const { collectionId } = useParams();

  const NoItems = () => {
    return (
      <>
        <div className="flex flex-col mx-auto py-[60px]">
          <div className={classNames(
            "flex flex-col text-white",
            'max-w-[360px] mx-auto text-center',
          )}>
            <span className={classNames(
              'font-bold text-[26px]'
            )}>No more items found</span>
            <span className={classNames(
              'text-[#828282] text-[18px] mt-1'
            )}>Come back soon! Or try to browse something for you on our marketplace</span>
            <div className="mt-[16px]">
              <a href="" className="">
                <button type="button" className="bNwIlU mx-auto">
                  Browse marketplace
                </button>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className="bg-white">
      <div>
        <div>
          <div className="w-full">
            <div className='h-[208px] bg-cover md:h-[477px]' style={{backgroundImage: `url("https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600")` }}>
              <div className={classNames(
                  "pt-[150px] md:pt-[420px] flex justify-center align-bottom"
              )}>
                  <img className={classNames(
                  "shrink-0 w-[100px] h-[100px] rounded-full border-2 border-black"
                  )} src={'https://lh3.googleusercontent.com/bY6b8qK5NeNeFhxk_BcCBtTOtu0LAzVv2GxSYty9_OlfGh1AcDz9GIJ6m08Szz7jwmdcpsD4aKFM1i07fCp-G5aZscOM0BWKN0dseis=w600'} />
              </div>
            </div>
          <div>
          <div className="font-bold text-4xl text-center mt-12">
            {'Bean'}
          </div>
          <h1 className="text-blue-600 text-center mt-2">{`来自于品牌@${'Bean'} 和 艺术家@${'Bean'}`}</h1>
          </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
        <div className="flex p-5 mt-6 justify-center items-center bg-[#F7F9FA] rounded-xl">
          <div className="mx-7">
            <h1 className="text-gray-700 text-center">
              藏品种类
            </h1>
            <h1 className="text-black mt-2 font-bold text-2xl text-center ">
              200.0K
            </h1>
          </div>
          <Divider type='vertical' style={{height: '60px'}}/>  
          <div className="mx-7">
            <h1 className="text-gray-700 text-center">
              持有者
            </h1>
            <h1 className="text-black mt-2 font-bold text-2xl  text-center">
              100.5K
            </h1>
          </div>
          <Divider type='vertical' style={{height: '60px'}}/>    
          <div className="mx-7">
            <h1 className="text-gray-700 text-center">
              地板价
            </h1>
            <h1 className="text-black mt-2 font-bold text-2xl text-center">
              <span className="text-xl">￥</span> 100.0
            </h1>
          </div>
          <Divider type='vertical' style={{height: '60px'}}/>    
          <div className="mx-7">
            <h1 className="text-gray-700 text-center">
              交易总额
            </h1>
            <h1 className="text-black mt-2 font-bold text-2xl text-center">
              200.7K
            </h1>
          </div>
        </div>
        </div>
        <div className="block py-4">
          <p className="text-gray-700 text-center">
            {'introduction'}
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center text-black font-semibold text-xl pt-4">
            <BiStoreAlt fontSize={23} style={{marginTop: '3px', marginRight: '10px'}}/> 所有藏品
          </div>
          <Divider style={{marginTop: '20px'}}/>
        </div>
        <div className="flex mt-8 pb-16 justify-center items-center">
          <div className="w-[1000px] grid md:grid-cols-4 md:gap-[67px] gap-[52px] grid-cols-3 mx-3">
              {nfts.map((item, index) => <NFTCard key={index} props={item} />)}
          </div>
        </div>

      </div>
    </div>
  );
};
export default SingleCollection;
