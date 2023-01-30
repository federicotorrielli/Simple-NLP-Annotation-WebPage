import React, {useState} from "react";
import {ExclamationTriangleIcon, MegaphoneIcon, XMarkIcon} from "@heroicons/react/24/outline";

function TopBanner({text, different_icon}: { text: string, different_icon?: boolean }) {
    const [showBanner, setShowBanner] = useState(true);
    const [truncate, setTruncate] = useState(true);

    const toggleTruncate = () => {
        setTruncate(!truncate);
    }

    return (
        showBanner ?
            <div className="bg-blue-600">
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex w-0 flex-1 items-center">
                            <span className="flex rounded-lg bg-blue-800 p-2">
                                {different_icon ?
                                    <ExclamationTriangleIcon className="h-6 w-6 text-white" aria-hidden="true"/> :
                                    <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true"/>}
                            </span>
                            <p className={`ml-3 font-medium text-white ${truncate ? 'truncate' : 'whitespace-normal'}`}
                               onClick={toggleTruncate}>
                                <span className="md:hidden">{text}</span>
                                <span className="hidden md:inline">{text}</span>
                            </p>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                type="button"
                                className="-mr-1 flex rounded-md p-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                onClick={() => setShowBanner(false)}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div> : <div></div>
    )
}

export default TopBanner;