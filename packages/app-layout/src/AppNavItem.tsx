import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { NavItem, NavItemSeparator } from '@patternfly/react-core';

export interface IAppNavItemProps<S = {}> extends Partial<Pick<NavLinkProps<S>, "to">> {
  title?: string;
  exact?: boolean;
}

export function AppNavItem<S>({ title, to, exact }: IAppNavItemProps<S>) {
  if (!title || !to) {
    return <NavItemSeparator data-testid={'navitem-separator'} />;
  }
  return (
    <NavItem>
      <NavLink to={to} exact={exact} activeClassName="pf-m-current">
        {title}
      </NavLink>
    </NavItem>
  );
}
