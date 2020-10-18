import { IFormModuleRootState } from '../../state/types';
import React, { Dispatch, useMemo } from 'react';
import { Errors, FormGrid, selectError, selectRoot } from 'react-formio';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { indexForms } from '../forms/actions';

interface OwnProps {
    forms: any;
    errors: any;
}

const onAction = (navigate: Function, dispatch: Dispatch<any>) => {
    return (form: any, action: string) => {
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

const FormListPage = ({ forms, errors }: OwnProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = 1;

    const getForms = (page: number, query?: string) => {
        dispatch(indexForms('forms', page))
    }

    useMemo(() => {
        getForms(1);
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
                    onAction={onAction(navigate, dispatch)}
                    getForms={getForms}
                />
                <Link className="btn btn-primary" to="../create"><i className="fa fa-plus"></i> Create Form</Link>
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormListPage);