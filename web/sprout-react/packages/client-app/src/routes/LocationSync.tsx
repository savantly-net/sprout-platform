import React from 'react';
import { UrlQueryValue } from "@savantly/sprout-api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../store/store";
import { useSelector } from 'react-redux';
import { StoreState } from '../types';


export const LocationSync = () => {

    const history = useHistory();
    const [lastUrl, setLastUrl] = useState("");
    const [lastPath, setLastPath] = useState("");
    const [lastQuery, setLastQuery] = useState<Record<string, UrlQueryValue>>();

    const location = useSelector((state: StoreState) => state.location)

    // No url change ignore redux store change
    if (location.url === lastUrl) {
      return null;
    }
    
    console.log(location);

    setLastPath(location.path);
    setLastQuery(location.query);
    setLastUrl(location.url);
    if (location.replace) {
        window.location.href = location.url;
    } else {
        history.push(location.url);
    }

    return(
        <div className="hidden">Location Sync Activated</div>
    )
}