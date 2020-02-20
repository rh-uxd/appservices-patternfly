import React from 'react';
import {
  Avatar,
  Brand,
  Button,
  ButtonVariant,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  Gallery,
  GalleryItem,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  SkipToContent,
  TextContent,
  Text,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import {CrossNavHeader, CrossNavApp} from '@rh-uxd/integration-react';
// make sure you've installed @patternfly/patternfly
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import { css } from '@patternfly/react-styles';
import { BellIcon, CogIcon } from '@patternfly/react-icons';
import imgBrand from './logo.svg';
import imgAvatar from './logo.svg';
//import './App.css'

export class App extends React.Component<{}, {
  isDropdownOpen: boolean,
  isKebabDropdownOpen: boolean,
  activeItem: number
}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0,
      
    };
   
  }
  
  onDropdownToggle = (isDropdownOpen: any) => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = (event: any) => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onKebabDropdownToggle = (isKebabDropdownOpen: any) => {
      this.setState({
        isKebabDropdownOpen
      });
    };

   onKebabDropdownSelect = (event: any) => {
      this.setState({
        isKebabDropdownOpen: !this.state.isKebabDropdownOpen
      });
    };

  onNavSelect = (result: { itemId: any; }) => {
      this.setState({
        activeItem: result.itemId
      });
    };
  
  render() {
      const { isDropdownOpen, isKebabDropdownOpen, activeItem } = this.state;
  
      const PageNav = (
        <Nav onSelect={this.onNavSelect} aria-label="Nav" theme="dark">
          <NavList>
            <NavItem itemId={0} isActive={activeItem === 0}>
              System Panel
            </NavItem>
            <NavItem itemId={1} isActive={activeItem === 1}>
              Policy
            </NavItem>
            <NavItem itemId={2} isActive={activeItem === 2}>
              Authentication
            </NavItem>
            <NavItem itemId={3} isActive={activeItem === 3}>
              Network Services
            </NavItem>
            <NavItem itemId={4} isActive={activeItem === 4}>
              Server
            </NavItem>
          </NavList>
        </Nav>
      );
      const kebabDropdownItems = [
        <DropdownItem>
          <BellIcon /> Notifications
        </DropdownItem>,
        <DropdownItem>
          <CogIcon /> Settings
        </DropdownItem>
      ];
      const userDropdownItems = [
        <DropdownItem>Link</DropdownItem>,
        <DropdownItem component="button">Action</DropdownItem>,
        <DropdownItem isDisabled>Disabled link</DropdownItem>,
        <DropdownItem isDisabled component="button">
          Disabled action
        </DropdownItem>,
        <DropdownSeparator />,
        <DropdownItem>Separated link</DropdownItem>,
        <DropdownItem component="button">Separated action</DropdownItem>
      ];
      const PageToolbar = (
        <Toolbar>
          <ToolbarGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
            <ToolbarItem>
              <Button id="default-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
                <BellIcon />
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button id="default-example-uid-02" aria-label="Settings actions" variant={ButtonVariant.plain}>
                <CogIcon />
              </Button>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem className={css(accessibleStyles.hiddenOnLg, spacingStyles.mr_0)}>
              <Dropdown
                isPlain
                position="right"
                onSelect={this.onKebabDropdownSelect}
                toggle={<KebabToggle onToggle={this.onKebabDropdownToggle} />}
                isOpen={isKebabDropdownOpen}
                dropdownItems={kebabDropdownItems}
              />
            </ToolbarItem>
            <ToolbarItem className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnMd)}>
              <Dropdown
                isPlain
                position="right"
                onSelect={this.onDropdownSelect}
                isOpen={isDropdownOpen}
                toggle={<DropdownToggle onToggle={this.onDropdownToggle}>Kyle Baker</DropdownToggle>}
                dropdownItems={userDropdownItems}
              />
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      );
  
      const apps: CrossNavApp[] = [
        {id: 'first-demo-app', name: 'First Demo App', rootUrl:'localhost:3000', isHttp: true},
        {id: 'second-demo-app', name: 'Second Demo App', rootUrl:'localhost:3001', isHttp: true}];        
      const Header = (
        <CrossNavHeader
          apps={apps}
          currentApp={{id: 'second-demo-app', name: 'Second Demo App', rootUrl:'localhost:3001', isHttp: true}}
          logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
          toolbar={PageToolbar}
          avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
          showNavToggle
        />
      );
      const Sidebar = <PageSidebar nav={PageNav} theme="dark" />;
      const pageId = 'main-content-page-layout-default-nav';
      const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>;
  
      const PageBreadcrumb = (
        <Breadcrumb>
          <BreadcrumbItem>Section home</BreadcrumbItem>
          <BreadcrumbItem to="#">Second Demo App</BreadcrumbItem>
          <BreadcrumbItem to="#">Main Section</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            Section landing
          </BreadcrumbItem>
        </Breadcrumb>
      );
  
      return (
        <React.Fragment>
          <Page
            header={Header}
            sidebar={Sidebar}
            isManagedSidebar
            skipToContent={PageSkipToContent}
            breadcrumb={PageBreadcrumb}
            mainContainerId={pageId}
            className = 'app'
          >
            <PageSection variant={PageSectionVariants.light}>
              <TextContent>
                <Text component="h1">Main title</Text>
                <Text component="p">
                  Body text should be Overpass Regular at 16px. It should have leading of 24px because <br />
                  of it’s relative line height of 1.5.
                </Text>
              </TextContent>
            </PageSection>
            <PageSection>
              <Gallery gutter="md">
                {Array.apply(0, Array(10)).map((x, i) => (
                  <GalleryItem key={i}>
                    <Card>
                      <CardBody>This is a card for the second demo app</CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
            </PageSection>
          </Page>
        </React.Fragment>
      );
    }
}

export default App;
