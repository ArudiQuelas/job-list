import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { addData } from '../../action'
import { priorityOptions } from '../../helpers/contants';
import styles from './styles.scss';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            jobName: "",
            priority: "",
        };
    }

    handleClickCreateButton = () => {
        const { jobName, priority } = this.state;
        if (jobName && priority) {
            const data = {
                id: uuidv4(),
                ...this.state
            }
            this.props.triggerAddData(data);
            this.setState({
                jobName: "",
                priority: ""
            })
        }
    }

    handleChangeJob = (e) => {
        const value = e.target.value;
        if (value.match(/^[a-zA-Z\s]*$/)) {
            if(value.length < 71) {
                this.setState({
                    jobName: value,
                });
            }
        }
    }

    handleChangePriority = (e) => {
        this.setState({
            priority: e.target.value
        });
    }

    render() {
        const { jobName, priority } = this.state;
        return (
            <>
                <TextField
                    id="outlined-helperText"
                    label="Job"
                    placeholder="Job"
                    fullWidth
                    name="Job"
                    value={jobName}
                    variant="outlined"
                    onChange={this.handleChangeJob}
                    className={styles.jobName}
                    
                />
                <Select
                    native
                    fullWidth
                    label="priority"
                    variant="outlined"
                    value={priority}
                    onChange={this.handleChangePriority}
                    className={styles.priority}
                    inputProps={{
                        name: 'priority',
                        id: 'priority-label'
                    }}
                    >
                        <option aria-label="None" value="" >Select a priority</option>
                        {Object.keys(priorityOptions).map((key) => (
                            <option key={key} value={key}>{priorityOptions[key]}</option>
                        ))}
                </Select>
                <Button className={styles.createButton} variant="contained" size="medium" onClick={this.handleClickCreateButton} color="primary">
                    Create
                </Button>
            </>    
        )
    }
}

const mapDispatchToProps = dispatch => ({
    triggerAddData: data => dispatch(addData(data)),
});

export default connect(null, mapDispatchToProps)(Form);