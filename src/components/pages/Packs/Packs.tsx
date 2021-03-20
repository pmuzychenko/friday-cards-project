import * as React from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../reducers/store';
import { addPackTC, ColumnType, deletePackTC, getPacksTC, PackType, setPacksAC, updatePackTC } from '../../../reducers/packs-reducer';
import Pagination from '../../common/Pagination/Pagination';
import { Pack } from './Pack/Pack';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { TableSortLabel } from '@material-ui/core';


export function Packs() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.packs.columns)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pagesAmount = Math.ceil(cardPacksTotalCount / pageSize)

    const addPack = () => {
        dispatch(addPackTC())
    }

    const deletePack = (packID: string) => {
        dispatch(deletePackTC(packID))
    }

    const updatePack = (packID: string) => {
        dispatch(updatePackTC(packID))
    }

    const sortUpByName = () => {
        let sortPacks = packs.sort((a, b) => a.name > b.name ? 1 : -1)
        dispatch(setPacksAC(sortPacks))
    }

    const sortDownByName = () => {
        let sortPacks = packs.sort((a, b) => a.name < b.name ? 1 : -1)
        dispatch(setPacksAC(sortPacks))
    }

    const sortUpByAmount = () => {
        let sortPacks = packs.sort((a, b) => b.cardsCount - a.cardsCount)
        dispatch(setPacksAC(sortPacks))
    }

    const sortDownByAmount = () => {
        let sortPacks = packs.sort((a, b) => a.cardsCount - b.cardsCount)
        dispatch(setPacksAC(sortPacks))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getPacksTC(pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getPacksTC(currentPage, pageSize))
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    // работает, но затирает стиль текущей страницы
    // if (status === 'loading') {
    //     return <Preloader />
    // }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        {columns.map(column => {
                            return (
                                <TableCell
                                    key={column.id}
                                    component='th'
                                    style={{ fontWeight: 'bold' }}
                                >{column.name}
                                    {column.name === 'Name' &&
                                        <div style={{display: 'inline-block'}}>
                                            <TableSortLabel
                                                active={true}
                                                direction={'asc'}
                                                onClick={sortUpByName}
                                            />
                                            <TableSortLabel
                                                active={true}
                                                direction={'desc'}
                                                onClick={sortDownByName}
                                            />
                                        </div>
                                    }
                                    {column.name === 'Amount of cards' &&
                                        <div style={{display: 'inline-block'}}>
                                            <TableSortLabel
                                                active={true}
                                                direction={'asc'}
                                                onClick={sortUpByAmount}
                                            />
                                            <TableSortLabel
                                                active={true}
                                                direction={'desc'}
                                                onClick={sortDownByAmount}
                                            />
                                        </div>}
                                </TableCell>
                            )
                        })}
                        <TableCell colSpan={2}>
                            <Button color="primary" variant={'contained'} onClick={addPack}>
                                Add pack
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map(pack => <Pack
                        key={pack._id}
                        id={pack._id}
                        name={pack.name}
                        cardsCount={pack.cardsCount}
                        grade={pack.grade}
                        updated={pack.updated}
                        deletePack={deletePack}
                        updatePack={updatePack} />
                    )}
                </TableBody>
            </Table>
            <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} />
        </TableContainer>
    )
}
