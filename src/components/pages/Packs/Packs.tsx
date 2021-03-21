import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../reducers/store';
import {
    addPackTC,
    ColumnType,
    deletePackTC,
    getPacksTC,
    PackType,
    updatePackTC
} from '../../../reducers/packs-reducer';
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
import styles from './Packs.module.css'
import Checkbox from '@material-ui/core/Checkbox';


export function Packs() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.packs.columns)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pagesAmount = Math.ceil(cardPacksTotalCount / pageSize)

    let startMyPacksShowValue = localStorage.myPacksShowValue ? JSON.parse(localStorage.myPacksShowValue) : false
    let startSortProperty = localStorage.sortProperty ? JSON.parse(localStorage.sortProperty) : ''
    const [myPacksShowValue, setMyPacksShowValue] = useState<boolean>(startMyPacksShowValue)
    const [sortProperty, setSortProperty] = useState<string>(startSortProperty)

    const addPack = () => {
        if (myPacksShowValue) {
            userId && dispatch(addPackTC(sortProperty, userId))
        } else {
            dispatch(addPackTC(sortProperty))
        }
    }

    const showMyPacks = (e: ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('myPacksShowValue', JSON.stringify(e.currentTarget.checked))
        let parsedMyPacksShowValue = JSON.parse(localStorage.myPacksShowValue)
        setMyPacksShowValue(parsedMyPacksShowValue)
        if (parsedMyPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, sortProperty))
        }
    }

    const deletePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(deletePackTC(packID, sortProperty, userId))
        } else {
            dispatch(deletePackTC(packID, sortProperty))
        }
    }

    const updatePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(updatePackTC(packID, sortProperty, userId))
        } else {
            dispatch(updatePackTC(packID, sortProperty))
        }
    }

    const sortUpByName = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1name'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const sortDownByName = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0name'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const sortUpByAmount = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1cardsCount'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const sortDownByAmount = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0cardsCount'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const sortUpByGrade = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const sortDownByGrade = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty))
        }
    }

    const onPageChanged = (pageNumber: number) => {
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(pageNumber, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(pageNumber, pageSize, sortProperty))
        }
    }

    useEffect(() => {
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, sortProperty))
        }
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    // работает, но затирает стиль текущей страницы
    // if (status === 'loading') {
    //     return <Preloader />
    // }

    return (
        <div>
            <h2 className={styles.packsHeader}>PACKS OF CARDS</h2>
            <Checkbox checked={myPacksShowValue} onChange={showMyPacks} color={'primary'} />
            <span className={styles.showMyPacksTitle}>My packs</span>
            <TableContainer component={Paper} className={styles.packsTable}>
                <Table>
                    <TableHead className={styles.packsTableHead}>
                        <TableRow className={styles.packsTableHeadColumnRow}>
                            {columns.map(column => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        className={styles.cell}
                                    >{column.name}
                                        {column.name === 'Name' &&
                                            <div>
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
                                            </div>}
                                        {column.name === 'Amount of cards' &&
                                            <div>
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
                                            {column.name === 'Grade' &&
                                            <div>
                                                <TableSortLabel
                                                    active={true}
                                                    direction={'asc'}
                                                    onClick={sortUpByGrade}
                                                />
                                                <TableSortLabel
                                                    active={true}
                                                    direction={'desc'}
                                                    onClick={sortDownByGrade}
                                                />
                                            </div>}
                                    </TableCell>
                                )
                            })}
                            <TableCell colSpan={3} align='center'>
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
                            user_id={pack.user_id}
                            name={pack.name}
                            cardsCount={pack.cardsCount}
                            grade={pack.grade}
                            updated={pack.updated}
                            deletePack={deletePack}
                            updatePack={updatePack}
                        />
                        )}
                    </TableBody>
                </Table>
                <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} />
            </TableContainer>
        </div>
    )
}
