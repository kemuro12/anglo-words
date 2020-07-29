import React from 'react';
import s from "./FormsControls.module.css";

const FormControl = ({input, meta, element, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={ s.formControl + " " + (hasError ? s.error : "")}>
            {React.createElement(element, {...input, ...props})}
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
    return <FormControl {...props} element="input" ></FormControl>
}