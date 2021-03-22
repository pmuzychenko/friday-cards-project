import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import { AppRootStateType } from "../../../../reducers/store";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';

import styles from './Pack.module.css'

type PackPropsType = {
    id: string
    user_id: string
    name: string
    cardsCount: number
    grade: number
    updated: string
    deletePack: (packID: string) => void
    updatePack: (packID: string) => void
}


export function Pack(props: PackPropsType) {

    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const { id, name, cardsCount, grade, updated, user_id } = props

    const date = new Date(updated)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const dateOfUpdate = `${day}-${month}-${year}`
    const timeOfUpdate = `${hours}:${minutes}`

    const deletePack = () => {
        props.deletePack(id)
    }

    const updatePack = () => {
        props.updatePack(id)
    }

    return (
        <TableRow className={styles.tablePackRow}>
            <TableCell className={styles.tableRowCellName}>{name}</TableCell>
            <TableCell className={styles.tableRowCellCardsCount} align='center'>{cardsCount}</TableCell>
            <TableCell className={styles.tableRowCellGrade} align='center'>{grade}</TableCell>
            <TableCell className={styles.tableRowCellUpdated} align='center'>
                {dateOfUpdate}<br />
                {timeOfUpdate}
            </TableCell>
            <TableCell>
                <IconButton onClick={updatePack} disabled={userId !== user_id}>
                    <Edit color={userId !== user_id ? "disabled" : "primary"} />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deletePack} disabled={userId !== user_id}>
                    <Delete color={userId !== user_id ? "disabled" : "primary"} />
                </IconButton>
            </TableCell>
            <TableCell className={styles.tableRowCellCardsLink}>
                <NavLink to={'/cards/' + id}>Cards</NavLink>
            </TableCell>
        </TableRow>
    )
}