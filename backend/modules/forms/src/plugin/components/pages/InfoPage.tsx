import { IFormModuleRootState, IFormModuleState } from 'plugin/state/FormStateModule';
import React, { FC } from 'react';
import { connect } from "react-redux";
import { useInRouterContext } from 'react-router-dom';


const CreateFormPage: FC<any> = ({}: IFormModuleState) => {

    const inRouterContext = useInRouterContext();
    console.log(`CreateForm in router context: ${inRouterContext}`);

    return (
        <div>
            <h3>Form Management</h3>
            <p>Sprout plugin by Savantly.net</p>
        </div>
    )
}

const mapStateToProps = (state: IFormModuleRootState) => {
    return {};
};

export default connect(mapStateToProps)(CreateFormPage);
