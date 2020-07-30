import React from 'react';
import s from "./FormsControls.module.css";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const FormControl = ({input, meta, element, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={ s.formControl + " " + (hasError ? s.error : "")}>
            {React.createElement(element, {...input, ...props})}
            {props.type === "checkbox" ?
                props.label
            : 
                ""
            }
            { hasError ? 
                <div>
                    <span>{meta.error}</span>
                </div>
            :""
            }
            
        </div>
    )
}

export const Textarea = (props) => {
   return <FormControl {...props} element="textarea" ></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} element={TextField} ></FormControl>
}

export const CheckBox = (props) => {
    return <FormControl {...props} element={Checkbox} ></FormControl>
}