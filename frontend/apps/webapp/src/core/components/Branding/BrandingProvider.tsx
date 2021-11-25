// import axios, { AxiosResponse } from 'axios';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StoreState } from '../../../types';
// import { StyleMatchType } from './brandingService';
import { loadBrandingStyleMaps } from './state/reducers';

const addStyle = (stylePath: string) => {
  var head = document.head;
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = stylePath;
  head.appendChild(link);
  return link;
};

const removeStyle = (link: HTMLLinkElement) => {
  var head = document.head;
  head.removeChild(link);
};

export const BrandingProvider: FC = (props) => {
  const brandingState = useSelector((state: StoreState) => state.branding);
  const dispatch = useDispatch();
  const [styleLinks, setStyleLinks] = useState([] as HTMLLinkElement[]);
  const location = useLocation();

  useMemo(() => {
    if (!brandingState.fetched && !brandingState.loading) {
      dispatch(loadBrandingStyleMaps());
    }
  }, [brandingState,dispatch]);

  useMemo(() => {
    if (brandingState && brandingState.fetched && !brandingState.error) {
      const _active: HTMLLinkElement[] = [];
      brandingState.styleMaps.forEach((s) => {
        switch (s.matchType) {
          case 'LOCATION':
            const matches = location.pathname.match(s.matchExpression);
            if (matches && matches.length > 0) {
              _active.push(addStyle(s.value));
            }
        }
      });
      setStyleLinks(_active);
    }
  }, [brandingState, location]);

  useEffect(() => {
    return () => {
      styleLinks.forEach((l) => {
        removeStyle(l);
      });
    };
  }, [styleLinks]);

  return <Fragment>{props.children}</Fragment>;
};
