import * as React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../reducers/store";

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

    const deleteCard = () => {
        props.deleteCard(cardID)
    }

    const updateCard = () => {
        props.updateCard(cardID)
    }

    return (
        <TableRow>
            <TableCell>{question}</TableCell>
            <TableCell>{answer}</TableCell>
            <TableCell>{grade}</TableCell>
            <TableCell>{updated}</TableCell>
            <TableCell>
                <IconButton onClick={updateCard} disabled={userId !== user_id}>
                    <Edit color={userId !== user_id ? "disabled" : "secondary" }/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deleteCard} disabled={userId !== user_id}>
                    <Delete color={userId !== user_id ? "disabled" : "secondary" }/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}