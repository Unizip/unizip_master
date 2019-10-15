import React, { Component } from 'react'
import { User } from '../../redux/types/User'
import { AppState } from '../../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/types/actions';
import { bindActionCreators } from 'redux';
import { startEditUser, startDeleteUser } from '../../redux/actions/userAction';
import { connect } from 'react-redux';


interface HomePageProps {
    id?: string;
    color?: string;
}

interface HomePageState {}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export class HomePage extends Component<Props, HomePageState> {
    onEdit = (user: User) => {
        this.props.startEditUser(user);
    }
    onDelete = (id: string) => {
        this.props.startDeleteUser(id);
    }
    render() {
        const { users } = this.props;
        return (
            <div>
                <h1>Users</h1>
                <div>
                    {users.map(user => (
                        <div>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <button onClick={() => this.onDelete(user.id)}>Delete user</button>
                            <button onClick={() => this.onEdit(user)}>Edit user</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

interface LinkStateProps {
    users: User[];
}

// dispatch returns void 
interface LinkDispatchProps {
    startEditUser: (user: User) => void;
    startDeleteUser: (id: string) => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: HomePageProps
): LinkStateProps => ({
    users: state.users
})


// first two params for ThunkDispatch aren't important. The third is all the possible actions in our redux store
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps): LinkDispatchProps => ({
    startEditUser: bindActionCreators(startEditUser, dispatch),
    startDeleteUser: bindActionCreators(startDeleteUser, dispatch)
})
    


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
