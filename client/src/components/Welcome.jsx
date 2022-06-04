import { Carousel } from 'antd';

const contentStyle = {
    height: '300px',
    textAlign: 'center',
    borderRadius: '10px'
};

const Welcome = () => {

    return (
        <div className="flex flex-col w-full justify-center">
            <div style={{marginTop: '65px'}} className='flex flex-col items-center'>
                <h1 className="text-3xl sm:text-4xl text-white ">
                    购买, 分享, 并且展示您的数字藏品
                </h1>
                <h3 className="text-base text-white my-5">
                    来自于优秀的品牌和艺术家
                </h3>
            </div>
            <div className='flex w-full flex-initial justify-center items-center mt-1'>
                <Carousel autoplay className='flex yg md:w-[1000px] w-[700px]' style={contentStyle}>
                    <div>
                        <img style={{ width: '1000px', height: '300px', borderRadius: '10px' }} src="https://lh3.googleusercontent.com/nGCUFy4ChJc-2sqnRAmm1Aaf3cW8SX6ISAJR1eYfJpzInZCKp8p9-nj3KBicTR_8o0L6CGr75Rzph3BX_iXOoK2i6XW_CTV0DanB=h600" />
                    </div>
                    <div>
                        <img style={{ width: '1000px', height: '300px', borderRadius: '10px' }} src="https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600" />
                    </div>
                    <div>
                        <img style={{ width: '1000px', height: '300px', borderRadius: '10px' }} src="https://lh3.googleusercontent.com/P3RpreFAUcZIt1FeVB-y2o95x3zw7DWBU9dXsihVsgdfElfZcl0_8g601ydvtTaOIIN6Pae0VXmZTuN_xictxe6_DsCmR0pO_dSFZg=h600" />
                    </div>
                    <div>
                        <img style={{ width: '1000px', height: '300px', borderRadius: '10px' }} src="https://lh3.googleusercontent.com/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ=h600" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Welcome;