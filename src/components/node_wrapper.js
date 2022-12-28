import React from 'react'
import '../style.css'


export default function NodeWrapper({ children, showAdvanceOptions, setShowAdvanceOptions, showAdvanceOptionButton }) {
    return (
        <div style={{ border: '1px solid black' }}>
            {children}
            {showAdvanceOptionButton ?
                <div className='advance_option'>
                    <label>show Advance options</label>
                    <input className='toggle' type='checkbox'
                        onChange={() => {
                            console.log('here');
                            setShowAdvanceOptions(!showAdvanceOptions)
                        }} />
                </div> : ''
            }
        </div>)
}
