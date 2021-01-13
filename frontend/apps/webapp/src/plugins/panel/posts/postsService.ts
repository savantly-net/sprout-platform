import { getApiService } from "@savantly/sprout-runtime"

export interface FeedItem {
    source: string;
    id: string;
    createdDate: string;
    createdBy: string;
    body: string;
    tags: string[];
}

export const getFeedItems = () => {
    return getApiService().get<FeedItem[]>('/api/feed');
}

export const createNewPost = (body: string) => {
    return getApiService().post<FeedItem>('/api/feed/post', {body});
}