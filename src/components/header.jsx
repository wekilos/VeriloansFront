import React, { useEffect, useRef, useState } from "react";
import profile from "../images/profile.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
const Header = () => {
    const [open, setOpen] = useState(false);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <div className="w-full h-[52px] bg-white pt-0 sticky top-0">
            <div className="w-[95%] mx-auto inline-flex justify-between">
                <div className="text-primary-dark font-[600] text-[22px] font-eczar leading-[52px] whitespace-nowrap">
                    Nur Ýüpek
                </div>
                <div className="leading-[48px] box-border h-[52px] font-roboto text-black text-[16px] ">
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/home"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/loans"
                    >
                        Algylar
                    </Link>
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/customers"
                    >
                        Müşderiler
                    </Link>
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/products"
                    >
                        Harytlar
                    </Link>
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/stores"
                    >
                        Dükanlar
                    </Link>
                    <Link
                        className="text-black font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/employees"
                    >
                        Işgärler
                    </Link>
                    <Link
                        className="text-black h-[50px] box-border font-roboto mr-8 text-[16px] hover:text-primary-dark pb-[15px] hover:border-b-[3px] border-b-primary-light border-solid"
                        to="/reports"
                    >
                        Hasabat
                    </Link>
                </div>
                <div className="inline-flex">
                    <select
                        className="h-[40px] w-[180px] border-2 rounded-[4px] mr-2 mt-[7px]"
                        name=""
                        id=""
                    >
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div
                        onClick={() => setOpen(true)}
                        ref={wrapperRef}
                        className="inline-flex h-[60px] pt-[10px] hover:text-primary-light relative cursor-pointer"
                    >
                        <img
                            className="h-[30px] object-contain rounded-[100%] mr-1"
                            src={profile}
                            alt=""
                        />
                        <KeyboardArrowDownIcon className="mt-1 hover:text-primary-light" />
                        {open && (
                            <div className="text-left absolute bg-white w-[150px] text-[16px] right-0 top-[50px] shadow-sm rounded-[4px] text-black hover:text-black cursor-pointer">
                                <div className="pl-[15px] border-b-2 h-[40px] leading-[40px] hover:bg-[#d5d5d5] rounded-t-[4px]">
                                    Sebet
                                </div>
                                <div className="pl-[15px] border-b-2 h-[40px] leading-[40px] hover:bg-[#d5d5d5] rounded-b-[4px]">
                                    Ulgamdan cykmak
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Header);
