'use client'

import React, { useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useColorMode } from '@chakra-ui/system';

interface CustomGridProps {
    rowData: any[];
    columnDefs: any[];
    page?: number;
    perPage?: number;
}

const CustomGrid: React.FC<CustomGridProps> = ({ rowData, columnDefs, page = 1, perPage = 10 }) => {
  
  const gridRef = useRef<any>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (gridRef.current && rowData.length > 0) {
      const gridApi = gridRef.current.api;
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    }
  }, [rowData]);


  return (
      <div className={`ag-theme-alpine ${colorMode == 'dark' ? 'ag-theme-balham-dark' : ''}`} style={{ height: '80vh', width: '100%' }}>
          <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={perPage}
              domLayout='autoHeight' 
              onGridReady={(params) => {
                params.api.sizeColumnsToFit(); 
              }}
          />
      </div>
  );
}

export default CustomGrid