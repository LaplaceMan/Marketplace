import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function NFTCreate() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {uploadStatus.nftCreated ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.transactionApproved ? <Loader size={10} /> : <MdOutlineCloudUpload size={22} color="grey" />}
            </div>
            <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                <h3 className={`text-lg font-medium ${uploadStatus.transactionApproved && !uploadStatus.nftCreated ? "text-gray-900 animate-pulse" : uploadStatus.nftCreated ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.nftCreated ? "NFT created successfully!" : "Creating NFT"}</h3>
            </div>
        </div>
    )
}
