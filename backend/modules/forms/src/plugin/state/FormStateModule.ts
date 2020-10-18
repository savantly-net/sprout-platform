import { IModule } from "redux-dynamic-modules";
import { formModuleStateReducer } from './reducers';
import { IFormModuleRootState } from './types';


export const FormStateModule: IModule<IFormModuleRootState> = {
    id: "form-module",
    reducerMap: {
        formModuleState: formModuleStateReducer
    },
};

export const getFormStateModule = () => FormStateModule;