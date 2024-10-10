import {useState,useEffect} from "react";
const UseDebounch = (value,delay) => {
    const [debounceValue,setDebounchValue] = useState("")
    useEffect(() =>{
        const handler = setTimeout(() =>{
            setDebounchValue(value)
        },delay)
        return (() =>{
            clearTimeout(handler)
        })
    },[value,delay])

    return debounceValue;
}
export default UseDebounch;