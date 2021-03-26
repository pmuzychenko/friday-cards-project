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
import TextField from '@material-ui/core/TextField';


export function Packs() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.packs.columns)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    let currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pagesAmount = Math.ceil(cardPacksTotalCount / pageSize)

    let startMyPacksShowValue = localStorage.myPacksShowValue ? JSON.parse(localStorage.myPacksShowValue) : false
    let startSortProperty = localStorage.sortProperty ? JSON.parse(localStorage.sortProperty) : ''
    let startFilterProperty = localStorage.filterProperty ? JSON.parse(localStorage.filterProperty) : ''
    const [myPacksShowValue, setMyPacksShowValue] = useState<boolean>(startMyPacksShowValue)
    const [sortProperty, setSortProperty] = useState<string>(startSortProperty)
    const [searchPack, setSearchPack] = useState<string>(startFilterProperty)

    const addPack = () => {
        if (myPacksShowValue) {
            userId && dispatch(addPackTC(sortProperty, searchPack, userId))
        } else {
            dispatch(addPackTC(sortProperty, searchPack))
        }
    }

    const showMyPacks = (e: ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('myPacksShowValue', JSON.stringify(e.currentTarget.checked))
        let parsedMyPacksShowValue = JSON.parse(localStorage.myPacksShowValue)
        setMyPacksShowValue(parsedMyPacksShowValue)
        if (parsedMyPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, searchPack, sortProperty))
        }
    }

    const deletePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(deletePackTC(packID, sortProperty, searchPack, userId))
        } else {
            dispatch(deletePackTC(packID, sortProperty, searchPack))
        }
    }

    const updatePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(updatePackTC(packID, sortProperty, searchPack, userId))
        } else {
            dispatch(updatePackTC(packID, sortProperty, searchPack))
        }
    }

    const sortUpByName = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1name'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const sortDownByName = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0name'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const sortUpByAmount = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1cardsCount'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const sortDownByAmount = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0cardsCount'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const sortUpByGrade = () => {
        localStorage.setItem('sortProperty', JSON.stringify('1grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const sortDownByGrade = () => {
        localStorage.setItem('sortProperty', JSON.stringify('0grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortProperty)
        setSortProperty(parsedSortProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, parsedSortProperty, searchPack))
        }
    }

    const onPageChanged = (pageNumber: number) => {
        window.history.pushState(
            null,
            document.title,
            `${window.location.pathname}?page=${pageNumber}`
        )
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(pageNumber, pageSize, sortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(pageNumber, pageSize, sortProperty, searchPack))
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('filterProperty', JSON.stringify(e.currentTarget.value))
        let parsedFilterProperty = JSON.parse(localStorage.filterProperty)
        setSearchPack(parsedFilterProperty)
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, parsedFilterProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, sortProperty, parsedFilterProperty))
        }
    }

    useEffect(() => {
        const windowData = Object.fromEntries(new URL(String(window.location)).searchParams.entries())
        if (windowData.page) {
            currentPage = +windowData.page
        }
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, searchPack, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, sortProperty, searchPack))
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField 
                label="Search packs by name" 
                style={{ marginRight: '30px' }}
                value={searchPack}
                onChange={onChangeHandler} />
            </div>
            <div>
                <Checkbox checked={myPacksShowValue} onChange={showMyPacks} color={'primary'} />
                <span className={styles.showMyPacksTitle}>My packs</span>
            </div>
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
