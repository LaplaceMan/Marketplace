import React, { useState, useEffect } from 'react';
import { Image, Collapse, Statistic, Table, Tag } from 'antd';
import { MdVerified, MdShare, MdSubject, MdOutlineSell, MdStackedLineChart, MdTransferWithinAStation } from 'react-icons/md';
import { AiFillEye, AiFillHeart } from 'react-icons/ai';
import { txColumns, txData } from '../../utils/constants';
import { Area } from '@ant-design/plots';
const { Panel } = Collapse;
const { Countdown } = Statistic;
const SingleNFT = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        asyncFetch();
      }, []);
    
      const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };
      const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          tickCount: 5,
        },
        animation: false,
        slider: {
          start: 0.1,
          end: 0.9,
          trendCfg: {
            isArea: true,
          },
        },
      };
    return (
        <div className="bg-white flex justify-center">
            <div className="flex flex-col w-[1000px] sm:items-center">
            <div className="flex py-[50px] md:flex-row flex-col">
               <div className="bg-black w-[485px] h-[485px] rounded-2xl">
                    <Image width={485} height={485} src="https://lh3.googleusercontent.com/USUavewrlztyR00nH5oOUKkVp0sJBpaQpa7MQL6a4Edlqhu0sZI3-J3ZVBL9ziC4JyPlOe0D5XwF3mxv9ZXcRKvfA9vRKdDPCxbkYCc=w600" style={{ borderRadius: '16px' }} />
                </div>
                <div className="flex flex-col md:ml-[25px] rounded-xl h-[485px] w-[485px] border p-5 mt-[20px] md:mt-[0px]">
                    <div className='flex text-xl font-semibold text-[#2952e3]'>
                        测试作品
                        <div className="flex items-center justify-center ml-2"><MdVerified color='#2952e3' fontSize={25}/></div>    
                    </div>
                    <div className="flex mt-[10px] font-semibold text-[30px]">#4396</div>    
                    <div className='flex mt-[15px] items-center text-[#696969]'>
                        <AiFillEye color='#696969' fontSize={19} /><div style={{ fontSize: '16px', marginLeft: '5px', lineHeight: '20px' }}>100K</div> 
                        <AiFillHeart color='#696969' fontSize={19} style={{ marginLeft: '10px' }} /><div style={{ fontSize: '16px', marginLeft: '5px', lineHeight: '20px' }}>100K</div>
                        <MdShare color='#696969' fontSize={19} style={{marginLeft: '10px'}}/><div style={{ fontSize: '16px', marginLeft: '5px', lineHeight: '20px' }}>分享</div>    
                    </div>
                    <div className='flex flex-col mt-[20px] border rounded-md h-[170px]'>
                        <div className='bg-[#fafafa] border-b h-[35px] flex p-2 items-center rounded-t-md text-[#696969]'>
                            <MdSubject fontSize={16} color="#696969" style={{marginRight: '5px'}}/>
                            介绍    
                        </div>
                        <div className='m-[10px] text-[#696969]'>
                            杀手GF是一个由前Riot Games艺术家Zeronis创作的7777个生成性肖像艺术集, 有超过240个精心设计的特征, 对比了可爱和有美感的女友, 而这些女友也恰好是危险的刺客。
                        </div>
                        <div className='flex w-full ml-[10px]'>
                            {/* <div className='flex items-center h-[25px] w-[150px] border border-[#B0C4DE] bg-[#f0f5ff] rounded-sm text-[#2952e3] justify-center mr-[10px]'>创作者:<div className='ml-[10px]'>0x374...589</div></div>
                            <div className='flex items-center h-[25px] w-[150px] border border-[#2952e3] bg-[#f0f5ff] rounded-sm text-[#2952e3] justify-center'>持有者:<div className='ml-[10px]'>0x374...589</div></div> */}
                            <Tag color="magenta">ERC-721</Tag>
                            <Tag color="volcano">头像</Tag>
                            <Tag color="orange">持有者: 0x374...589</Tag>    
                            <Tag color="cyan">艺术家: 0x374...589</Tag>
                        </div>
                    </div>
                    <div className='flex flex-col mt-[15px] border rounded-md h-[130px]'>
                        <div className='bg-[#fafafa] border-b h-[35px] flex p-2 items-center rounded-t-md text-[#696969]'>
                            <MdOutlineSell fontSize={16} color="#696969" style={{marginRight: '5px'}}/>
                            售卖 
                        </div> 
                        <div className='flex flex-col m-[10px] text-[#696969]'>

                            <div className='flex justify-center items-center'>
                                <div className='flex flex-col items-start'>
                                    <div>当前价格</div>
                                    <div className='text-2xl font-semibold text-black'>￥10.2K</div>    
                                </div>
                                <div className='w-[2px] bg-gray-100 h-3/4 mx-[60px]' />
                                <div className='flex flex-col items-start'>
                                <div>剩余时间</div>
                                        <div className='text-2xl font-semibold text-black'><Countdown value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30}/></div>    
                                </div>    
                            </div>   
                        </div>      
                    </div>
                </div>
            </div>
            <Collapse defaultActiveKey={['1']} style={{ borderRadius: '6px', marginBottom: '30px' }} expandIcon={() => <MdStackedLineChart fontSize={16} color="#696969" />} className="md:w-full w-[500px]">
                <Panel header="价格走势" key="1">
                        <Area {...config} />
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['1']} style={{ borderRadius: '6px', marginBottom: '30px' }} expandIcon={()=> <MdTransferWithinAStation fontSize={16} color="#696969"/>} className="md:w-full w-[500px]">
                <Panel header="交易记录" key="1">
                <Table columns={txColumns} dataSource={txData} pagination={false} scroll={{ y: 240 }}/>
                </Panel>
            </Collapse> 
            <div className='flex h-[100px] border bg-white mb-[50px] p-2 items-center justify-between shadow-inner md:w-full w-[500px]'>
                <div className='flex items-center'>
                    <img src="https://lh3.googleusercontent.com/USUavewrlztyR00nH5oOUKkVp0sJBpaQpa7MQL6a4Edlqhu0sZI3-J3ZVBL9ziC4JyPlOe0D5XwF3mxv9ZXcRKvfA9vRKdDPCxbkYCc=w600" style={{ width: '80px', height: '80px', marginLeft: '5px' }} />
                    <div className='flex flex-col text-[#696969] ml-[15px]'>
                        Series 4395 of 7777 
                        <div className='font-semibold text-[30px] text-black'>测试作品</div>    
                    </div>  
                </div> 
                <div className='flex flex-col mr-[5px] items-center justify-center'>
                    <div className='eBApMP py-[15px] px-[70px] rounded-full cursor-pointer text-sm items-center'>
                        立即购买     
                    </div> 
                    <div className='mt-[10px] text-[#696969] text-[10px]'>3%的收益归创作者, 2%的收益归平台</div>        
                </div>    
                </div>      
            </div>
        </div>
    );
}

export default SingleNFT;