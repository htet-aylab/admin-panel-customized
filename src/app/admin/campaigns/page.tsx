'use client'

import { Box, Button, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { axiosDelete, axiosGet } from 'utils/axios';
import { Badge } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getCampaignStatus } from 'utils/campaigns';

const page = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  const fetchData = async () => {
    await axiosGet(`admin/campaigns`, (res) => {
      setData(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id: number | string) => {
    router.push('/admin/campaigns/edit/'+id)
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
          `admin/campaigns/${id}`,
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

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Status', field: 'status', cellRenderer: (params:any) => {
      const status = getCampaignStatus(params.value);
      return (
        <Badge colorScheme={status?.colorScheme}>{status?.name}</Badge>
      )
    } },
    { headerName: 'Advertiser Name', field: 'advertiser_name' },
    { headerName: 'Total Budget', field: 'total_budget' },
    { headerName: 'Campaign', field: 'name' },
    { headerName: 'Impression Count', field: 'impression_count' },
    { headerName: 'Click Count', field: 'click_count' },
    { headerName: 'CPM', field: 'cpm', valueFormatter: (params:any) => '$ ' + params.value  },
    { headerName: 'CTR', field: 'ctr', },
    { headerName: 'Action', field: 'action', 
      cellRenderer: (params:any) => {
        return  (
          <ActionCell 
            item={params.data} 
            isEdit={true} 
            isView={true} 
            isDelete={true} 
            editLink={'/admin/campaigns/edit/'+params.data.id}
            viewLink={'/admin/campaigns/view/'+params.data.id}
            handleDelete={handleDelete} />
        )
      }
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        
        <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
          <Link href="/admin/campaigns/create">
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