import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ContentTemplateComponent } from './content-template.component';
import { ContentTemplateEditorComponent } from './content-template-editor/content-template-editor.component';
import { ContentTemplate, ContentTemplateService } from './content-template.service';

@Injectable({ providedIn: 'root' })
export class ContentTemplateResolve implements Resolve<ContentTemplate> {
    constructor(private service: ContentTemplateService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContentTemplate> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.get(id).pipe(catchError((err, item) => {
                if(err) {
                    console.warn('didnt find item with id: ', id);
                    return of(new ContentTemplate());
                } else {
                    return item;
                }
            }));
        }
        return of(null);
    }
}

export const routes = [
    {
        path: 'content-template',
        component: ContentTemplateComponent
    },
    {
        path: 'content-template/:id',
        component: ContentTemplateEditorComponent,
        resolve: {
            contentTemplate: ContentTemplateResolve
        }
    },
    {
        path: 'content-template/:id/edit',
        component: ContentTemplateEditorComponent,
        resolve: {
            contentTemplate: ContentTemplateResolve
        }
    }
];