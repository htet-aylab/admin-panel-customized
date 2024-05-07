'use client'

import { Box, Button, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { axiosDelete, axiosGet } from 'utils/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    await axiosGet(`admin/users?page=${page}&limit=${limit}`, (res) => {
      const {data,total_count} = res;
      setData(data);
      setTotalCount(total_count);
    });
  }

  const handleDelete = async (id: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosDelete(
          `admin/users/${id}`,
          (res: any) => {
            toast.success(res.message);
          },
          (res) => {
            fetchData()
            toast.success(res.message);
          },
        );
      }
    });
  }

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Action', field: 'action', 
      cellRenderer: (params:any) => {
        return  (
          <ActionCell 
            item={params.data} 
            isEdit={true} 
            isDelete={true} 
            editLink={'/admin/users/edit/'+params.data.id}
            handleDelete={handleDelete} />
        )
      }
    },
  ];

    // Pagination part

    useEffect(() => {
      fetchData();
    }, [page,limit]);
  
    const handleLimitChange = (newLimit: number) => {
      setLimit(newLimit);
      setPage(1); 
    };
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        
        <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
          <Link href="/admin/users/create">
            <Button rightIcon={<BiPlus />} variant='brand'>
              Add New
            </Button>
          </Link>
        </Flex>

        {/* Data Tables */}
        <CustomGrid 
          rowData={data}
          columnDefs={columnDefs}
          page={page}
          perPage={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          totalCount={totalCount}
        />

    </Box>
  )
}

export default page