import * as React from 'react';
import { NavLink } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';


type PackPropsType = {
    id: string
    name: string
    cardsCount: number
    grade: number
    updated: string
    deletePack: (packID: string) => void
    updatePack: (packID: string) => void
}


export function Pack(props: PackPropsType) {

    const { id, name, cardsCount, grade, updated } = props

    const deletePack = () => {
        props.deletePack(id)
    }

    const updatePack = () => {
        props.updatePack(id)
    }

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{cardsCount}</TableCell>
            <TableCell>{grade}</TableCell>
            <TableCell>{updated}</TableCell>
            <TableCell>
                <IconButton onClick={updatePack}>
                    <Edit color="primary" />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deletePack}>
                    <Delete color="secondary" />
                </IconButton>
            </TableCell>
            <TableCell>
                <NavLink to={'/cards/' + id}>Cards</NavLink>
            </TableCell>
        </TableRow>
    )
}