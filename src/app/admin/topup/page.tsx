'use client'

import { Box, Button, Flex } from '@chakra-ui/react';
import CustomGrid from 'components/datatables/CustomGrid'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { axiosGet, axiosPatch } from 'utils/axios';
import { Badge } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { dateTimeFormat } from 'utils/date-format';
import TopUpAction from 'components/datatables/TopUpAction';
import { getTopUpStatus } from 'utils/topup';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    await axiosGet(`admin/topup?page=${page}&limit=${limit}`, (res) => {
      const {data,total_count} = res;
      setData(data);
      setTotalCount(total_count);
    });
  }

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Advertiser Id', field: 'advertiser_id' },
    { headerName: 'Advertiser Name', field: 'advertiser_name' },
    { headerName: 'Amount', field: 'amount', valueFormatter: (params: any) => "$ "+params.value },
    { headerName: 'Status', field: 'status', cellRenderer: (params:any) => {
        const status = getTopUpStatus(params.value);
        return (
          <Badge colorScheme={status?.colorScheme}>{status?.name}</Badge>
        )
    } },
    { headerName: 'Created At', field: 'createdAt', valueFormatter: (params: any) => dateTimeFormat(params.value) },
    { headerName: 'Action', field: 'action', 
      cellRenderer: (params: any) => {
        return  (
          <TopUpAction 
            item={params.data} 
            isApproved={params.data.status != 0}
            handleStatusUpdate={handleStatusUpdate}
          />
        )
      }
    },
  ];

  const handleStatusUpdate = async (id : number,status: number) => {
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
            `admin/topup/${id}/status`,
            {status},
            (res:any) => {
              fetchData()
              toast.success(res.message);
            },
            (err:any) => {
              fetchData()
              toast.error(err.message);
            },
          );
        }
      });
  }

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
          perPage={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          totalCount={totalCount}
        />

    </Box>
  )
}

export default page