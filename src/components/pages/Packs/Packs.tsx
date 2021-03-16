import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {field: 'name', headerName: 'Name', width: 130},
    {field: 'cardsAmount', headerName: 'Amount of cards', type: 'number', width: 180},
    {field: 'updatedDate', headerName: 'Date of updates', width: 180},
    {field: 'owner', headerName: 'Owner', width: 180},
];

const rows = [
    {id: 1, name: 'Snow', owner: 'Jon', cardsAmount: 35, updatedDate: '16-03-2021'},
    {id: 2, name: 'Lannister', owner: 'Cersei', cardsAmount: 42, updatedDate: '16-03-2021'},
    {id: 3, name: 'Lannister', owner: 'Jaime', cardsAmount: 45, updatedDate: '16-03-2021'},
    {id: 4, name: 'Stark', owner: 'Arya', cardsAmount: 16, updatedDate: '16-03-2021'},
    {id: 5, name: 'Targaryen', owner: 'Daenerys', cardsAmount: 45, updatedDate: '16-03-2021'},
    {id: 6, name: 'Melisandre', owner: 'Me', cardsAmount: 150, updatedDate: '16-03-2021'},
    {id: 7, name: 'Clifford', owner: 'Ferrara', cardsAmount: 44, updatedDate: '16-03-2021'},
    {id: 8, name: 'Frances', owner: 'Rossini', cardsAmount: 36, updatedDate: '16-03-2021'},
    {id: 9, name: 'Roxie', owner: 'Harvey', cardsAmount: 65, updatedDate: '16-03-2021'},
];

export function Packs() {
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={5}/>
        </div>
    );
}
