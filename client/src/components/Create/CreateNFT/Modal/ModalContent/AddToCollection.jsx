import React, { useContext } from 'react'
import { MarketplaceContext } from '../../../../../context/MarketplaceContext';
import Loader from '../../../../Loader';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri"
import { MdOutlineCollectionsBookmark } from "react-icons/md";

export default function AddToCollection() {
    const { uploadStatus } = useContext(MarketplaceContext);

    return (
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                {uploadStatus.addedToCollection ? <BsFillPatchCheckFill size={25} color="green" /> : uploadStatus.nftListed ? <Loader size={10} /> : <MdOutlineCollectionsBookmark size={22} color="grey" />}
            </div>
            <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                <h3 className={`text-lg font-medium ${uploadStatus.imageUploaded && !uploadStatus.nftListed ? "text-gray-900 animate-pulse" : uploadStatus.addedToCollection ? "text-gray-900" : "text-gray-500"}`} id="modal-title">{uploadStatus.addedToCollection ? "Added to Collection!" : "Adding to Collection"}</h3>
            </div>
        </div>
    )
}
