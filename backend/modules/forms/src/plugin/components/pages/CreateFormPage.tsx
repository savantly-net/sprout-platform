import { IFormModuleRootState, IFormModuleState } from 'plugin/state/FormStateModule';
import React, { FC } from 'react';
import { FormBuilder } from 'react-formio';
import { connect } from "react-redux";
import { useInRouterContext } from 'react-router-dom';


const CreateFormPage: FC<any> = ({
    activeForm
}: IFormModuleState) => {

    const inRouterContext = useInRouterContext();
    console.log(`CreateForm in router context: ${inRouterContext}`);

    return (
        <div>
            <FormBuilder
                form={{ display: 'form' }}
                onChange={(schema: any) => console.log(schema)}
            />
        </div>
    )
}

const mapStateToProps = (state: IFormModuleRootState) => {
    console.log(state);
    return {
        activeForm: state.formModuleState.activeForm
    };
};

export default connect(mapStateToProps)(CreateFormPage);
