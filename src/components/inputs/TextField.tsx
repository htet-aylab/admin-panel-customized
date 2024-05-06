'use client'

import { FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

interface TextFieldInputProps {
    placeholder: string,
    type: string,
    name: string,
    label?: string,
    isRequired?: boolean,
    value: any,
    onChange: (e : ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({placeholder,type,name, label = '', isRequired = false, value = '', onChange}: TextFieldInputProps) => {

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
                value={value}
                onChange={onChange}
            />
    </>
  )
}

export default TextField