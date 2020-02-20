# CSS, HTML and TS/JS UXD Integration Component Library #

[![rh-uxd](https://circleci.com/gh/rh-uxd/integration.svg?style=shield)](https://app.circleci.com/github/rh-uxd/integration/pipelines)

This package provides framework independent CSS, HTML, and JS files for Redhat integration shared component library.


## Installation

`npm install @rh-uxd/integration-core --save`

or 

`yarn add @rh-uxd/integration-core`


## Using the library

Once install developers should add the CSS to their index file JS or HTML.
The following is an example on how to import the HTML using webpack.

```TS
import '@rh-uxd/integration-core/dist/styles/core.css';
...

```

JavaScript utilites can be imported and used as needed.  For example if you would 
like to use the Cross console navigation js functions you can do the following

```TS
import '@rh-uxd/integration-core/dist/styles/core.css';
import { CrossNavApp, getAppNavState, setAppNavState, navigateToApp } from '@rh-uxd/integration-core';

...
const apps: CrossNavApp[] = [
        {id: 'first-demo-app', name: 'First Demo App', rootUrl:'localhost:3000', isHttp: true},
        {id: 'second-demo-app', name: 'Second Demo App', rootUrl:'localhost:3001', isHttp: true}];   

...

setAppNavState(CrossNavApp[0].id, 'userA', {currentURL: 'first-demo-app/dashboard', stateData: {id: 'id100', percentComplete: .5, lastUpdated: new Date()}});

...

const appState = getAppNavState(CrossNavApp[0].id, 'userA');

...

navigateToApp(CrossNavApp[0].id, CrossNavApp[1].id)

...

```

