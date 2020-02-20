import * as React from 'react';

export type CrossNavApp = {
  /** Uniquie identifer for application */
  id: string;
  /** Application name to display to the user */
  name: string;
  /** Root URL for the application*/
  rootUrl: string;
  /** Indicates if the connection is HTTP instead of HTTPS  */
  isHttp?: boolean;
}
 
export const ContextSelectorContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect: (event: any, value: CrossNavApp): any => undefined
});
