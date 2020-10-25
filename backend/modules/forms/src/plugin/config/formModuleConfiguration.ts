import Formio from 'formiojs/Formio';
export const API_URL = `${location.protocol}//${location.host}/api/savantly-forms`;

Formio.setBaseUrl(API_URL);
