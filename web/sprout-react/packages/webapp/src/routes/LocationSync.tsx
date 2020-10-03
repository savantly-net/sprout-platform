import { push, replace } from 'connected-react-router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { store } from '../store/store';
import { LocationState, StoreState } from '../types';

type ConnectedProps = {
    locationState: LocationState;
}
type DispatchProps = {
    pushHistory: typeof push,
    replaceHistory: typeof replace
}
type AllProps = ConnectedProps & DispatchProps;

const mapStateToProps = (state: StoreState): ConnectedProps => ({
  locationState: state.location
})

const mapDispatchToProps = {
    pushHistory: push,
    replaceHistory: replace
}

const LocationSync = (props: AllProps) => {
    const [prevUrl, setPrevUrl] = useState(props.locationState.url);

    if (prevUrl !== props.locationState.url) {
        setPrevUrl(props.locationState.url);
        if(props.locationState.replace) {
            props.replaceHistory(props.locationState.url);
        } else {
            props.pushHistory(props.locationState.url);
        }
    }
    return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSync);