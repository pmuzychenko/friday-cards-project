import * as React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

type CardPropsType = {
    cardID: string
    question: string
    answer: string
    grade: number
    updated: string
    deleteCard: (cardID: string) => void
    updateCard: (cardID: string) => void
}

export function Card(props: CardPropsType) {

    const { cardID, question, answer, grade, updated } = props

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
                <IconButton onClick={updateCard}>
                    <Edit color="secondary" />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deleteCard}>
                    <Delete color="secondary" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}