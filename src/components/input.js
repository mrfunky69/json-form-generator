import React from 'react'
import '../style.css'

export default function input({ childElement }) {
    return (
        <div className='o' >
            <row>
                <label className='input_label'>{childElement?.label}</label>
            </row>
            <row>
                <input className='input' placeholder={childElement?.placeholder} required={childElement?.validate?.required} />
            </row>
        </div>
    );
}
