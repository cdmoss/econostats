import React, { useState } from 'react'
import { DataSetDescription } from 'types'
import { isDate } from 'util/types'

interface DataSetInputProps<T> {
    label: string
    onChange: (val: T) => void
    value?: T
}

const DataSetInput = <T,>({ label, onChange, value }: DataSetInputProps<T>): JSX.Element => {
    const [innerValue, setInnerValue] = useState<T | undefined>(value)

    const inputType =
        typeof value === "number" ? "number" :
            typeof value === "string" ? "text" :
                typeof value === "string" && Date.parse(value) ? "date" : "text"


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: any = event.target.value;

        // Attempt to convert the input value to the appropriate type
        if (typeof value === 'number') {
            newValue = Number(newValue);
        }
        if (typeof value === 'string' && Date.parse(value))
            newValue = Date.parse(value as string)

        // Add more type conversion checks here if needed

        setInnerValue(newValue as T);
        onChange(newValue as T);
    };

    return (
        <div className='flex justify-between gap-5'>
            <span>{label}:</span>
            <input className="flex-1" onChange={handleInputChange} type={inputType} />
        </div>
    )
}

export const AddDataSet = () => {
    const [newDataSet, setNewDataSet] = useState<DataSetDescription>({})
    return (
        <div>
            <DataSetInput<string> onChange={value => setNewDataSet({ ...newDataSet, country: value })} value={newDataSet.country} label="Indicator" />
        </div>
    )
}