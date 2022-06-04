import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaSignature } from "react-icons/fa";

export default function TransactionApprove() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                {uploadStatus.transactionApproved ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.metadataUploaded ? <Loader size={10} /> : <FaSignature size={22} color="grey" />}
            </div>
            <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                <h3 className={`text-lg font-medium ${uploadStatus.metadataUploaded && !uploadStatus.transactionApproved ? "text-gray-900 animate-pulse" : uploadStatus.transactionApproved ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.transactionApproved ? "Transaction Approved" : "Approve transaction"}</h3>
            </div>
        </div>
    )
}
