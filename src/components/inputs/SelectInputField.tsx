'use client'

import { FormLabel, Input, Select, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

interface SelectInputFieldProps {
    label: string,
    placeholder: string,
    name: string,
    value: any,
    onChange: (e : ChangeEvent<HTMLSelectElement>) => void,
    options?: any[],
    disabled?: boolean
}

const SelectInputField = ({label,placeholder,name, value, onChange, options = [], disabled = false}: SelectInputFieldProps) => {
    const textColor = useColorModeValue('navy.700', 'white');
  return (
    <>
            <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
            >
                {label}
            </FormLabel>
            
            <Select
                placeholder={placeholder}
                value={value || ''}
                name={name}
                variant="auth"
                fontSize="sm"
                mb="10px"
                size="lg"
                disabled={disabled}
                ms={{ base: '0px', md: '0px' }}
                onChange={onChange}>
                    {
                        options.map((opt:any,index: number) => (
                            <option key={index} value={opt.id}>
                                {opt.name}
                            </option>
                        ))
                    }
                </Select>
    </>
  )
}

export default SelectInputField