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
