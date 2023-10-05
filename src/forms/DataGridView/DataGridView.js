import React, { useEffect,  useState} from 'react';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import axios from "axios";
import saveAs from 'file-saver';


const DataGridView = () => {
  const [col,setCol] = useState([]);
  const[plats,setPlats]=useState([]);
  const [selection, setSelection] = useState([]);

  const getPlats=async()=> {
    const c = [];
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/plat/?format=json`)
        .then((response) => {
          for( const obj of response.data){
             obj.pays= obj.pays.nom;
          }
          setPlats(response.data);
          for( const e of Object.keys(response.data[0])){
              c.push({name: e, title: e.toUpperCase()});
          }
          setCol(c);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }
  useEffect(() => {
    getPlats();
  },[]);

  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };
  return (
      <div>

        <div className="card">
          <Grid
              rows={plats}
              columns={col}
          >
            <PagingState
                defaultCurrentPage={0}
                pageSize={6}
            />
            <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
            />
            <SortingState
                defaultSorting={[{}]}
            />
            <IntegratedSorting />
            <IntegratedPaging />
            <IntegratedSelection />
            <Table />
            <TableHeaderRow showSortingControls />
            <TableSelection showSelectAll />
            <PagingPanel />
          </Grid>

        </div>
      </div>
  );
};
export default DataGridView;