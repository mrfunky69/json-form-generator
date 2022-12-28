import React, { useState} from 'react'
import './style.css'
import RadioInput from './components/radio_Input'
import SwitchInput from './components/switch_input'
import Input from './components/input'
import SelectInput from './components/select_input'

import NodeWrapper from './components/node_wrapper'

const GenerateForm = ({parentId, childJSON,formValue,setFormValue}) => {
  console.log({parentId, childJSON});
  const [activeTab, setActiveTab] = useState(null);
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const [nodeValue, setNodeValue] = useState(formValue);
  const showAdvanceOptionButton = childJSON.some((childElement)=>childElement?.validate?.required === false || childElement?.validate?.required === undefined);
  console.log(showAdvanceOptionButton, 'showAdvance');
  return <NodeWrapper showAdvanceOptions={showAdvanceOptions} setShowAdvanceOptions={setShowAdvanceOptions} showAdvanceOptionButton={showAdvanceOptionButton}>
   {childJSON.map((childElement)=>{
   if(childElement?.uiType === 'Radio' && (childElement?.validate?.required || showAdvanceOptions)){
      return <RadioInput 
      childElement={childElement} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      parentId={parentId}
      formValue={formValue}
      setFormValue={setFormValue}
       />
   }
   if(childElement?.uiType === 'Group' && (childElement?.validate?.required || showAdvanceOptions)){
    return GenerateForm({parentId: childElement.jsonKey, childJSON: childElement?.subParameters, formValue:{formValue}, setFormValue:{setNodeValue}});
   }
   if(childElement?.uiType === 'Input' && (childElement?.validate?.required || showAdvanceOptions)){
    return <Input  
      childElement={childElement}
    />
   }
   if(childElement?.uiType === 'Ignore' && (childElement?.validate?.required || showAdvanceOptions)){
    //what else conditions are there?
    if(childElement?.conditions[0]?.value === activeTab){
      return(
        <div className='o'>
          <GenerateForm childJSON={childElement?.subParameters} parentId={childElement.jsonKey} />
        </div>
      )
    }
   }
   if(childElement?.uiType === 'Select' && (childElement?.validate?.required || showAdvanceOptions)){
    return <SelectInput childElement={childElement} />
   }
   if(childElement?.uiType === 'Switch' && (childElement?.validate?.required || showAdvanceOptions)){
     return <SwitchInput childElement={childElement}/>
   }
   return null;
  })
}
</NodeWrapper>
}
export default function JsonForm({formJson}) {
  const [formValue,setFormValue]=useState({});
    
    return(
      <form>
      <GenerateForm 
        parentId='root' 
        childJSON={formJson} 
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <button className='button-33' type='submit' onClick={(e)=>{console.log(e)}}>
          Submit
      </button>
    </form>
    )
}


