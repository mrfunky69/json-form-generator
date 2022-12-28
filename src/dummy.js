import React, {useEffect, useState} from 'react'
import './style.css'

const data ={
  "fields":    
  [
    {
      "sort": 1,
      "label": "Pasta Name",
      "description": "",
      "validate": {
        "required": true,
        "immutable": false
      },
      "jsonKey": "name",
      "uiType": "Input",
      "icon": "",
      "level": 0,
      "placeholder": ""
    },
    {
      "sort": 10001,
      "label": "Pasta_type",
      "description": "",
      "validate": {
        "required": true,
        "immutable": false
      },
      "jsonKey": "pasta_type",
      "uiType": "Group",
      "icon": "",
      "level": 0,
      "placeholder": "",
      "subParameters": [
        {
          "sort": 1,
          "label": "Sauce",
          "description": "",
          "validate": {
            "required": true,
            "options": [
              {
                "label": "Red",
                "value": "Red",
                "description": "",
                "icon": ""
              },
              {
                "label": "White",
                "value": "White",
                "description": "",
                "icon": ""
              },
              {
                "label": "Pesto",
                "value": "Pesto",
                "description": "",
                "icon": ""
              }
            ],
            "defaultValue": "Red",
            "immutable": false
          },
          "jsonKey": "sauce",
          "uiType": "Select",
          "icon": "",
          "level": 1,
          "placeholder": ""
        },
        {
          "sort": 3,
          "label": "Topping_type",
          "description": "",
          "validate": {
            "required": true,
            "options": [
              {
                "label": "Veg",
                "value": "Veg",
                "description": "",
                "icon": ""
              },
              {
                "label": "Mushroom",
                "value": "Mushroom",
                "description": "",
                "icon": ""
              },
              {
                "label": "Chicken",
                "value": "Chicken",
                "description": "",
                "icon": ""
              },
              {
                "label": "Prawns",
                "value": "Prawns",
                "description": "",
                "icon": ""
              }
            ],
            "defaultValue": "Veg",
            "immutable": false
          },
          "jsonKey": "topping_type",
          "uiType": "Select",
          "icon": "",
          "level": 1,
          "placeholder": ""
        },
        {
          "sort": 5,
          "label": "Cheese",
          "description": "",
          "validate": {
            "options": [
              {
                "label": "Cheddar",
                "value": "Cheddar",
                "description": "",
                "icon": ""
              },
              {
                "label": "Mozzarella",
                "value": "Mozzarella",
                "description": "",
                "icon": ""
              },
              {
                "label": "Parmesan",
                "value": "Parmesan",
                "description": "",
                "icon": ""
              },
              {
                "label": "Feta",
                "value": "Feta",
                "description": "",
                "icon": ""
              },
              {
                "label": "Gouda",
                "value": "Gouda",
                "description": "",
                "icon": ""
              }
            ],
            "defaultValue": "Cheddar",
            "immutable": false
          },
          "jsonKey": "cheese",
          "uiType": "Select",
          "icon": "",
          "level": 1,
          "placeholder": ""
        }
      ]
    },
    {
      "sort": 10002,
      "label": "Portion",
      "description": "",
      "validate": {
        "options": [
          {
            "label": "Medium",
            "value": "Medium",
            "description": "",
            "icon": ""
          },
          {
            "label": "Small",
            "value": "Small",
            "description": "",
            "icon": ""
          },
          {
            "label": "Large",
            "value": "Large",
            "description": "",
            "icon": ""
          }
        ],
        "defaultValue": "Medium",
        "immutable": false
      },
      "jsonKey": "portion",
      "uiType": "Select",
      "icon": "",
      "level": 0,
      "placeholder": ""
    }
]
}
const RadioInput = ({childElement, activeTab, setActiveTab, parentId}) => {
  const defaultValue = childElement?.validate.defaultValue;
  useEffect(()=>{
        setActiveTab(defaultValue);
  }, [])
  return(<column className='o'>
    <label>{childElement?.label}</label>
    <div style={{display: "flex"}}>
      {childElement.validate.options.map((option)=>{
        return(
          <label className='radio'>
          <span>{option.value}</span>
          <input style={{appearance: "none"}} type="radio" id={option.value} name={parentId} value={option.value}
           checked={activeTab === option.value} onChange={(e)=>{setActiveTab(e.target.value)}}/>
          </label>
        );
      })}
    </div>
  </column>) 
}

