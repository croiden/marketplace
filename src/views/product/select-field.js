import React from 'react'
import { Field } from './style'

export default function SelectField({ label, name, selectProps, options }) {
    return (
        <Field>
            <label htmlFor={name}>{label}</label>
            {selectProps.readOnly ? (
                <input type="text" {...selectProps} />
            ) : (
                <select {...selectProps}>
                    {options.map((o, i) => (
                        <option key={i} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            )}
        </Field>
    )
}
