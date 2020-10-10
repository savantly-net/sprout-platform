import { UrlQueryValue } from "@savantly/sprout-api"

export type LocationState = {
    url: string,
    path: string,
    query: Record<string, UrlQueryValue>,
    routeParams: Record<string, UrlQueryValue>,
    lastUpdated: 0,
  };