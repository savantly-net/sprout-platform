import { IModule } from "redux-dynamic-modules";

export interface IFormModuleState {
    forms: Array<any>;
    message: string;
    activeForm?: any
}

export interface IFormModuleRootState {
    formModuleState: IFormModuleState;
}

export function formModuleStateReducer(state: IFormModuleState | undefined, action: any): IFormModuleState {
    return {
        message: 'Hello from the state',
        forms: []
    }
}

export const FormStateModule: IModule<IFormModuleRootState> = {
    id: "form-module",
    reducerMap: {
        formModuleState: formModuleStateReducer
    },
};

export const getFormStateModule = () => FormStateModule;