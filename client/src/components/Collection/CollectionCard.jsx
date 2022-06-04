import React from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function CollectionCard({ collection }) {
    const collectionId = parseInt(collection.id);
    return (
        <Link to={`/assets/${collectionId}`}>
            <div className='mbl w-[300px] h-[280px] rounded-[8px] bg-white shadow hover:brightness-105'>
                <div className='w-[300px] mx-auto rounded-t-[8px] h-[130px] bg-cover bg-center' style={{backgroundImage: `url("${collection.bg}")` }}>
                    <div className={classNames(
                        "pt-[80px] flex justify-center align-bottom "
                    )}>
                        <img className={classNames(
                            "shrink-0 w-[70px] h-[70px] rounded-full border-2 border-black bg-cover bg-center"
                        )} src={collection.logo}/>
                    </div>
                </div>
                <div className='flex items-center justify-center font-bold mt-[1.3rem] text-black text-base'>
                    {collection.name}
                </div>
                <div className='flex items-center justify-center text-gray-700 text-xs'>
                    {`By ${collection.owner}`}
                </div>
                <div className='flex items-center justify-center text-black text-base mt-3'>
                    {collection.introduction}
                </div>
            </div>
        </Link>
    )
}
