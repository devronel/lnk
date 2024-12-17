const LnkInput = ({ value, type, placeholder, label, className, name, onChange, error }) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={label.toLowerCase().replace(' ', '-')} className=" block text-sm text-left font-normal mb-1 font-source-code-pro text-lnk-dark-gray">{label}</label>
            ) : null}
            <input
                onChange={onChange}
                value={value}
                name={name}
                type={type}
                id={label.toLowerCase().replace(' ', '-')}
                placeholder={placeholder}
                className={`${error ? ' border-red-500' : 'border-lnk-gray'} px-3 py-2 w-full rounded border font-source-code-pro  text-sm outline-none focus:outline focus:outline-lnk-orange`}
            />
        </div>
    )
}

export default LnkInput