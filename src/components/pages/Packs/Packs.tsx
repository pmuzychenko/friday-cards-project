import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {AppRootStateType} from '../../../reducers/store';
import {
    addPackTC,
    ColumnType,
    deletePackTC,
    getPacksTC,
    PackType,
    updatePackTC
} from '../../../reducers/packs-reducer';
import Pagination from '../../common/Pagination/Pagination';
import {Pack} from './Pack/Pack';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import {TableSortLabel} from '@material-ui/core';
import styles from './Packs.module.css'


export function Packs() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.packs.columns)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pagesAmount = Math.ceil(cardPacksTotalCount / pageSize)

    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const [myPacksShowValue, setMyPacksShowValue] = useState<boolean>(false)

    const [sortProperty, setSortProperty] = useState<string>('')

    const addPack = () => {
        if (myPacksShowValue) {
            userId && dispatch(addPackTC(userId))
        } else {
            dispatch(addPackTC())
        }
    }

    const showMyPacks = (e: ChangeEvent<HTMLInputElement>) => {
        setMyPacksShowValue(e.currentTarget.checked)
        if (!myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize))
        }
    }

    const deletePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(deletePackTC(packID, userId))
        } else {
            dispatch(deletePackTC(packID))
        }
    }

    const updatePack = (packID: string) => {
        if (myPacksShowValue) {
            userId && dispatch(updatePackTC(packID, userId))
        } else {
            dispatch(updatePackTC(packID))
        }
    }

    const sortUpByName = () => {

        setSortProperty('1name')
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize, sortProperty))
        }
    }

    const sortDownByName = () => {
        setSortProperty('0name')
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize,sortProperty))
        }
    }

    const sortUpByAmount = () => {
        setSortProperty('1cardsCount')
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize,sortProperty))
        }
    }

    const sortDownByAmount = () => {
        setSortProperty('0cardsCount')
        if (myPacksShowValue) {
            userId && dispatch(getPacksTC(currentPage, pageSize, sortProperty, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize,sortProperty))
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
            userId && dispatch(getPacksTC(currentPage, pageSize, userId))
        } else {
            dispatch(getPacksTC(currentPage, pageSize))
        }
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    // работает, но затирает стиль текущей страницы
    // if (status === 'loading') {
    //     return <Preloader />
    // }

    return (
        <div>
            <h1 className={styles.packsHeader}>Cards Pack</h1>
            <input type='checkbox' checked={myPacksShowValue} onChange={showMyPacks}/><span
            className={styles.showMyPacks}>Show My Packs</span>
            <TableContainer component={Paper} className={styles.packsTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        component='th'
                                        style={{fontWeight: 'bold'}}
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
                <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged}/>
            </TableContainer>
        </div>
    )
}
