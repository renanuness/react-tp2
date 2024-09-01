import ReactLoading from 'react-loading';

import styles from "./styles.module.css";

export default function Loader(props) {
    const show = props.showLoader;
    return (
        <div className={styles.container}>
            {show ?
                <ReactLoading type={"balls"} color={"#fff"} height={'100%'} width={'400px'} />
                : ""
            }
        </div>
    );
}