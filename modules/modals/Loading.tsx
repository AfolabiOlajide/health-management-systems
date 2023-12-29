'use client'
import { useState, useEffect } from "react"
import { createPortal } from "react-dom";
import { DNA } from "react-loader-spinner";

const Loading = ({ isOpen, }: { isOpen: boolean}) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(()=> setMounted(true), []);

    let portal;
    if(mounted){
        portal =  document.querySelector("#modal_portal")
    }

    return mounted ? createPortal(
        <>
            <div className={`${isOpen ? "block" : "hidden"} z-20 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}>
                {/* backdrop */}
                <div className="back w-screen h-screen absolute top-0 left-0 right-0 backdrop-blur-[2rem]"></div>
                {/* main component */}
                <div className="modal realtive z-10 w-[90%] md:w-max rounded-md p-[1rem]" onClick={() => null}>
                    <DNA
                        visible={true}
                        height="350"
                        width="350"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            </div>
        </>,
        portal as HTMLElement
    ) : null;
};

export default Loading;
