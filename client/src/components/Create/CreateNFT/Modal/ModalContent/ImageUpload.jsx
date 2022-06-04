import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";

export default function ImageUpload() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {uploadStatus.imageUploaded ? <BsFillPatchCheckFill size={25} color="green" /> : <Loader size={10} />}
            </div>
            <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                <h3 className={`text-lg font-medium text-gray-900 ${uploadStatus.imageUploaded ? "" : "animate-pulse"}`} id="modal-title">{uploadStatus.imageUploaded ? "Image Uploaded" : "Uploading Image"}</h3>
            </div>
        </div>
    )
}
