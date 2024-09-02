import ReactLoading from 'react-loading';

import styles from "./styles.module.css";

export default function Loader(props) {
    const show = props.showLoader;
    return (
        <div className={styles.container}>
            {show ?
                <ReactLoading type={"balls"} color={"#454545"} height={'200px'} width={'400px'} />
                : ""
            }
        </div>
    );
}