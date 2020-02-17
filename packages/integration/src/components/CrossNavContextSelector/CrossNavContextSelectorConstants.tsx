import * as React from 'react';

export type CrossNavApp = {
  /** Uniquie identifer for application */
  id: string;
  /** Application name to display to the user */
  name: string;
  /** URL to navigate too when the application is selected from context selector */
  url: string;
}
 
export const ContextSelectorContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect: (event: any, value: CrossNavApp): any => undefined
});
