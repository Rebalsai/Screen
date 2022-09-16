import { Spin, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentAction } from '../../reducers/actionsReducer';
import { getPermissions } from '../../reducers/permissionsReducer';
import { actionSubject, publish,onExcellExport } from '../grid.component/subscribir';
class ActionsToolbar extends Component {
    actionBarlistener;
    state = {
        showToolBar: true
    }
    componentDidMount() {
        this.actionBarlistener = actionSubject.subscribe(data => {
            this.setState({ showToolBar: data })
        });
    }
    componentWillUnmount() {
        this.actionBarlistener.unsubscribe();
    }
    render() {
        if (!this.state.showToolBar) {
            return null
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                </div>
                {this.props.permissions?.loading ? <Spin size="default" className="admin-actions mb-0"></Spin>

                    : <ul className="admin-actions mb-0">
                        {this.props.permissions?.[this.props?.permissions?.currentScreen]?.map((item, indx) => item.key !== "view" && item.value && <li key={indx}>
                            <Tooltip placement="top" title={item.key}>
                                <span className={`icon c-pointer md ${item.key === 'disable' ? "status" : item.key} mr-0`} onClick={() => {
                                    this.props?.setAction(item.key); 
                                    if(item.key === "Export Excel"){
                                        onExcellExport()
                                    } else {
                                        publish(item.key);
                                    }
                                }}></span>
                            </Tooltip>
                        </li>)}
                    </ul>}
            </div>
        );
    }
}
const mapStateToProps = ({ permissions, oidc, userConfig }) => {
    return { permissions, oidc, userConfig: userConfig.userProfileInfo }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPermissions: (permission_key, memId) => {
            if (permission_key) {
                dispatch(getPermissions({ memId, perKey: permission_key }))
            }
        },
        setAction: (actn) => {
            dispatch(setCurrentAction(actn))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionsToolbar);