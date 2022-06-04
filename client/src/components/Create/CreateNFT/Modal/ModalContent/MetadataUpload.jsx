import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";

export default function MetadataUpload() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                {uploadStatus.metadataUploaded ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.imageUploaded ? <Loader size={10} /> : <RiFileList3Line size={22} color="grey" />}
            </div>
            <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                <h3 className={`text-lg font-medium ${uploadStatus.imageUploaded && !uploadStatus.metadataUploaded ? "text-gray-900 animate-pulse" : uploadStatus.metadataUploaded ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.metadataUploaded ? "Metadata Uploaded" : "Uploading Metadata"}</h3>
            </div>
        </div>
    )
}
