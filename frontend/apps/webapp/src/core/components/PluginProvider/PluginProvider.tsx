import React, { createRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loadPlugins } from '../../../features/plugins/state/actions';

const ref = React.createRef();

export const PluginProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(loadPlugins());
  }, [ref]);

  return <React.Fragment>{children}</React.Fragment>;
};
