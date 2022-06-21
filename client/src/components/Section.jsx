import NFTCard from './NFT/NFTCard';
import CollectionCard from "./Collection/CollectionCard";
import { Select } from 'antd';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { nfts, collections } from './Items';
const { Option } = Select;
const NftSection = () => {
  const SortBy = () => {
    return (
        <div className="flex justify-between items-center">
        <div className="flex mb-8 border-solid border rounded-full items-center" style={{width: 130}}>
        <Select defaultValue="all" bordered={false} showArrow={false} dropdownStyle={{borderRadius: '10px'}} style={{ width: 100, color: "white" }}>
          <Option value="all">所有</Option>
          <Option value="avatar">头像</Option>
          <Option value="cover">封面</Option>
          <Option value="background">背景</Option>
        </Select>
        <AiOutlineCaretDown color='#fff' fontSize={20} style={{marginRight: '10px'}}/>
        </div>
      <div className="flex mb-8 eBApMP cursor-pointer rounded-full justify-center items-center text-white" style={{ width: 130, height: 33 }}>
          查看更多
      </div>
    </div>
    );
  }

  return (
      <div className="flex w-full flex-col mt-5 mb-10 items-center">
      <div className="flex flex-col w-[700px] md:w-[980px]">
        <h1 className="flex text-white font-bold text-3xl justify-center items-center mt-5 mb-10">
          热门系列
        </h1>
        <SortBy />
        <div className="flex-initial justify-between grid md:grid-cols-3 md:gap-12 gap-24 grid-cols-2">
          {collections.map((item, index) => <CollectionCard key={index} collection={item}/>)}
        </div>
        <h1 className="flex text-white font-bold text-3xl justify-center items-center my-10">
           热门藏品
        </h1>
        <SortBy />
        <div className="flex-initial justify-between grid md:grid-cols-4 gap-[50px] md:gap-[60px] grid-cols-3">
          {nfts.map((item, index) => <NFTCard key={index} props={item}/>)}
        </div>
      </div>  
      </div>
  );
};
export default NftSection;
