import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractNgModelComponent } from '../../standard';
import { ContentField } from '../content-field.service';

@Component({ template: '' })
export class AbstractContentFieldEditorComponent extends AbstractNgModelComponent<ContentField> {
    @Input() fieldTypes: Array<any>;
    @Output() onDelete = new EventEmitter<any>();
}