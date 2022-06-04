import { useState } from "react";
import { Select, Popover, InputNumber, Radio, Button } from 'antd';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BiSort, BiFilter, BiBarChartAlt } from 'react-icons/bi';
import NFTCard from './NFT/NFTCard';
import { nfts, collections } from './Items';

const { Option } = Select;
const Marketplace = () => {
    const [radioState, setRadioState] = useState({ all: true, avatar: false, cover: false, background: false });
    const filter = () => {
        return (
            <div className="flex flex-col">
                <div className="font-semibold text-sm mb-2">价格范围</div>
                <div><InputNumber min={0} placeholder='最低价' style={{marginRight: '8px'}}/><InputNumber min={1} placeholder='最高价'/></div>
                <div className="font-semibold text-sm my-2">售卖方式</div>
                <Radio.Group style={{ width: '100%', marginBottom: '15px' }}>
                    <Radio.Button value="buy" style={{width: '50%', textAlign: 'center'}}>直售</Radio.Button>
                    <Radio.Button value="auction" style={{width: '50%', textAlign: 'center'}}>拍卖</Radio.Button>
                </Radio.Group>
                <div className="flex eBApMP w-full h-[32px] justify-center items-center font-medium rounded-sm cursor-pointer">应用</div>
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center" style={{marginTop: '50px'}}>
            <div className="flex w-[1000px] flex-col justify-center items-center">
                <div className="font-bold text-white text-4xl mb-10">探索数字藏品</div>
                <div className="flex w-full justify-between px-3 md:px-0">
                <div className="flex mb-8 border-solid border rounded-full items-center eBApMP md:hidden" style={{ width: 100, height: 38 }}>
                    <BiBarChartAlt fontSize={27} color='white' style={{marginLeft: '10px'}}/>
                    <Select defaultValue="all" bordered={false} showArrow={false} dropdownStyle={{ borderRadius: '2px', width: '100px' }} style={{ width: 100, color: "white" }} >
                      <Option value="all">全部</Option>
                      <Option value="avatar">头像</Option>
                      <Option value="cover">封面</Option>
                      <Option value="background">背景</Option>
                    </Select>
                    <AiOutlineCaretDown color='#fff' fontSize={20} style={{marginRight: '10px'}}/>
                </div>        
                <div className="md:flex sm:hidden">                       
                    <div className={`flex px-5 h-[38px] mr-2 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.all ? 'bg-[#0f0e13]': 'eBApMP'}`} onClick={()=> setRadioState({all: true})}>
                        全部
                    </div>
                    <div className={`flex px-5 h-[38px] mr-2 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.avatar ? 'bg-[#0f0e13]': 'eBApMP'}`} onClick={()=> setRadioState({avatar: true})}>
                        头像
                    </div>
                    <div className={`flex px-5 h-[38px] mr-2 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.cover ? 'bg-[#0f0e13]': 'eBApMP'}`} onClick={()=> setRadioState({cover: true})}>
                        封面
                    </div>
                    <div className={`flex px-5 h-[38px] items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.background ? 'bg-[#0f0e13]': 'eBApMP'}`} onClick={()=> setRadioState({background: true})}>
                        背景
                    </div>    
                </div>
                <div className="flex">    
                <div className="flex mb-8 border-solid border rounded-full items-center mr-5" style={{ width: 100, height: 38 }}>
                    <Select defaultValue="all" bordered={false} showArrow={false} dropdownStyle={{borderRadius: '2px'}} style={{ width: 100, color: "white", marginLeft: '10px' }} >
                      <Option value="all">所有</Option>
                      <Option value="collection">系列</Option>
                      <Option value="item">单品</Option>
                    </Select>
                    <AiOutlineCaretDown color='#fff' fontSize={20} style={{marginRight: '10px'}}/>
                </div>
                <div className="flex mb-8 border-solid border rounded-full justify-between items-center eBApMP mr-5 cursor-pointer" style={{ width: 135, height: 38 }}>
                    <BiFilter fontSize={20} color='white' style={{marginLeft: '10px'}}/>
                    <Popover placement="bottom" content={filter} trigger="click">
                        <div className="text-white pr-7">筛选</div>
                    </Popover>
                    <AiOutlineCaretDown color='#fff' fontSize={14} style={{marginRight: '10px'}}/>        
                </div>         
                <div className="flex mb-8 border-solid border rounded-full items-center eBApMP" style={{ width: 135, height: 38 }}>
                    <BiSort fontSize={25} color='white' style={{marginLeft: '10px'}}/>
                    <Select defaultValue="default" bordered={false} showArrow={false} dropdownStyle={{ borderRadius: '2px', width: '130px' }} style={{ width: 135, color: "white" }} >
                      <Option value="default">默认</Option>
                      <Option value="recently">最新发布</Option>
                      <Option value="lowPrice">最低价格</Option>
                      <Option value="highPrice">最高价格</Option>
                      <Option value="mostLike">最多收藏</Option>
                    </Select>
                    <AiOutlineCaretDown color='#fff' fontSize={20} style={{marginRight: '10px'}}/>
                </div>               
                </div>    
                </div>
                <div className="flex-initial justify-between grid md:grid-cols-4 gap-[50px] md:gap-[60px] grid-cols-3 mt-5 mb-10">
                    {nfts.map((item, index) => <NFTCard key={index} props={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Marketplace;