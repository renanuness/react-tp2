import Modal from 'react-modal';
import styles from "./styles.module.css";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function MyModal({openModal, onConfirm, onCancel}){

  return (
      <Modal
        isOpen={openModal}
        style={customStyles}
      >
        <h2>Deseja confirmar?</h2>
        <div className={styles.btnContainer}>
        <button onClick={()=>onConfirm()}>Sim</button>
        <button onClick={()=>onCancel()}>Não</button>
        </div>
      </Modal>
  );
}
