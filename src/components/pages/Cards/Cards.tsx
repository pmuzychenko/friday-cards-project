import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../reducers/store';
import { ColumnType } from '../../../reducers/packs-reducer';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { CardsStateType } from '../../../reducers/cards-reducer';


export function Cards() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards.cards)
    const columns = useSelector<AppRootStateType, Array<ColumnType>>(state => state.cards.columns)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pagesAmount = Math.ceil(cardsTotalCount / pageSize)

    // const addPack = (e: any, name: string = 'PROJECT-PACK') => {
    //     dispatch(addPackTC(name))
    // }

    // const deletePack = (packID: string) => {
    //     dispatch(deletePackTC(packID))
    // }

    // const updatePack = (packID: string) => {
    //     dispatch(updatePackTC(packID))
    // }

    // const onPageChanged = (pageNumber: number) => {
    //     dispatch(getPacksTC(pageNumber, pageSize))
    // }

    // useEffect(() => {
    //     dispatch(getPacksTC(currentPage, pageSize))
    // }, [])

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
                                >{column.name}</TableCell >
                            )
                        })}
                        <TableCell colSpan={2}>
                            <Button color="primary" variant={'contained'} onClick={() => alert('add card')}>
                                Add card
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* { packs.map(pack => <Pack
                        key={pack._id}
                        id={pack._id}
                        name={pack.name}
                        cardsCount={pack.cardsCount}
                        grade={pack.grade}
                        updated={pack.updated}
                        deletePack={deletePack}
                        updatePack={updatePack} />
                    )} */}
                </TableBody>
            </Table>
            {/* <Pagination totalCount={pagesAmount} onPageChanged={onPageChanged} /> */}
        </TableContainer>
    )
}
