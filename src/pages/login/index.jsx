import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getUserLogged } from "../../services/userLogged";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { notifyError, notifySuccess, setUserLogged, user } = useContext(ApplicationContext);
    const navigate = useNavigate();

    useEffect(()=>{
        let user = getUserLogged();
        if(user){
            navigate("/home");
        }
    })

    function login(){
        if(email == "user@email.com" && password == "12345"){
            setUserLogged({email, name: 'Usuário Default', token: 'd9c37f106e9c5030c76c4c72b715e07a'})
            notifySuccess("Login realizado com sucesso");
            navigate("/home")
        }else{
            setEmail("");
            setPassword("");
            notifyError("Credenciais inválidas");
        }
    }
    return (
        <div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Email"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Senha"/>
            <button onClick={login}>Entrar</button>
        </div>
    );
}