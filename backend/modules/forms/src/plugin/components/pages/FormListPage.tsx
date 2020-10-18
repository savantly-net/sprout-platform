import { IFormModuleRootState } from 'plugin/state/FormStateModule';
import React, { createRef, Dispatch, useMemo } from 'react';
import { Errors, FormGrid, indexForms, selectError, selectRoot } from 'react-formio';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface OwnProps {
    forms: any;
    onAction: (form: any, action: string) => void;
    getForms: (page: number, query: string) => void;
    errors: any;
}

const FormListPage = ({ forms, onAction, getForms, errors }: OwnProps) => {
    const ref = createRef();
    useMemo(() => {
        getForms(1, '');
    }, [ref]);

    if (forms.isActive) {
        return (
            <h1>Loading...</h1>
        );
    } else {
        return (
            <div>
                <h1>Forms</h1>
                <Errors errors={errors} />
                <FormGrid
                    forms={forms}
                    onAction={onAction}
                    getForms={getForms}
                />
                <Link className="btn btn-primary" to="/form/create"><i className="fa fa-plus"></i> Create Form</Link>
            </div>
        )
    }

}

const mapStateToProps = (state: IFormModuleRootState) => {
    return {
        forms: selectRoot('forms', state.formModuleState),
        errors: selectError('forms', state.formModuleState),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    const navigate = useNavigate();
    return {
        getForms: (page: number, query: string) => {
            dispatch(indexForms('forms', page, query))
        },
        onAction: (form: any, action: string) => {
            switch (action) {
                case 'view':
                    dispatch(navigate(`/form/${form._id}`));
                    break;
                case 'submission':
                    dispatch(navigate(`/form/${form._id}/submission`));
                    break;
                case 'edit':
                    dispatch(navigate(`/form/${form._id}/edit`));
                    break;
                case 'delete':
                    dispatch(navigate(`/form/${form._id}/delete`));
                    break;
                default:
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormListPage);