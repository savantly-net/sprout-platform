import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContentItemComponent } from './content-item.component';
import { Observable, of } from 'rxjs';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { ContentItemService, ContentItem } from './content-item.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContentItemResolve implements Resolve<ContentItem> {
    constructor(private service: ContentItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContentItem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.get(id).pipe(catchError((err, item) => {
                if(err) {
                    console.warn('didnt find item with id: ', id);
                    return of(new ContentItem());
                } else {
                    return item;
                }
            }));
        }
        return of(null);
    }
}

export const contentItemRoutes = [
    {
        path: 'content-item',
        component: ContentItemComponent
    },
    {
        path: 'content-item/:id',
        component: ContentItemEditorComponent,
        resolve: {
            contentItem: ContentItemResolve
        }
    },
    {
        path: 'content-item/:id/edit',
        component: ContentItemEditorComponent,
        resolve: {
            contentItem: ContentItemResolve
        }
    }
];