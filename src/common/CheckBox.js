import React, {useState} from 'react';
import {v1} from "uuid";

const CheckBox = ({checked, label, name}) => {

    const [checked, setCheck] = useState(checked || false);

    let id = v1();
    return (
        <div className="form-check align-items-center">
            <input
                id={id}
                className="form-check-input"
                name={name}
                checked={checked}
                onChange={e => setCheck(!checked)}
            />
            <label
                className="form-check-label text-small"
                htmlFor={id}
            >{label}</label
            >
        </div>
    );
};

export default CheckBox;