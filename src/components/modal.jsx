
const Modal = (props) => {

    const closeModal = () => {
        props.setOpenModal(false)
    }

    return (
        <>
            <div className={`relative z-50 ${props.openModal ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div onClick={closeModal} className="fixed inset-0 bg-lnk-dark bg-opacity-50 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className={`relative transform overflow-hidden rounded-lg bg-lnk-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:${props.maxWidth}`}>
                            <div className="bg-lnk-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-base font-bold leading-6 text-lnk-dark-gray flex items-center gap-2" id="modal-title">
                                            {props.icon}
                                            {props.title}
                                        </h3>
                                        <div className="mt-4">
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-lnk-white border-t border-lnk-gray px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded bg-lnk-dark-gray px-3 py-2 text-sm font-semibold text-lnk-white shadow-sm hover:bg-opacity-80 sm:ml-3 sm:w-auto">Save</button>
                                <button onClick={closeModal} type="button" className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-lnk-dark-gray shadow-sm border border-lnk-dark-gray hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal