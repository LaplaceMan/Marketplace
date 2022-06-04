import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function BuyingNFT() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div>
            <div className="sm:flex sm:items-start mb-5">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                    {uploadStatus.transactionRejected ? <RiErrorWarningLine size={25} color="green" /> : uploadStatus.transactionApproved ? <BsFillPatchCheckFill size={25} color="green" /> : <Loader size={10} />}
                </div>
                <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                    <h3 className={`text-lg font-medium ${uploadStatus.metadataUploaded && !uploadStatus.transactionApproved ? "text-gray-900 animate-pulse" : uploadStatus.transactionApproved ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.transactionRejected ? "Transaction Rejected" : uploadStatus.transactionApproved ? "Transaction Approved" : "Approve transaction"}</h3>
                </div>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                    {uploadStatus.boughtNFT ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.transactionApproved ? <Loader size={10} /> : <HiOutlineShoppingCart size={22} color="grey" />}
                </div>
                <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                    <h3 className={`text-lg font-medium ${uploadStatus.transactionApproved && !uploadStatus.boughtNFT ? "text-gray-900 animate-pulse" : uploadStatus.boughtNFT ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.boughtNFT ? "NFT Bought Successfully!" : "Buying NFT"}</h3>
                </div>
            </div>
        </div>
    )
}
