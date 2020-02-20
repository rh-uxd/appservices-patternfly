# React UXD Integration Component Library #

[![rh-uxd](https://circleci.com/gh/rh-uxd/integration.svg?style=shield)](https://app.circleci.com/github/rh-uxd/integration/pipelines)

This package provides react componets for use with Redhat integration products.  This library contains a set of common components that are used across the integration product line.  The library is built on top of react implementation of Patternfly.


## Installation

`npm install @rh-uxd/integration --save`

or 

`yarn add @rh-uxd/integration`


## Building the library

Once install developers can use the components that are available by importing them into their projects.  For example

```ts
import React from 'react'
import {CrossNavHeader, CrossNavApp} from '@rh-uxd/integration';
...

const apps: CrossNavApp[] = [
    {id: 'first-demo-app', name: 'First Demo App', url:'localhost:3000', isHttp: true},
    {id: 'second-demo-app', name: 'Second Demo App', url:'localhost:3001', isHttp: true}];        
const Header = (
    <CrossNavHeader
        apps={apps}
        currentApp = {{id: 'first-demo-app', name: 'First Demo App', url:'localhost:3000', isHttp: true}}
        logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
        toolbar={PageToolbar}
        avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
        showNavToggle
    />
...

```

