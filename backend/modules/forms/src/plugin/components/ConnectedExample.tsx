import { IFormModuleRootState, IFormModuleState } from 'plugin/state/FormStateModule';
import React, { FC } from "react";
import { connect } from "react-redux";

const Example: FC<any> = ({
    message
}: IFormModuleState) => {
    return (
        <h1>{message}</h1>
    )
}

const mapStateToProps = (state: IFormModuleRootState) => {
    console.log(state);
    return {
        message: state.formModuleState.message
    };
};

export default connect(mapStateToProps)(Example);