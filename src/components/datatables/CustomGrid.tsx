import React, { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useColorMode } from '@chakra-ui/react';
import Pagination from './Pagination';

interface CustomGridProps {
  rowData: any[];
  columnDefs: any[];
  page: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  perPage?: number;
  totalCount?: number;
}

const CustomGrid: React.FC<CustomGridProps> = ({
  rowData,
  columnDefs,
  page,
  onPageChange,
  onLimitChange,
  perPage = 10,
  totalCount = 0,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (gridRef.current && rowData.length > 0) {
      const gridApi = gridRef.current.api;
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    }
  }, [rowData]);

  const handlePaginationChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const handlePageSizeChange = (pageSize:number) => {
    onLimitChange(pageSize);
  };

  return (
    <div className={`ag-theme-alpine ${colorMode == 'dark' ? 'ag-theme-balham-dark' : ''}`} style={{ height: '80vh', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '10px' }}>
        <div>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / perPage)}
            onPageChange={handlePaginationChange}
            perPage={perPage}
            handlePageSizeChange={handlePageSizeChange}
            totalCount={totalCount}
          />
        </div>
      </div>
      <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={perPage}
          domLayout="autoHeight"
          suppressPaginationPanel={true}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit(); 
          }}
      />
    </div>
  );
};

export default CustomGrid;
