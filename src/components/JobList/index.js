import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteData, updateData, search } from '../../action'
import styles from './styles.scss';
import TextField from '@material-ui/core/TextField';
import Child from './Child';

class JobList extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ""
        }
    }

    deleteItem = (id) => {
        this.props.triggerDeleteData(id);
        this.searchList();
    }

    updateItem = (id, value) => {
        this.props.triggerUpdateData({id, value});
    }

    searchList = () => {
        const { searchText } = this.state;
        this.props.triggerSearch(searchText);
    }

    handleSearch = (e) => {
        this.setState({
            searchText: e.target.value
        }, () => {
            this.searchList();
        })
    }

    render() {
        const { jobList, filteredJobList } = this.props;
        const { searchText } = this.state;
        const list = (filteredJobList?.length || !!searchText) ? filteredJobList : jobList;

        return (
            <div className={styles.jobListContainer}>
                <div className={styles.searchArea}>
                    <h3>JobListt</h3>
                    <TextField
                        id="outlined-helperText"
                        label="Search Job"
                        placeholder="Search Job"
                        fullWidth
                        name="search"
                        value={searchText}
                        variant="outlined"
                        onChange={this.handleSearch}
                        className={styles.searchInput}
                        
                    />
                </div>
                <div>
                    <table className={styles.table}>
                        <tr>
                            <th>Job Name</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                        { list?.length ? 
                            list.map((item) =>
                                <Child key={item.id} id={item.id} deleteItem={this.deleteItem} updateItem={this.updateItem} jobName={item.jobName} priority={item.priority} />) : 
                            <tr>
                                <td style={{ textAlign: 'center' }} colSpan={"3"}>No data</td>
                            </tr>
                        }
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    jobList: state.jobList,
    filteredJobList: state.filteredJobList,
});

const mapDispatchToProps = dispatch => ({
    triggerDeleteData: data => dispatch(deleteData(data)),
    triggerUpdateData: (data) => dispatch(updateData(data)),
    triggerSearch: (data) => dispatch(search(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
