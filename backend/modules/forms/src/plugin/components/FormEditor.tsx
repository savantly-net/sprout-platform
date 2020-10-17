import { IFormModuleRootState, IFormModuleState } from 'plugin/state/FormStateModule';
import React, { FC } from 'react';
import { FormBuilder } from 'react-formio';
import { connect } from "react-redux";

const FormEditor: FC<any> = ({
    activeForm
}: IFormModuleState) => {

    const showActiveFormOrNot = () => {
        if (activeForm) {
            return (
                <FormBuilder
                    form={{ display: 'form' }}
                    onChange={(schema: any) => console.log(schema)}
                />
            )
        } else {
            return (<h1>There is no active form</h1>)
        }
    }
    return (
        <div>
            {showActiveFormOrNot()}
        </div>
    )
}

const mapStateToProps = (state: IFormModuleRootState) => {
    console.log(state);
    return {
        activeForm: state.formModuleState.activeForm
    };
};

export default connect(mapStateToProps)(FormEditor);
