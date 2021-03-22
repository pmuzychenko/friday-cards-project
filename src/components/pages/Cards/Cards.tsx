import * as React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppRootStateType } from '../../../reducers/store';
import { ColumnType } from '../../../reducers/packs-reducer';
import { addCardTC, CardsStateType, deleteCardTC, getCardsTC, updateCardTC } from '../../../reducers/cards-reducer';
import Pagination from '../../common/Pagination/Pagination';
import { Card } from './Card/Card';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';

import styles from './Cards.module.css'
import { TableSortLabel } from '@material-ui/core';

type MatchParams = {
    id: string;
}

export function Cards() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards.cards)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.cards.columns)

    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pagesAmount = Math.ceil(cardsTotalCount / pageSize)

    const match = useRouteMatch<MatchParams>('/cards/:id');
    const packID = match?.params.id
    const cardsForPack = packID && cards[packID]

    let startSortPropertyCards = localStorage.sortPropertyCards ? JSON.parse(localStorage.sortPropertyCards) : ''
    const [sortProperty, setSortProperty] = useState<string>(startSortPropertyCards)

    const addCard = () => {
        packID && dispatch(addCardTC(packID))
    }

    const deleteCard = (cardID: string) => {
        packID && dispatch(deleteCardTC(cardID, packID))
    }

    const updateCard = (cardID: string) => {
        packID && dispatch(updateCardTC(cardID, packID))
    }

    const onPageChanged = (pageNumber: number) => {
        packID && dispatch(getCardsTC(pageNumber, pageSize, packID))
    }

    const sortUpByGrade = () => {
        localStorage.setItem('sortPropertyCards', JSON.stringify('1grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortPropertyCards)
        setSortProperty(parsedSortProperty)
        packID && dispatch(getCardsTC(currentPage, pageSize, packID, parsedSortProperty))
    }

    const sortDownByGrade = () => {
        localStorage.setItem('sortPropertyCards', JSON.stringify('0grade'))
        let parsedSortProperty = JSON.parse(localStorage.sortPropertyCards)
        setSortProperty(parsedSortProperty)
        packID && dispatch(getCardsTC(currentPage, pageSize, packID, parsedSortProperty))
    }

    useEffect(() => {
        packID && dispatch(getCardsTC(currentPage, pageSize, packID, sortProperty))
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
            <h2 className={styles.cardsHeader}>CARDS</h2>
            <TableContainer component={Paper} className={styles.cardsTable}>
                <Table>
                    <TableHead className={styles.cardsTableHead}>
                        <TableRow className={styles.cardsTableHeadColumnRow}>
                            {columns.map(column => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        component='th'
                                        align='center'
                                        className={styles.cell}
                                    >{column.name}
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
                                    </TableCell >
                                )
                            })}
                            <TableCell colSpan={2} align='center'>
                                <Button color="secondary" variant={'contained'} onClick={addCard}>
                                    Add card
                            </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardsForPack && cardsForPack.map(card => {
                            return (
                                <Card
                                    key={card._id}
                                    cardID={card._id}
                                    user_id={card.user_id}
                                    question={card.question}
                                    answer={card.answer}
                                    grade={card.grade}
                                    updated={card.updated}
                                    deleteCard={deleteCard}
                                    updateCard={updateCard}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
                <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} />
            </TableContainer>
        </div>
    )
}
