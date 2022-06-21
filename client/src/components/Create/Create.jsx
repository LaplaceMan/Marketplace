import React, { useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineDown, AiOutlineBulb, AiOutlineCloudUpload } from 'react-icons/ai';
import { Select } from 'antd';

const { Option } = Select;


const DescTag = ({desc}) => {
    return <div className='text-white text-[20px] mb-[12px] mt-[22px]'>{desc}</div>
}

const DescInfo = ({ desc }) => {
    return <div className='text-[#D3D3D3] flex items-center mb-[10px] mt-[-5px]'><AiOutlineInfoCircle color='#D3D3D3' style={{ marginRight: '5px', textAlign: 'center', marginTop: '1px' }} />{desc}</div>
}

const Input = ({ type, name }) => {
    return <input min={0} style={{ outline: 'none', borderRadius: '10px', background: '#2b2836', color: 'white', width: '600px', height: '36px', padding: '5px 15px', fontSize: '18px' }} type={type} name={name} />
}

const TextArea = () => {
    return <textarea style={{outline: 'none', borderRadius: '10px', background: '#2b2836', color: 'white', width: '600px', padding: '5px 15px', fontSize: '18px', resize: 'none', height: '150px', overflow: 'hidden'}}></textarea>
}

const UploadImage = ({ operation, file, name }) => {
    return  <label className="flex flex-col cursor-pointer rounded-[10px] font-medium text-white bg-[#2b2836] w-[300px] h-[200px] border border-dashed items-center justify-center">
    <AiOutlineCloudUpload fontSize={50} className={`${file ? 'hidden': ''}`} />
    <span className={`font-bold ${file ? 'hidden': ''}`} >上传源文件</span>
    <img src={file} style={{maxWidth: '295px', maxHeight: '195px'}} />
    <input id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/svg, audio/mpeg, video/mp4" className="sr-only" onChange={(e) => operation(e, name)} />
</label>
}
const NewSelect = ({ options }) => {
    return <Select defaultValue={options[0]} bordered={false} suffixIcon={<AiOutlineDown color='white' fontSize={15}/>} style={{ outline: 'none', borderRadius: '10px', background: '#2b2836', color: 'white', width: '600px', height: '36px', fontSize: '18px' }}>
        {options.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
    </Select> 
}

export default function Create() {
    const [radioState, setRadioState] = useState({ list: true, update: false, 
        create721: false, create1155: false
    });
    const [update1155File, setUpdate1155File] = useState();
    const [create721File, setCreate721File] = useState({ logo: null, default: null, banner: null })
    const [create1155File, setCreate1155File] = useState({logo: null, default: null, banner: null})
    const handleChangeUpdate1155File = async (e) => {
        if (e.target.files[0]) {
            // const data = e.target.files[0];
            // const reader = new window.FileReader();
            // reader.readAsDataURL(data);
            const url = URL.createObjectURL(e.target.files[0]);
            setUpdate1155File(url);
        }
    }   
    
    const handleChangeCreate721 = async (e, name) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setCreate721File((prevState) => ({ ...prevState, [name]: url }));
        }
    }

    const handleChangeCreate1155 = async (e, name) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setCreate1155File((prevState) => ({ ...prevState, [name]: url }));
        }
    }
    
    return (
        <div className="flex justify-center items-center  mb-[100px]" >
         <div className="flex w-[1000px] flex-col justify-center items-center">
            <div className="font-bold text-white text-4xl mt-[50px] text-center">创造数字藏品</div>
            <div className="flex w-full justify-between my-10">
            <div className="md:flex sm:hidden">                       
                <div className={`flex px-5 h-[38px] mr-3 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.list ? 'bg-[#2b2836]': 'eBApMP'}`} onClick={()=> setRadioState({list: true})}>
                    上架市场
                </div>
                <div className={`flex px-5 h-[38px] mr-3 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.update ? 'bg-[#2b2836]': 'eBApMP'}`} onClick={()=> setRadioState({update: true})}>
                    更新系列
                </div>
                <div className={`flex px-5 h-[38px] mr-3 items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.create721 ? 'bg-[#2b2836]': 'eBApMP'}`} onClick={()=> setRadioState({create721: true})}>
                    创建ERC-721标准系列
                </div>
                <div className={`flex px-5 h-[38px] items-center justify-center text-white font-bold rounded-full cursor-pointer ${!radioState.create1155 ? 'bg-[#2b2836]': 'eBApMP'}`} onClick={()=> setRadioState({create1155: true})}>
                    创建ERC-1155标准系列
                </div>    
            </div>
            </div>
            <div className='flex flex-col w-full rounded-3xl items-center md:items-start'>
                {radioState.list &&
                    <>
                        <div className='text-[#D3D3D3] flex items-center mb-[10px] text-base'><AiOutlineBulb color='#D3D3D3' style={{ marginRight: '5px' }} />将您的藏品授权给该市场以进行售卖</div>
                        <DescTag desc="藏品合约地址"/>
                        <Input type="text" name="address" />
                        <DescTag desc="藏品合约标准"/>
                        <NewSelect options={["ERC-721", "ERC-1155"]} />
                        <DescTag desc="上架藏品编号" />
                        <Input type="number" name="id" />
                        <DescTag desc="售卖价格" />
                        <DescInfo desc="当以拍卖的形式挂单时, 这里的价格是每个单品的最低价"/>
                        <Input type="number" name="price" />
                        <DescTag desc="拍卖时限" />
                        <DescInfo desc="当提交上架请求且交易成功后到拍卖结束的预定时间, 以秒计时, 直售方式为空" />
                        <Input type="number" name="deadline" />
                        <div className='px-[35px] py-[15px] eBApMP rounded-[10px] items-center justify-center mt-[50px] font-bold text-xl cursor-pointer'>上架藏品</div>
                    </>
                }
                {radioState.update && 
                    <>
                        <div className='text-[#D3D3D3] flex items-center mb-[10px] text-base'><AiOutlineBulb color='#D3D3D3' style={{ marginRight: '5px' }} />在您已创建的ERC-1155标准的系列中添加新藏品</div>
                        <DescTag desc="系列合约地址" />
                        <Input type="text" name="address" />
                        <DescTag desc="新藏品名称" />
                        <Input type="text" name="name" />
                        <DescTag desc="新藏品总量" />
                        <Input type="number" name="supply" />
                        <DescTag desc="新藏品类型"/>
                        <NewSelect options={["头像", "背景", "封面"]} />
                        <DescTag desc="新藏品介绍" />
                        <TextArea />
                        <DescTag desc="新藏品单价" />
                        <DescInfo desc="铸造时除交易费支付的购买单个藏品的费用"/>
                        <Input type="number" name="price" />
                        <DescTag desc="最大铸造数" />
                        <DescInfo desc="同一用户最大可同时铸造藏品数量, 应小于总量"/>
                        <Input type="number" name="mint" />
                        <DescTag desc="公开铸造时间" />
                        <DescInfo desc="设定允许任意用户铸造藏品的开始时间"/>
                        <Input type="date" name="time"/>
                        <div className='px-[35px] py-[15px] eBApMP rounded-[10px] items-center justify-center mt-[50px] font-bold text-xl cursor-pointer'>添加新藏品</div>
                    </>        
                }
                {radioState.create721 && 
                    <>
                    <div className='text-[#D3D3D3] flex items-center mb-[10px] text-base'><AiOutlineBulb color='#D3D3D3' style={{ marginRight: '5px' }} />创建ERC-721标准的系列藏品并默认上架该市场</div>
                    <DescTag desc="系列藏品名称" />
                    <Input type="text" name="name" />
                    <DescTag desc="系列藏品符号" />
                    <DescInfo desc="以英文标识, 例如BAYC"/>
                    <Input type="text" name="symbol" />
                    <DescTag desc="系列藏品类型"/>
                    <NewSelect options={["头像", "背景", "封面"]} />
                    <DescTag desc="系列藏品介绍" />
                    <TextArea />
                    <DescTag desc="系列藏品单价" />
                    <DescInfo desc="铸造时除交易费支付的购买单个藏品的费用"/>
                    <Input type="number" name="price" />
                    <DescTag desc="最大铸造数" />
                    <DescInfo desc="同一用户最大可同时铸造藏品数量, 应小于总量"/>
                    <Input type="number" name="mint" />
                    <DescTag desc="公开铸造时间" />
                    <DescInfo desc="设定允许任意用户铸造藏品的开始时间"/>
                    <Input type="date" name="time" />
                    <DescTag desc="系列藏品URL" />
                    <DescInfo desc="映射藏品源文件的存储地址, 此处为基本地址"/>
                    <Input type="text" name="url"/>    
                    <DescTag desc="LOGO图像" />
                    <DescInfo desc="此图像用于导航时的基本展示信息"/>
                    <UploadImage operation={handleChangeCreate721} file={create721File.logo} name="logo"/>
                    <DescTag desc="默认图像" />
                    <DescInfo desc="此图像用于盲盒发售且未公布开盒结果时藏品的默认显示"/>
                    <UploadImage operation={handleChangeCreate721} file={create721File.default} name="default"/>    
                    <DescTag desc="横幅图像" />
                    <DescInfo desc="此图像用于显示在藏品系列页面的顶部"/>
                    <UploadImage operation={handleChangeCreate721} file={create721File.banner} name="banner" />  
                    <div className='px-[35px] py-[15px] eBApMP rounded-[10px] items-center justify-center mt-[50px] font-bold text-xl cursor-pointer'>创建新系列</div>
                    </>
                }
                {radioState.create1155 && 
                    <>
                    <div className='text-[#D3D3D3] flex items-center mb-[10px] text-base'><AiOutlineBulb color='#D3D3D3' style={{ marginRight: '5px' }} />创建ERC-1155标准的系列藏品并默认上架该市场</div>
                    <DescTag desc="系列藏品名称" />
                    <Input type="text" name="name" />
                    <DescTag desc="系列藏品符号" />
                    <DescInfo desc="以英文标识, 例如BAYC"/>
                    <Input type="text" name="symbol" />
                    <DescTag desc="系列藏品介绍" />
                    <TextArea />
                    <DescTag desc="系列藏品URL" />
                    <DescInfo desc="映射藏品源文件的存储地址, 此处为基本地址"/>
                    <Input type="text" name="url"/>   
                    <DescTag desc="LOGO图像" />
                    <DescInfo desc="此图像用于导航时的基本展示信息"/>
                    <UploadImage operation={handleChangeCreate1155} file={create1155File.logo} name="logo"/>
                    <DescTag desc="默认图像" />
                    <DescInfo desc="此图像用于盲盒发售且未公布开盒结果时藏品的默认显示"/>
                    <UploadImage operation={handleChangeCreate1155} file={create1155File.default} name="default"/>    
                    <DescTag desc="横幅图像" />
                    <DescInfo desc="此图像用于显示在藏品系列页面的顶部"/>
                    <UploadImage operation={handleChangeCreate1155} file={create1155File.banner} name="banner" />  
                    <div className='text-[#D3D3D3] flex items-center mt-[30px] mb-[10px] text-base'><AiOutlineBulb color='#D3D3D3' style={{ marginRight: '5px' }} />默认创建的第一个数字藏品</div>
                    <DescTag desc="默认藏品名称" />
                    <Input type="text" name="name" />
                    <DescTag desc="默认藏品总量" />
                    <Input type="number" name="supply" />
                    <DescTag desc="默认藏品类型" />
                    <NewSelect options={["头像", "背景", "封面"]} />
                    <DescTag desc="默认藏品单价" />
                    <DescInfo desc="铸造时除交易费支付的购买单个藏品的费用" />
                    <Input type="number" name="price" />
                    <DescTag desc="默认藏品最大铸造数" />
                    <DescInfo desc="同一用户最大可同时铸造藏品数量, 应小于总量"/>
                    <Input type="number" name="mint" />
                    <DescTag desc="默认藏品公开铸造时间" />
                    <DescInfo desc="设定允许任意用户铸造藏品的开始时间" />
                    <Input type="date" name="time" />
                    <div className='px-[35px] py-[15px] eBApMP rounded-[10px] items-center justify-center mt-[50px] font-bold text-xl cursor-pointer'>创建新系列</div>
                    </>
                }    
            </div>
        </div>
        </div>    
    )
}
