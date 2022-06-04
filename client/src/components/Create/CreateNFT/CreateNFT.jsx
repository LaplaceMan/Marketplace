import React, { useContext, useEffect, useState } from 'react'
import { FcAddImage } from "react-icons/fc";
import { MarketplaceContext } from '../../../context/MarketplaceContext';
import { Buffer } from 'buffer';
import {ImageUpload, MetadataUpload, TransactionApprove, NFTCreate} from './Modal/ModalContent';
import { WalletContext } from '../../../context/WalletContext';
import Modal from './Modal/Modal';
import ListNft from './Modal/ModalContent/ListNft';
import { useNavigate } from 'react-router-dom';
import AddToCollection from './Modal/ModalContent/AddToCollection';

export default function CreateNFT() {

  const { itemDetails, setItemDetails, createItem, fetchNFTs, getAllCollections } = useContext(MarketplaceContext);
  const {isChainValid, currentAccount} = useContext(WalletContext);
  const [submit, setSubmit] = useState(false);
  const [listNft, setListNft] = useState(false);
  const [addToCollection, setAddToCollection] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    setItemDetails({
      ...itemDetails,
      [e.target.name]: value,
    });
  }

  //executes once the file is selected or changed.
  const handleFileChange = async (e) => {
    await fetchNFTs();
    if (e.target.files[0]) {
      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setItemDetails({
          ...itemDetails,
          ["image"]: {
            preview: URL.createObjectURL(e.target.files[0]), //Offline preview url
            raw: e.target.files[0],
            visible: true,
            file: Buffer(reader.result)
          }
        });
      };

    }
    else {
      console.log("Not supported");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    createItem(listNft, value);
  };

  const closeModal = () => {
    setSubmit(false);
    setItemDetails({
      image: { preview: "", raw: "", visible: false, file: '' }, name: "", extlink: "", description: "", price: ""
    });
    navigate("/profile");
  }; 



  const [value, setValue] = useState(0);

  const handleSelectChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    setAddToCollection(true);
  };
  
  useEffect(async () => {
    const allCollections = await getAllCollections();
    setCollectionList(allCollections);
  }, []);


  return (
    <div className='gradient-bg-welcome'>
      <div className='flex flex-col sm:w-2/3 m-auto w-full justify-center h-full'>
      {!isChainValid && <Modal />}

        <form className='mt-10'>
          <label className='text-2xl sm:text-5xl font-bold py-1 text-white'>Create New Item</label>

          {itemDetails.image.preview ?
            <img src={itemDetails.image.preview} alt="dummy" className='rounded-lg w-96 h-96 object-cover mt-10 mb-5' />
            :
            <div className="w-1/2 h-64 mt-5 mb-10 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ">
              <div className="space-y-1 text-center">
                <FcAddImage className="mx-auto h-12 w-12 mb-5 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" />

                <div className="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span onChange={handleFileChange}>Upload a file</span>
                    <input id="file-upload" onChange={handleFileChange} name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

          }

          <label for="name" className="block text-sm text-white font-bold mb-2">Name</label>
          <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Item Name" />

          <label for="extlink" className="block mb-2 text-sm text-white font-bold mt-5">External Link</label>
          <input name="extlink" onChange={handleChange} id="extlink" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="https://example-site.com/item/123"></input>


          <label for="description" className="block mb-2 text-sm text-white font-bold mt-5">Description</label>
          <textarea name="description" onChange={handleChange} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Provide a detailed description of your item."></textarea>

          {collectionList.length ? 
          <div>
          <label for="description" className="block mb-2 text-sm text-white font-bold mt-5">Add to Collection</label>
            <select id="dropdown" value={value} onChange={handleSelectChange} className="w-1/2 h-8">
              <option value="N/A">N/A</option>
              {collectionList.filter((collection) => {
                return collection.createdBy.toLowerCase() === currentAccount;
              })
              .map((collection) => {
                return (
                    <option value={collection.collectionId}>{collection.name}</option>
                );
              })}
            </select></div> : <></>}

          {/* Toggle Button */}
          <div class="flex w-full my-12 mx-5">
            <label
              for="toogleA"
              class="flex items-center cursor-pointer"
            >
              <div class="relative">
                <input id="toogleA" type="checkbox" className="sr-only" onClick={() => setListNft(!listNft)} />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ease-out duration-500 ${listNft ? "translate-x-full" : "" }`}></div>
              </div>
              <div class="ml-3 text-white font-semibold text-lg">
                List NFT for sale
              </div>
            </label>

          </div>

          {listNft ? (<div>
            <label for="price" className="block text-sm text-white font-bold mb-2 mt-5">Price</label>
            <input onChange={handleChange} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="number" placeholder="Item Price" />
          </div>) : <></>}
          
          <button onClick={onSubmit} type="button" className="text-white mb-10 mt-7 block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-7 py-2.5 text-center mr-2">Create</button>
        </form>

        { submit ? (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 grid grid-flow-row grid-rows-3 gap-5">
                  
                  {/* Storing image on IPFS */}
                  <ImageUpload />

                  {/* Storing metadata on IPFS */}
                  <MetadataUpload />

                  {/* Accepting transaction */}
                  <TransactionApprove />


                  {/* Creating NFT on blockchain*/}
                  <NFTCreate />

                  {/* Listing NFT on Market*/}
                  {listNft && <ListNft />}

                  {/* Adding NFT to a colletion*/}
                  {addToCollection && <AddToCollection />}
                
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>

        ) : <></>}



      </div>
    </div>
  )
}
