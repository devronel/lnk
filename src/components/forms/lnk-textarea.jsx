const LnkTextarea = ({ onChange, value, placeholder, label, name, className }) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={label.toLowerCase().replace(' ', '-')} className=" block text-sm font-normal mb-1 font-ubuntu text-lnk-dark-gray">{label}</label>
            ) : null}
            <textarea
                onChange={onChange}
                value={value}
                name={name}
                rows='5'
                id={label.toLowerCase().replace(' ', '-')}
                placeholder={placeholder}
                className=" px-3 py-2 w-full rounded border border-lnk-gray text-sm outline-none focus:outline focus:outline-lnk-orange "></textarea>
        </div>
    )
}

export default LnkTextarea