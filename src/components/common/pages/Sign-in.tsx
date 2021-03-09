import React from "react";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import SuperButton from "../c2-SuperButton/SuperButton";

export const SignIn = () => {
    return (
        <div>
            <h2>REGISTRATION</h2>
            <div>
                <SuperInputText placeholder='Enter email' />
            </div>
            <div>
                <SuperInputText placeholder='Enter password' />
            </div>
            <div>
                <SuperInputText placeholder='Repeat password' />
            </div>
            <div>
                <SuperButton>SIGN UP</SuperButton>
            </div>
        </div>
    );
}