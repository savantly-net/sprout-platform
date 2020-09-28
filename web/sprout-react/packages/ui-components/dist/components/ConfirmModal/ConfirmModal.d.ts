import React, { FC } from 'react';
import { IconName } from '../../types/icon';
export interface Props {
    /** Toggle modal's open/closed state */
    isOpen: boolean;
    /** Title for the modal header */
    title: string;
    /** Modal content */
    body: React.ReactNode;
    /** Text for confirm button */
    confirmText: string;
    /** Text for dismiss button */
    dismissText?: string;
    /** Icon for the modal header */
    icon?: IconName;
    /** Confirm action callback */
    onConfirm(): void;
    /** Dismiss action callback */
    onDismiss(): void;
}
export declare const ConfirmModal: FC<Props>;
