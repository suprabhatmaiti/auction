function Input({ label, className, mode="input", ...rest}){
    const classes=`border border-gray-300 bg-gray-100 rounded h-10 w-full focus:outline-none px-2 py-4 ${className}`

    return (
        <div>
            {label && (
                <label className="text-md font-medium text-gray-600">
                    {label}
                </label>
            )}
            {mode === 'input'?<input {...rest} className={classes} /> : <textarea {...rest} className={classes}></textarea>}
        </div>
    );
}

export default Input;