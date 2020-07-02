import * as React from 'react';
import { CrossNavApp } from '@rh-uxd/appservices-patternfly-core';
 
export const ContextSelectorContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect: (event: any, value: CrossNavApp): any => undefined
});
