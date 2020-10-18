import { getBackendSrv } from '@savantly/sprout-runtime';

class FormService {
    constructor(private apiUrl: string){}
    getForms = () => {
        return getBackendSrv().get(`${this.apiUrl}/form`);
    }
}

let instance: FormService;

export const initFormService = (apiUrl: string) => {
    if(instance){
        throw new Error('the FormService is already initialized');
    } else {
        instance = new FormService(apiUrl);
    }
}

export const getFormService = () => {
    if(instance){
        return instance;
    } else {
        throw new Error('the FormService hasn\'t been initialized');
    }
}