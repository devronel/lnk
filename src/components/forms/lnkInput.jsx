const LnkInput = ({ value, type, placeholder, label, className, name, onChange, error, required }) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={label.toLowerCase().replace(' ', '-')} className=" block text-sm text-left font-normal mb-1 font-lato text-lnk-dark-gray">{label}</label>
            ) : null}
            <input
                onChange={onChange}
                value={value}
                name={name}
                type={type}
                id={label.toLowerCase().replace(' ', '-')}
                placeholder={placeholder}
                required={required}
                className={`${error ? ' border-red-500' : 'border-lnk-gray'} px-3 py-2 w-full rounded border font-lato text-sm outline-none focus:outline focus:outline-lnk-orange`}
            />
        </div>
    )
}

export default LnkInput