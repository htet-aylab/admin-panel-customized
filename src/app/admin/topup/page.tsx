'use client'

import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import CustomGrid from 'components/datatables/CustomGrid'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { axiosGet, axiosPatch } from 'utils/axios';
import { Badge } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { dateTimeFormat } from 'utils/date-format';
import TopUpAction from 'components/datatables/TopUpAction';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const auth = useSelector((state:any) => state.auth);
  const router = useRouter();

  const fetchData = async () => {
    await axiosGet(`admin/topup`, (res) => {
      setData(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, [auth]);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Advertiser Id', field: 'advertiser_id' },
    { headerName: 'Advertiser Name', field: 'advertiser_name' },
    { headerName: 'Amount', field: 'amount', valueFormatter: (params: any) => "$ "+params.value },
    { headerName: 'Status', field: 'status', cellRenderer: (params:any) => {
      if(params.value == 0){
        return  (
          <Badge colorScheme='orange.500'>Not Approved</Badge>
        )
      }
      else if(params.value == 1){
        return  (
          <Badge colorScheme='green'>Approved</Badge>
        )
      }
      else{
        return  (
            <Badge colorScheme='red'>Declined</Badge>
        )
      }
    } },
    { headerName: 'Created At', field: 'createdAt', valueFormatter: (params: any) => dateTimeFormat(params.value) },
    { headerName: 'Action', field: 'action', 
      cellRenderer: (params: any) => {
        return  (
          <TopUpAction 
            item={params.data} 
            isApproved={params.data.status != 0}
            handleApprove={handleApprove}
            handleDecline={handleDecline}
          />
        )
      }
    },
  ];

  const handleApprove = async (id : number | string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosPatch(
            `admin/topup/${id}/approve`,
            (res:any) => {
              toast.success(res.message);
            },
            (res:any) => {
              fetchData()
              toast.success(res.message);
            },
          );
        }
      });
  }

  const handleDecline = async (id : number | string) => {
    Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, decline it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosPatch(
            `admin/topup/${id}/decline`,
            (res:any) => {
              toast.success(res.message);
            },
            (res:any) => {
              fetchData()
              toast.success(res.message);
            },
          );
        }
      });
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        
        <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
          <Link href="/admin/topup/create">
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