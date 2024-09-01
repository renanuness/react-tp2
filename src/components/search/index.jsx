import styles from "./styles.module.css";

export default function Search({setFilter}){
    return (
        <div className={styles.container}>
            <input onChange={(e)=>setFilter(e.target.value)}placeholder="Filtrar"/>
        </div>
    );
}