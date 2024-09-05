import { useState, useEffect } from "react";


export default function SetTimeOutExample()
{
    const [width,setWidth] = useState(150)
    useEffect(()=>{
            setTimeout(
                ()=>{
                setWidth((width+30) % 500);
                console.log(width)
            },300);
        },[width])
    return <>
        <div style={{width:width, backgroundColor:"#f00"}}>&nbsp;</div>
    </>
}