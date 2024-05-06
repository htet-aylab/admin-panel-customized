'use client'

import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { axiosDelete, axiosGet } from 'utils/axios';
import { Badge } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const auth = useSelector((state:any) => state.auth);
  const router = useRouter();

  const fetchData = async () => {
    await axiosGet(`admin/users`, (res) => {
      setData(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, [auth]);

  const handleEdit = async (id: number | string) => {
    router.push('/admin/users/edit/'+id)
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
          perPage={perPage}
        />

    </Box>
  )
}

export default page