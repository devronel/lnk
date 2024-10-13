const LnkInput = ({ type, placeholder, label, className }) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={label.toLowerCase().replace(' ', '-')} className=" block text-sm font-normal mb-1 font-ubuntu text-lnk-dark-gray">{label}</label>
            ) : null}
            <input type={type} id={label.toLowerCase().replace(' ', '-')} placeholder={placeholder} className=" px-3 py-2 w-full rounded border border-lnk-gray text-sm outline-none focus:outline focus:outline-lnk-dark-gray " />
        </div>
    )
}

export default LnkInput