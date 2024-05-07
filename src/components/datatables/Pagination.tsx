import React from 'react';
import { Button, Box, Select, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage?: number;
  onPageChange: (page: number) => void;
  handlePageSizeChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, perPage = 3 , handlePageSizeChange, totalCount}) => {  
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    let secondaryText = useColorModeValue('gray.700', 'white')

  return (
    <Flex justifyContent={'start'} alignItems={'center'} gap={'10px'}>
        <Text fontSize={'16px'} color={secondaryText}>
            Total Count : {totalCount}
        </Text>
        <Select color={secondaryText} value={perPage.toString()} onChange={(e: any) => handlePageSizeChange(e.target.value)} width="80px">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
        </Select>
        <Button
          variant={currentPage > 1 ? 'brand' :  'lightBrand'}
          onClick={currentPage > 1 ? () => handlePageChange(currentPage - 1) : undefined}
          >
          <BiArrowToLeft />
        </Button>
        <Text fontSize={'16px'} color={secondaryText}>
            Page {currentPage} of {totalPages} 
        </Text>
        <Button
          variant={totalPages != currentPage ? 'brand' :  'lightBrand'}
          onClick={totalPages !== currentPage ? () => handlePageChange(currentPage + 1) : undefined}
        >
          <BiArrowToRight />
        </Button>
    </Flex>
  );
};

export default Pagination;
