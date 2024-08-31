import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getUserLogged } from "../../services/userLogged";

import styles from "./styles.module.css";

export default function Header(){
    const navigate = useNavigate();
    const { changeTheme} = useContext(ApplicationContext);

    const [name, setName] = useState("");

    useEffect(()=>{
        let user = getUserLogged();
        if(user){
            setName(user.name);
        }else{
            navigate("/", {replace: true});
        }
    }, []);

    return (
        <div className={styles.container}>
            <button onClick={changeTheme}>Trocar tema</button>
            <p>Olá, {name}</p>
        </div>
    );
}