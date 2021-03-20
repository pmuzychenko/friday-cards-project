import * as React from 'react';
import { NavLink } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../reducers/store";


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
                <IconButton onClick={updatePack} disabled={userId !== user_id}>
                    <Edit color={userId !== user_id ? "disabled" : "primary" }/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deletePack} disabled={userId !== user_id}>
                    <Delete color={userId !== user_id ? "disabled" : "primary" }/>
                </IconButton>
            </TableCell>
            <TableCell>
                <NavLink to={'/cards/' + id}>Cards</NavLink>
            </TableCell>
        </TableRow>
    )
}