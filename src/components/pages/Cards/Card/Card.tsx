import * as React from 'react';
import { useSelector } from "react-redux";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { AppRootStateType } from "../../../../reducers/store";

import styles from './Card.module.css'

type CardPropsType = {
    cardID: string
    user_id: string
    question: string
    answer: string
    grade: number
    updated: string
    deleteCard: (cardID: string) => void
    updateCard: (cardID: string) => void
}

export function Card(props: CardPropsType) {
    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const { cardID, question, answer, grade, updated, user_id } = props

    const date = new Date(updated)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const dateOfUpdate = `${day}-${month}-${year}`
    const timeOfUpdate = `${hours}:${minutes}`

    const deleteCard = () => {
        props.deleteCard(cardID)
    }

    const updateCard = () => {
        props.updateCard(cardID)
    }

    return (
        <TableRow className={styles.tableCardRow}>
            <TableCell className={styles.tableRowCellQuestion}>{question}</TableCell>
            <TableCell className={styles.tableRowCellAnswer}>{answer}</TableCell>
            <TableCell className={styles.tableRowCellGrade} align='center'>{grade}</TableCell>
            <TableCell className={styles.tableRowCellUpdated} align='center'>
                {dateOfUpdate}<br />
                {timeOfUpdate}
            </TableCell>
            <TableCell>
                <IconButton onClick={updateCard} disabled={userId !== user_id}>
                    <Edit color={userId !== user_id ? "disabled" : "secondary"} />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deleteCard} disabled={userId !== user_id}>
                    <Delete color={userId !== user_id ? "disabled" : "secondary"} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}