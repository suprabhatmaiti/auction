function Input({ label, className, ...rest}){
    const classes=` my-4 border border-gray-300 bg-gray-100 rounded h-8 w-full focus:outline-none px-3 py-4 ${className}`

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                </label>
            )}
            <input {...rest} className={classes} />
        </div>
    );
}

export default Input;