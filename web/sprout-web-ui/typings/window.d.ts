import { SproutApi } from '../src/app/client-api/client-api.service';

declare global {
    interface Window {
        sprout: SproutApi
    }
}