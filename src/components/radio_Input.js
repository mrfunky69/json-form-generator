import React, {useEffect} from 'react'
import '../style.css'

export default function RadioInput({childElement, activeTab, setActiveTab, parentId,formValue,setFormValue}) {
    const defaultValue = childElement?.validate.defaultValue;
    useEffect(()=>{
          setActiveTab(defaultValue);
    }, [])
    return (
        <column className='o'>
        <label>{childElement?.label}</label>
        <div style={{display: "flex"}}>
          {childElement.validate.options.map((option)=>{
            return(<>
                  <label className='radio'>
                    {option.value}
                  <input className='radio_button' type="radio" id={option.value} name={parentId} value={option.value}
                  checked={activeTab === option.value} onChange={(e)=>{
                    setActiveTab(e.target.value);
                    setFormValue({...formValue, [option.value] : e.target.value})
                    }}/>
                  </label>
              </>
            );
          })}
        </div>
      </column>
  )
}

