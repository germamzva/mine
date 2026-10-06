import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// types
import type { Preferrence } from "../types/preferrence.type.ts";

// queries
import { getPreferrences } from "../../queries/preferrence.ts";

// components
import AddPreferrece from "./modals/AddPreferrece";
import EditPreferrece from "./modals/EditPreferrece";

export default function Preferrence() {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);

    const { data: preferrence } = useQuery({
        queryKey: ["preferrence"],
        queryFn: getPreferrences,
    });

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModalOpen((prev) => !prev);
    };

    const handleSubmitPreferreceEdit = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // TODO: Implement edit preferrence logic
        console.log(id);
    };

    const handleSubmitDelete = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(id);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-5 pe-5">
                <h1 className="font-bold font-manrope text-white text-fsize2">
                    <span className="text-green-400 text-5xl">.</span>Preferrence
                </h1>
                <button
                    type="button"
                    className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition text-sm font-bold py-2 px-4 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                    onClick={(e) => handleOpenModal(e)}
                >
                    Add Preferrence
                </button>
            </div>

            <div className="mt-10 pe-5">
                {preferrence && preferrence.length > 0 && (
                    preferrence?.map((preferrence: Preferrence) => (
                        <div className="border-white/10 bg-slate-600/20 border p-5 mb-2 rounded-lg" key={preferrence._id}>
                            <div className="flex justify-end gap-5">
                                {/* // add delete icon svg */}
                                <button onClick={(e) => handleSubmitDelete(preferrence._id, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x preview-icon h-4 w-4 text-white hover:text-green-400 cursor-pointer">
                                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                    </svg>
                                </button>

                                {/* add edit icon svg */}
                                <button onClick={(e) => handleSubmitPreferreceEdit(preferrence._id, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen preview-icon h-4 w-4 text-white hover:text-green-400 cursor-pointe">
                                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-5">
                                <div className="mb-5">
                                    <label
                                        htmlFor="fullName"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                                        value={preferrence.fullName || ""}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-5 ">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                                            value={preferrence.email || ""}
                                        />
                                    </div>
                                    <div className="mb-5 ">
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                                            value={preferrence.phone || ""}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-5 ">
                                        <label
                                            htmlFor="job_title"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            name="job_title"
                                            id="job_title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                                            value={preferrence.job_title || ""}
                                        />
                                    </div>
                                    <div className="mb-5 ">
                                        <label
                                            htmlFor="company"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            id="company"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                                            value={preferrence.company || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>

            <AddPreferrece modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <EditPreferrece
                modalOpenEdit={modalOpenEdit}
                setModalOpenEdit={setModalOpenEdit}
            />

        </>
    );
}