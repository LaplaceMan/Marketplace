import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaSignature } from 'react-icons/fa';
import { FiUserPlus } from "react-icons/fi";
import ImageUpload from './ImageUpload';

export default function CreatingUser() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div>
            <ImageUpload />
            <div className="sm:flex sm:items-start mt-5 mb-5">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                    {uploadStatus.transactionRejected ? <RiErrorWarningLine size={25} color="red" /> : uploadStatus.transactionApproved ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.imageUploaded ? <Loader size={10} /> : <FaSignature size={22} color="grey" />}
                </div>
                <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                    <h3 className={`text-lg font-medium ${uploadStatus.userCreated && !uploadStatus.transactionApproved ? "text-gray-900 animate-pulse" : uploadStatus.transactionApproved ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.transactionRejected ? "Transaction Rejected" : uploadStatus.transactionApproved ? "Transaction Approved" : "Approve transaction"}</h3>
                </div>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                    {uploadStatus.userCreated ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.transactionApproved ? <Loader size={10} /> : <FiUserPlus size={22} color="grey" />}
                </div>
                <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                    <h3 className={`text-lg font-medium ${uploadStatus.transactionApproved && !uploadStatus.userCreated ? "text-gray-900 animate-pulse" : uploadStatus.userCreated ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.userCreated ? "Account created successfully!" : "Creating account"}</h3>
                </div>
            </div>
        </div>
    )
}
