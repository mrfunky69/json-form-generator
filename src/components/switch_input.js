import React, { useState } from 'react'
import '../style.css'

export default function SwitchInput({ childElement }) {
    const [checked, setChecked] = useState(childElement?.validate?.defaultValue);
    return (
        <div className='o'>
            <label>
                <input type="checkbox" required={childElement?.valiate?.required} checked={checked} onChange={(e) => { setChecked(!checked) }} />
                <span className='checkbox_label'>{childElement?.label}</span>
            </label>
        </div>)
}
