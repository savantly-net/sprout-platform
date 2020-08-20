import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContentTypesEditorComponent } from './content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types.component';
import { ContentType, ContentTypesService } from './content-types.service';

@Injectable({ providedIn: 'root' })
export class ContentTypeResolve implements Resolve<ContentType> {
    constructor(private service: ContentTypesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContentType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.get(id).pipe(catchError((err, ct) => {
                if(err) {
                    console.warn('didnt find item with id: ', id);
                    return of(new ContentType());
                } else {
                    return ct;
                }
            }));
        }
        return of(null);
    }
}

export const routes = [
    {
        path: 'content-type',
        component: ContentTypesComponent
    },
    {
        path: 'content-type/:id',
        component: ContentTypesEditorComponent,
        resolve: {
            contentType: ContentTypeResolve
        }
    },
    {
        path: 'content-type/:id/edit',
        component: ContentTypesEditorComponent,
        resolve: {
            contentType: ContentTypeResolve
        }
    }
];