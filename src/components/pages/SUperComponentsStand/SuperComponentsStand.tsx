import React from "react";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import styles from "./SuperComponentsStand.module.css"

export const SuperComponentsStand = () => {
    return (
        <div className={styles.superComponentsStand}>
            <SuperInputText />
            <SuperButton> Button </SuperButton>
            <SuperCheckbox />
        </div>
    );
}