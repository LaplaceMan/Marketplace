import React, { useContext } from 'react'
import { HiSwitchHorizontal } from "react-icons/hi";
import { ImWarning } from "react-icons/im";
import { WalletContext } from '../../../../context/WalletContext';

export default function Modal() {
    const {changeNetwork} = useContext(WalletContext);
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 grid grid-flow-row grid-rows-2 gap-5">

                        <div className="sm:flex sm:items-center">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                                <ImWarning size={30} color="red" />
                            </div>
                        </div>

                        <div className="mt-3 text-center sm:mt-2 sm:ml-4">
                            <h3 className='font-semibold'>Wrong Network Detected</h3>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 text-center">
                        <button class="h-10 px-5 text-purple-100 transition-colors duration-150 bg-purple-600 rounded-lg focus:shadow-outline hover:bg-purple-700" onClick={changeNetwork}>Switch <HiSwitchHorizontal className='inline' size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
