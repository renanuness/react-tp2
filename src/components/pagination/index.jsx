
import styles from "./styles.module.css";

export default function Pagination({pages, itemsPerPage, currentPage, setCurrentPage}){
    function ShowNumberButtons(){
        let buttons= []
        for(let i = 1; i <= pages; i++){
            buttons.push(button(i));
        }

        return buttons;
    }

    function button(value){
        let btnClass = "";
        if(value == currentPage){
            btnClass = styles.selected;
        }
        return (<button className={btnClass} onClick={()=>setCurrentPage(value)}>{value}</button>);
    }
    return(
        <div className={styles.container}>
            {ShowNumberButtons()}
        </div>
    )
}