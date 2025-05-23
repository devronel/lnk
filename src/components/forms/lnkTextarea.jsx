const LnkTextarea = ({ onChange, value, placeholder, label, name, className, error }) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={label.toLowerCase().replace(' ', '-')} className=" block text-sm font-normal mb-1 font-lato text-lnk-dark-gray">{label}</label>
            ) : null}
            <textarea
                onChange={onChange}
                value={value}
                name={name}
                rows='5'
                id={label.toLowerCase().replace(' ', '-')}
                placeholder={placeholder}
                className={`${error ? ' border-red-500' : 'border-lnk-gray'} px-3 py-2 w-full font-lato rounded border text-sm outline-none focus:outline focus:outline-lnk-orange `}></textarea>
        </div>
    )
}

export default LnkTextarea