import * as React from 'react';
import {
  DataGrid,
  GridSlotProps,
  GridSlots,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<
      React.SetStateAction<HTMLButtonElement | null>
    >;
  }
}

function CustomToolbar({ setFilterButtonEl }: GridSlotProps['toolbar']) {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
}

export default function CustomFilterPanelPosition() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        slots={{
          toolbar: CustomToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: { setFilterButtonEl },
        }}
      />
    </div>
  );
}