const SwitchInput = ({childElement}) => {
  const [checked, setChecked] = useState(childElement?.validate?.defaultValue);
  return(<div className='o'>
    <label>
     <input type="checkbox" required={childElement?.validate?.required} checked={checked} onChange={(e)=>{ setChecked(!checked)}}/>
     <span className='checkbox_label'>{childElement?.label}</span>
    </label>
  </div>)
}

const NodeWrapper = ({children, showAdvanceOptions, setShowAdvanceOptions, showAdvanceOptionButton}) => {

  return(<>
    {children}
    {showAdvanceOptionButton ? 
        <button type='button' onClick={()=>{setShowAdvanceOptions(!showAdvanceOptions)}}>show Advance options</button>
         : ''}
  </>)
}
const GenerateForm = ({parentId, childJSON}) => {
  console.log({parentId, childJSON});
  const [activeTab, setActiveTab] = useState(null);
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const showAdvanceOptionButton = childJSON.some((childElement)=>childElement?.validate?.required === false || childElement?.validate?.required === undefined);
  return <NodeWrapper showAdvanceOptions={showAdvanceOptions} setShowAdvanceOptions={setShowAdvanceOptions} showAdvanceOptionButton={showAdvanceOptionButton}>
     {childJSON.map((childElement)=>{
   if(childElement?.uiType === 'Radio' && (childElement?.validate?.required || showAdvanceOptions)){
      return <RadioInput childElement={childElement} activeTab={activeTab} setActiveTab={setActiveTab} parentId={parentId} />
   }
   if(childElement?.uiType === 'Group' && (childElement?.validate?.required || showAdvanceOptions)){
    return GenerateForm({parentId: childElement.jsonKey, childJSON: childElement?.subParameters});
   }
   if(childElement?.uiType === 'Input' && (childElement?.validate?.required || showAdvanceOptions)){
    return(<div >
      <row className='o'>
        <column>
          <label className='input_label'>{childElement?.label}</label>
        </column>
        <column>
          <input className='input' placeholder={childElement?.placeholder} required={childElement?.validate?.required} />
        </column>
      </row>
    </div>)
   }
   if(childElement?.uiType === 'Ignore' && (childElement?.validate?.required || showAdvanceOptions)){
    //what else conditions are there?
    if(childElement?.conditions[0]?.value === activeTab){
      return(
        <div className='o'>
          <GenerateForm childJSON={childElement?.subParameters} parentId={childElement.jsonKey}/>
        </div>
      )
    }
   }
   if(childElement?.uiType === 'Select' && (childElement?.validate?.required || showAdvanceOptions)){
    return(<div className='o'>
      <row>
        <column>
          <label className='select_label'>
              <span>{childElement?.label}</span>
          </label>
        </column>
        <column>
            <select>
              {childElement.validate.options.map((option)=>{
                return(<option value={option.value}>
                  {option.label}
                </option>);
              })}
            </select>
        </column>
      </row>
    </div>)
   }
   if(childElement?.uiType === 'Switch' && (childElement?.validate?.required || showAdvanceOptions)){
     return <SwitchInput childElement={childElement}/>
   }
   return null;
  })}
  </NodeWrapper>
 
}
export default function JsonForm() {

    return(<form>
      <GenerateForm parentId='root' childJSON={data.fields}/>
      <button type='submit' onClick={(e)=>{console.log(e)}}>
          Submit
      </button>
    </form>)
}