import axios, {AxiosRequestConfig} from 'axios';
import {IntegrationProductInfo} from './common/IntegrationProductInfo';

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

export type CrossNavAppState = {
    /** The current URL (including any parameters) that user navigated too. */
    currentURL: string;
    /** An object that contains any state data that is need to restore the current application state.  */
    stateData: any;
  }
  
  /** 
   * Writes last known URL and state data for a user of a specific app to local storage.
   * 
   * @param appId - Uniquie identifer for application
   * @param userId - Uniquie identifer for the user.  Defaults to no user.
   * @param appState - Object containing the current state of the application.
   */
export const setAppNavState = (appId: string, userId: string = '', appState: CrossNavAppState) => {
    const storage = window.localStorage;
    storage.setItem(`${appId}${userId}`, JSON.stringify(appState));
  }

  /**
   * Retrieves the last known URL and state date for the user of the specified app.
   * 
   * @param appId - Uniquie identifer for application
   * @param userId - Uniquie identifer for the user.  Defaults to no user.
   * 
   * @returns Saved application state retrieved from local storage.
   */
export const getAppNavState = (appId: string, userId: string = ''): CrossNavAppState => {
     const storage = window.localStorage;
     return JSON.parse(storage.getItem(`${appId}${userId}`));
  }

/**
 * Transitions for the current app to the next app that is passed into the function.
 * 
 * @param currentApp - The current integration app that you are on.
 * @param nextApp - The app to navigate too.
 */
export const navigateToApp = (currentApp: CrossNavApp, nextApp: CrossNavApp) => {
    if (nextApp.rootUrl.indexOf(currentApp.rootUrl)) {
        window.location.href = nextApp.isHttp === true ? `http://${nextApp.rootUrl}`: `https://${nextApp.rootUrl}`;
      }
}

/**
 * Retrieves the list of integration apps available for cross navigation.
 * 
 * @param url - The URL to the server.
 * @returns Returns the list of cross nav apps, if no apps are available null is returned.
 */
export const getAvailableApps = (url: string, config: AxiosRequestConfig = {}): Promise<CrossNavApp[]> => {
  let apps: CrossNavApp = null
   
  return new Promise<CrossNavApp[]>((resolve) => {
    const options: AxiosRequestConfig = {headers: { "Accept": "application/json" }};
    const requestConfig: AxiosRequestConfig = {...{
      method: 'get',
      url: `${url}/services`
    }, ...options, ...config}
    axios.request(requestConfig).then(resp => {
      debugger;
      console.log('Retrieved available apps from server.')
      const appEntries: CrossNavApp[] = [];
      Object.entries(resp.data).forEach((app: [string, any]) => {
        switch (app[0]) {
          case '3scale':
            appEntries.push({ id: app[0], name: IntegrationProductInfo["3scale"].prettyName, rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, '') });
            break;
          case 'amqonline':
            appEntries.push({ id: app[0], name: IntegrationProductInfo.amqonline.prettyName, rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, '') });
            break;
          case 'apicurito':
            appEntries.push({ id: app[0], name: IntegrationProductInfo.apicurito.prettyName, rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, '') });
            break;
          case 'fuse-managed':
            appEntries.push({ id: app[0], name: IntegrationProductInfo["fuse-managed"].prettyName, rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, '') });
            break;
          default:
            break;
        }
      });
      resolve(appEntries);
    }).catch((reason: any) => {
      console.log('Unable to retrieve list of available apps.')
      resolve([]);
    });
  });
}