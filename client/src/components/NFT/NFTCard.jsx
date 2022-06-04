import React, { useEffect, useState } from "react";
import { Divider, Badge } from 'antd';
import { Link } from "react-router-dom";
import { MdVerified } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
const NFTCard = ({ props }) => {

  return (
    <Badge.Ribbon text={`限量${props.number}个`} size="small" style={{borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', fontSize: '10px'}} className='eBApMP'>
    <div className="flex flex-col w-[200px] h-[340px] rounded-[10px] bg-white shadow hover:brightness-105">
      <Link to={`/assets/${props.collection}/${props.id}`}>
      <div>
            <img style={{ width: '200px', height: '200px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} src={ props.token }/>
      </div>
      </Link>    
        <div className="flex flex-col mx-3 mt-3">
          <div className="flex justify-between items-center"><div className="flex text-gray-700 text-base font-semibold">{props.collection}<div className="flex items-center justify-center ml-1"><MdVerified color='#778df6' fontSize={16}/></div></div></div>
          <div className="flex justify-between text-black font-semibold"><span>{props.name}</span><Link to={`/assets/1405`}><span className="text-black">#{props.id}</span></Link></div>
        <div className="flex font-semibold items-end mt-1"><span className="text-gray-700 text-xs">当前价格</span><sapn className="flex ml-2 text-base items-center -mb-[2px] text-black">{props.price}￥</sapn></div>
        <Divider style={{ margin: '8px 0' }} />
          <div className="flex items-center justify-between"><div className="flex justify-center items-center eBApMP text-white font-semibold rounded-full cursor-pointer w-[100px] h-[30px]">购买</div> <AiOutlineHeart fontSize={20} color='#BEBEBE'/></div>   
        </div>
      </div>
    </Badge.Ribbon>
  );
};
export default NFTCard;