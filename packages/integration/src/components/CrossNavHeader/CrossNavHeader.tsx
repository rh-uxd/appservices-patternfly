import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Page/page';
import { css } from '@patternfly/react-styles';
import { BarsIcon } from '@patternfly/react-icons';
import { Button, ButtonVariant, PageHeaderProps, PageContextConsumer, ContextSelector, ContextSelectorItem } from '@patternfly/react-core';
import { CrossNavContextSelector } from '../CrossNavContextSelector';

export type CrossNavApp = {
  /** Uniquie identifer for application */
  id: string;
  /** Application name to display to the user */
  name: string;
  /** URL to navigate too when the application is selected from context selector */
  url: string;
}

export type CrossNavAppState = {
  /** The current URL (including any parameters) that user navigated too. */
  currentURL: string; 
  /** An object that contains any state data that is need to restore the current application state.  */
  stateData: any;
}

export interface CrossNavHeaderProps extends PageHeaderProps {
  apps: CrossNavApp[];
  onAppNavigate?: (currentApp: CrossNavApp
    ) => void;
}

interface CrossNavHeaderState {
  readonly isOpen: boolean;
  readonly currentApp: CrossNavApp;
}

export class CrossNavHeader extends React.Component<CrossNavHeaderProps, CrossNavHeaderState> {
  
  constructor(props: CrossNavHeaderProps) {
    super(props);
    this.state = {
      currentApp: this.props.apps[0],
      isOpen: false
    }
  }
  /** 
   * Writes last known URL and state data for a user of a specific app to local storage.
   * 
   * @param appId - Uniquie identifer for application
   * @param userId - Uniquie identifer for the user.  Defaults to no user.
   * @param appState - Object containing the current state of the application.
   */
  static setLastKnownApp(appId: string, userId: string = '', appState: CrossNavAppState) {
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
   static getLastKnownApp(appId: string, userId: string = ''): CrossNavAppState {
     const storage = window.localStorage;
     return JSON.parse(storage.getItem(`${appId}${userId}`));
  }

  private onToggle = (event: any, isOpen: boolean) => {
    this.setState({
      isOpen
    });
  };

  private onSelect = (event: any, value: any) => {

  }

  render() {

    const { apps = null as CrossNavApp[],
      className = '',
      logo = null as React.ReactNode,
      logoProps = null as object,
      logoComponent = 'a',
      toolbar = null as React.ReactNode,
      avatar = null as React.ReactNode,
      topNav = null as React.ReactNode,
      isNavOpen = true,
      showNavToggle = false,
      onNavToggle = () => undefined as any,
      'aria-label': ariaLabel = 'Global navigation',
      ...props } = this.props;

    const LogoComponent = logoComponent as any;

    const {
      currentApp,
      isOpen
    } = this.state;

    return (
      <PageContextConsumer>
        {({ isManagedSidebar, onNavToggle: managedOnNavToggle, isNavOpen: managedIsNavOpen }: PageHeaderProps) => {
          const navToggle = isManagedSidebar ? managedOnNavToggle : onNavToggle;
          const navOpen = isManagedSidebar ? managedIsNavOpen : isNavOpen;

          return (
            <header role="banner" className={css(styles.pageHeader, className)} {...props}>
              {(showNavToggle || logo) && (
                <div className={css(styles.pageHeaderBrand)}>
                  {showNavToggle && (
                    <div className={css(styles.pageHeaderBrandToggle)}>
                      <Button
                        id="nav-toggle"
                        onClick={navToggle}
                        aria-label={ariaLabel}
                        aria-controls="page-sidebar"
                        aria-expanded={navOpen ? 'true' : 'false'}
                        variant={ButtonVariant.plain}
                      >
                        <BarsIcon />
                      </Button>
                    </div>
                  )}
                  {logo && (
                    <LogoComponent className={css(styles.pageHeaderBrandLink)} {...logoProps}>
                      {logo}
                    </LogoComponent>
                  )}
                </div>
              )}
              {/* Hide for now until we have the context selector component */}
              {<CrossNavContextSelector 
                  toggleText = {currentApp.name} 
                  onToggle={this.onToggle}
                  onSelect={this.onSelect}
                  isOpen={isOpen}
                  >
                    {
                      apps.map((app: CrossNavApp) => (<ContextSelectorItem key={app.id}>{app.name}</ContextSelectorItem>))
                    }
                </CrossNavContextSelector>}
              {topNav && <div className={css(styles.pageHeaderNav)}>{topNav}</div>}
              {(toolbar || avatar) && (
                <div className={css(styles.pageHeaderTools)}>
                  {toolbar}
                  {avatar}
                </div>
              )}
            </header>
          );
        }}
      </PageContextConsumer>
    );
  }
};