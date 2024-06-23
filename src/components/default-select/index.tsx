import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

type SelectProps = {
    data: Record<string, any>[]
    name: string
    label?: string
    placeholder?: string
    error?: any,
    onChange: any
}

const DefaultSelect: React.FC<SelectProps> = ({ data, name, label, placeholder, onChange, error }) => {
    return (
        <div className={`mb-3 text-[14px]`}>
            <Select
                name={name}
                label={label}
                placeholder={placeholder}
                variant="bordered"
                errorMessage={error}
                isInvalid={error ? true : false}
                className="w-full border-none"
                onChange={onChange}
                size='lg'
                radius='sm'
            >
                {data?.map((item: Record<string, any>) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default DefaultSelect