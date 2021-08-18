import React from "react";
import classNames from "classnames";

const Input = ({name, label, errors, wrapperClass, inputClass, ...rest}) => {
    return (
        <div className={classNames({wrapperClass: !!wrapperClass, "form-group mb-3": !wrapperClass})}>
            {label && <label className="form-label" htmlFor={name}>{label}</label>}
            <input {...rest} name={name} className={classNames("form-control", {[inputClass]: !!inputClass})}
                   id={name}/>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
};

export default Input;
