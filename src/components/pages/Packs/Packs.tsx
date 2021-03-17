import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { AppRootStateType } from '../../../reducers/store';
import { ColumnType, getPacksTC, PackType } from '../../../reducers/packs-reducer';
import Pagination from '../../common/Pagination';
import { authMeTC } from '../../../reducers/login-reducer';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';

export function Packs() {
    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.packs.columns)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pagesAmount = Math.ceil(cardPacksTotalCount / pageSize)

    const onPageChanged = (pageNumber: number) => {
        dispatch(getPacksTC(pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(authMeTC())
        dispatch(getPacksTC(currentPage, pageSize))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        {columns.map(column => {
                            return (
                                <TableCell key={column.id} component='th' style={{ fontWeight: 'bold' }}>{column.name}</TableCell >
                            )
                        })}
                        <TableCell colSpan={2}>
                            <Button color="primary" variant={'contained'} onClick={() => alert("add")}>
                                Add pack
                        </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map(pack => {
                        return (
                            <TableRow key={pack._id}>
                                <TableCell>{pack.name}</TableCell>
                                <TableCell>{pack.cardsCount}</TableCell>
                                <TableCell>{pack.grade}</TableCell>
                                <TableCell>{pack.updated}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => alert("edit")}>
                                        <Edit color="primary" />
                                    </IconButton></TableCell>
                                <TableCell>
                                    <IconButton onClick={() => alert("delete")}>
                                        <Delete color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {/* <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} /> */}
            <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} />
        </TableContainer>
    )
}
