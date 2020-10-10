/**
 * Appends REQUEST async action type
 */

export const REQUEST = (actionType: string) => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = (actionType: string) => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = (actionType: string) => `${actionType}_REJECTED`;
