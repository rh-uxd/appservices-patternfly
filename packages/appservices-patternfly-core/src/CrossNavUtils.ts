import axios, {AxiosRequestConfig} from 'axios';
import {ServicesInfo} from './common/ServicesInfo';

// The minimum number of apps needed to display the cross console nav
const MINMUM_NUMBER_OF_APPS = 2;

export enum CrossNavAppKeys {
  AMQ_ONLINE = 'amqonline',
  APICURITO = 'apicurito',
  FUSE_MANAGED = 'fuse-managed',
  SOLUTION_EXPLORER = 'solution-explorer',
  THREE_SCALE = '3scale'
}

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

export const getSolutionExplorerServer = () => {
  const currentURL: string = window.location.href;
  const serverSubdomain: string = 'https://solution-explorer';
  const regEx =  /^(https?:\/\/)([^\/]*)/;
  const url = currentURL.match(regEx);

  if (url != null) {
  let urlArray = url[0].split('.').splice(0);
    urlArray[0] = serverSubdomain;
    let serverURL = urlArray.join('.')
    return serverURL;
  } else {
      return null;
  }
}

/**
 * Retrieves the list of integration apps available for cross navigation from solution explorer.
 * 
 * @param url - The URL to the soulution explorer server.
 * @param localize - Optional function used to return a localized string for an application. Keys for the applications are (solution-explorer, amqonline, apicurito, fuse-managed, 3scale)
 * @param excludedApps - Optional list of applictation keys to exclude an app from the list.
 * @param solutionExplorerClientUrl - Optional url to access solution explorer client in enviornments where it's not the same as the server.
 * @param isHttp - Indicates if http should be used when connecting to apps instead of https.
 * @param config - Optional Additional axios config needed for solution explorer server request.
 * @returns Returns the list of cross nav apps, if no apps are available null is returned.
 */
export const getAvailableApps = (url: string,  
  localize: (appId: string)=>string = null,
  solutionExplorerClientUrl: string = null,
  excludedApps: string[] = null,
  isHttp: boolean = false,
  config: AxiosRequestConfig = {}): Promise<CrossNavApp[]> => {
   
  return new Promise<CrossNavApp[]>((resolve) => {
    const options: AxiosRequestConfig = {headers: { "Accept": "application/json" }};
    const requestConfig: AxiosRequestConfig = {...{
      method: 'get',
      url: `${url}/services`
    }, ...options, ...config}
    axios.request(requestConfig).then(resp => {
      console.log('Retrieved available apps from server.')
      let appEntries: CrossNavApp[] = []
        appEntries.push({ id: 'solution-explorer',
            name: localize ? localize('solution-explorer') : 'Solution Explorer',
            rootUrl: solutionExplorerClientUrl ? solutionExplorerClientUrl : url,
            isHttp: isHttp
          }
        );
      Object.entries(resp.data).forEach((app: [string, any]) => {
        switch (app[0]) {
          case '3scale':
            appEntries.push({ id: app[0], 
              name: localize ? localize(app[0]) : ServicesInfo['3scale'].prettyName, 
              rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, ''),
              isHttp: isHttp });
            break;
          case 'amqonline':
            appEntries.push({ id: app[0],
              name: localize ? localize(app[0]) : ServicesInfo.amqonline.prettyName,
              rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, ''),
              isHttp: isHttp  });
            break;
          case 'apicurito':
            appEntries.push({ id: app[0],
              name: localize ? localize(app[0]) : ServicesInfo.apicurito.prettyName,
              rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, ''),
              isHttp: isHttp  });
            break;
          case 'fuse-managed':
            appEntries.push({ id: app[0],
              name: localize ? localize(app[0]) : ServicesInfo['fuse-managed'].prettyName,
              rootUrl: app[1].Host.replace(/(^\w+:|^)\/\//, ''),
              isHttp: isHttp  });
            break;
          default:
            break;
        }
      });
       // Return the list of apps sorted alphabetically with exclusions removed, 
       // as long as we have the minmum number of apps including solution explorer (3)
      appEntries = excludedApps != null ? appEntries.filter((app: CrossNavApp) => !(excludedApps).includes(app.id)) : appEntries;
      resolve(appEntries.length > MINMUM_NUMBER_OF_APPS ? appEntries.sort((app1, app2) => {
        if(app1.name < app2.name) { return -1; }
        if(app1.name > app2.name) { return 1; }
        return 0;
    }) : []);
    }).catch(() => {
      console.log('Unable to retrieve list of available apps.')
      resolve([]);
    });
  });
}