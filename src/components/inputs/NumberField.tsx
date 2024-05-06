'use client'

import { FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

interface NumberFieldInputProps {
    placeholder: string,
    type: string,
    name: string,
    label?: string,
    isRequired?: boolean,
    value: any,
    min?: number,
    max?: number,
    onChange: (e : ChangeEvent<HTMLInputElement>) => void
}

const NumberField = ({placeholder,type,name, label = '', isRequired = false, value = '', onChange, min = 0, max = 100}: NumberFieldInputProps) => {

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
            
            <Input
                isRequired={isRequired}
                variant="auth"
                fontSize="sm"
                ms={{ base: '0px', md: '0px' }}
                type={type}
                name={name}
                placeholder={placeholder}
                mb="24px"
                fontWeight="500"
                size="lg"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
    </>
  )
}

export default NumberField