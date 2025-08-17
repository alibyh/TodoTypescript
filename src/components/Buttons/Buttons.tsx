import './Buttons.css'
// import type { MouseEventHandler } from 'react';

interface ButtonChildren{
    children: string;
    myOnClick?: any;
}
export default function Button({children, myOnClick}: ButtonChildren){
    return(
        <>
        <button onClick={myOnClick} className="AddButton" >{children}</button>
        </>
    )
}