import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Page/page';
import { css } from '@patternfly/react-styles';
import { BarsIcon } from '@patternfly/react-icons';
import { Button, ButtonVariant, PageHeaderProps, PageContextConsumer } from '@patternfly/react-core';

export const CrossNavHeader = ({
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
  ...props
}: PageHeaderProps) => {
  const LogoComponent = logoComponent as any;
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
            {/* <div className={css(styles.pageHeaderSelector)}>
            pf-c-context-selector
          </div> */}
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
};