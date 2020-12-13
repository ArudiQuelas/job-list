import React, { memo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import styles from './styles.scss';
import { priorityOptions } from '../../../helpers/contants';
import Modal from '@material-ui/core/Modal';


const Child = (props) => {
    const cls = priorityOptions[props.priority].toLowerCase();
    const [modalStatus, setModalStatus] = useState(false);
    const [editedPriority, setEditedPriority] = useState(props.priority);

    const handleOpenModal = () => {
        setModalStatus(true);
    };

    const handleCloseModal = () => {
        setModalStatus(false);
    };

    const handleEditPriority = (e) => {
        setEditedPriority(e.target.value);
    };

    const handleUpdateData = (id, value) => {
        props.updateItem(id, value);
        handleCloseModal();
    };

    return (
        <>
            <tr className={styles[cls]}>
                <td>{props.jobName}</td>
                <td>{priorityOptions[props.priority]}</td>
                <td>
                    <Button variant="contained" color="primary" onClick={handleOpenModal} >
                        Edit
                    </Button>
                    <Button style={{ marginLeft: '20px' }} variant="contained" color="primary" onClick={() => props.deleteItem(props.id)}>
                        Delete
                    </Button>
                </td>
            </tr>
            <Modal
                open={modalStatus}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.modal}>
                    <h3>{props.jobName}</h3>
                    <Select
                        native
                        fullWidth
                        label="Priority"
                        variant="outlined"
                        value={editedPriority}
                        onChange={handleEditPriority}
                        inputProps={{
                            name: 'priority',
                        }}
                        >
                            {Object.keys(priorityOptions).map((key) => (
                                <option key={key} value={key}>{priorityOptions[key]}</option>
                            ))}
                    </Select>
                    <Button className={styles.modalButton} variant="contained" onClick={() => handleUpdateData(props.id, editedPriority)} color="primary">
                        Update
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default memo(Child);