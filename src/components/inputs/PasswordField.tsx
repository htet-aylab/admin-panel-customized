'use client'

import { FormLabel, Icon, Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'

interface PasswordInputProps {
    placeholder: string,
    type: string,
    name: string,
    label?: string,
    isRequired?: boolean,
    value: any,
    onChange: (e : ChangeEvent<HTMLInputElement>) => void,
    show?: boolean,
    setShow?: (show : boolean) => void,
}

const PasswordField = ({placeholder,type,name, label = '', isRequired = false, value = '', onChange, show = false, setShow} : PasswordInputProps) => {
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const handleClick = () => setShow(!show);

  return (
    <>
    <FormLabel
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        display="flex"
        >
            {label}
        </FormLabel>

        <InputGroup size="md">
        <Input
            isRequired={isRequired}
            fontSize="sm"
            placeholder={placeholder}
            mb="24px"
            size="lg"
            name={name}
            value={value} 
            onChange={onChange}
            type={show ? 'text' : type}
            variant="auth"
        />
        <InputRightElement display="flex" alignItems="center" mt="4px">
            <Icon
            color={textColorSecondary}
            _hover={{ cursor: 'pointer' }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
            />
        </InputRightElement>
        </InputGroup>
    </>
  )
}

export default PasswordField