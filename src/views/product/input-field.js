import React from 'react'
import { Field } from './style'

export default function InputField({ label, name, inputProps }) {
    return (
        <Field>
            <label htmlFor={name}>{label}</label>
            <input {...inputProps} />
        </Field>
    )
}
