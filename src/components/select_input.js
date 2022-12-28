import React from 'react'
import '../style.css'

export default function SelectInput({ childElement }) {
  return (<div className='o Select_row'>
    <row>
      <label className='select_label'>
        <span>{childElement?.label}</span>
      </label>
    </row>
    <row>
      <select>
        {childElement.validate.options.map((option) => {
          return (<option value={option.value}>
            {option.label}
          </option>);
        })}
      </select>
    </row>
  </div>)
}
