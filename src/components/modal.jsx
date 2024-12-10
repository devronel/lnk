import BeatLoader from 'react-spinners/BeatLoader'

const Modal = ({ openModal, closeModal, icon, title, children, submit, loader }) => {

    return (
        <>
            <div className={`relative z-50 ${openModal ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div onClick={closeModal} className="fixed inset-0 bg-lnk-dark bg-opacity-50 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className={`relative transform overflow-hidden rounded-lg bg-lnk-white text-left shadow-xl transition-all sm:my-8 w-full xs:w-[90%] sm:w-full sm:max-w-xl`}>
                            <div className="bg-lnk-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-base font-bold leading-6 text-lnk-dark-gray flex items-center gap-2" id="modal-title">
                                            {icon}
                                            {title}
                                        </h3>
                                        <div className="mt-4">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-lnk-white border-t border-lnk-gray px-4 py-3 flex flex-row-reverse sm:px-6">
                                <button disabled={loader} onClick={submit} type="button" className={`${loader ? 'bg-opacity-80' : null} inline-flex items-center justify-center rounded bg-lnk-dark-gray px-3 py-2 text-sm font-semibold text-lnk-white shadow-sm hover:bg-opacity-80 ml-3 sm:w-auto`}>
                                    {loader ? null : 'Save'}
                                    <BeatLoader
                                        color={'#F5F5F7'}
                                        loading={loader}
                                        size={8}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </button>
                                <button onClick={closeModal} type="button" className=" inline-flex justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-lnk-dark-gray shadow-sm border border-lnk-dark-gray hover:bg-gray-50 sm:w-auto">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal