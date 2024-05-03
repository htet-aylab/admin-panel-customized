'use client'

import { Box, Button, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid'
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { axiosGet } from 'utils/axios';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const auth = useSelector((state) => state.auth);

  const fetchData = async () => {
    await axiosGet(`users`, (res) => {
      setData(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, [auth]);

  const handleEdit = async (id) => {
    alert(id)
  }

  const handleDelete = async (id) => {
    alert(id)
  }

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Balance', field: 'account_balance', valueFormatter: params => '$ ' + params.value },
    { headerName: 'Action', field: 'action', 
      cellRenderer: params => {
        return  (
          <ActionCell 
            item={params.data} 
            isEdit={true} 
            isDelete={true} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} />
        )
      }
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        
        <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
          <Button rightIcon={<BiPlus />} variant='brand'>
            Add New
          </Button>
        </Flex>
        <CustomGrid 
          rowData={data}
          columnDefs={columnDefs}
          page={page}
          perPage={perPage}
        />
    </Box>
  )
}

export default page