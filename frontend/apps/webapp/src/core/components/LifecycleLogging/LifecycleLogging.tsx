// modified version of:
// https://github.com/guyellis/react-log-lifecycle

import React from 'react';

type LogFlagKey = 'props' | 'nextProps' | 'nextState' | 'prevProps' | 'prevState';

// Optional flags:
export interface LogFlags {
    /** 
     * If logType is set to keys then the props of the object being logged
     *  will be written out instead of the whole object. Remove logType or
     * set it to anything except keys to have the full object logged.
     */
    logType: 'keys' | 'object',
    
    /**
     *  A list of the param "types" to be logged.
     * The example below has all the types.
    */
    names: LogFlagKey[];
  };

export default class LifecycleLogging<P = {}, S = {}, SS = any> extends React.Component<P,S,SS> {

    flags: LogFlags;
    props: any;
    cycleNum: number = 0;


  log(obj: any) {
    // obj should have a single property.
    // The name (key) of that property should be switched on in the flags
    // object if it should be logged. You swith it on by adding it to the
    // flags.names array.
    // The value of the single prop in obj is the object that is to be
    // logged. (Or the keys of the object to be logged.)
    const keys = Object.keys(obj) as LogFlagKey[];
    if(keys.length !== 1) {
      return;
    }
    const key = keys[0];

    if(this.flags.names && this.flags.names.indexOf(key) >= 0) {
      // The flags object can override logging the object by changing
      // the logType to 'keys' to just log out the keys of the object.
      const logObj = (this.flags.logType && this.flags.logType === 'keys' && obj[key])
        ? Object.keys(obj[key])
        : obj[key];

      console.log(key + ':', logObj);
    }
  }

  constructor(props: any, flags: LogFlags) {
    super(props);
    this.cycleNum = 1;
    this.flags = flags;
    console.log(`#${this.cycleNum}.1 constructor(props)
  - Start of cycle #${this.cycleNum}
  - replaces getInitialState()
  - assign to this.state to set initial state.
`);

    this.log({props});
  }

  componentWillMount() {
    console.log(`#${this.cycleNum}.2 componentWillMount()
  - Invoked Once (client and server)
  - Can change state here with this.setState()  (will not trigger addition render)
  - Just before render()
`);
  }

  componentDidMount() {
    console.log(`#${this.cycleNum}.3 componentDidMount()
  - Invoked Once (client only)
  - refs to children now available
  - integrate other JS frameworks, timers, ajax etc. here
  - Just after render()
  - End of Cycle #${this.cycleNum}
`);
    this.cycleNum = 2;
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(`#${this.cycleNum}.1 componentWillReceiveProps(nextProps)
  - Start of cycle #${this.cycleNum}
  - invoked when component is receiving new props
  - not called in cycle #1
  - this.props is old props
  - parameter to this function is nextProps
  - can call this.setState() here (will not trigger addition render)
`);
    this.log({nextProps});
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log(`#${this.cycleNum}.2 shouldComponentUpdate(nextProps, nextState)
  - invoked when new props/state being received
  - not called on forceUpdate()
  - returning false from here prevents component update and the next 2 parts of the Lifecycle: componentWillUpdate() componentDidUpdate()
  - returns true by default;
`);
    this.log({nextProps});
    this.log({nextState});
    return true;
  }

  componentWillUpdate(nextProps: any, nextState: any) {
    console.log(`#${this.cycleNum}.3 componentWillUpdate(nextProps, nextState)
  - cannot use this.setState() (do that in componentWillReceiveProps() above)
  - Just before render()
`);
    this.log({nextProps});
    this.log({nextState});
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(`#${this.cycleNum}.4 componentDidUpdate(prevProps, prevState)
  - Just after render()
`);
    this.log({prevProps});
    this.log({prevState});
  }

  componentWillUnmount() {
    this.cycleNum = 3;
    console.log(`#${this.cycleNum}.1 componentWillUnmount()
  - invoked immediately before a component is unmounted from DOM
  - do cleanup here. e.g. kill timers and unlisten to events such as flux store updates
`);
  }

}