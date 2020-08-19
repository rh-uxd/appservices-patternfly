import React from 'react';
import { Bullseye, Spinner, Flex, FlexItem , Title } from '@patternfly/react-core';

export interface LoadingPageProps {
  /** App name passed to Loading component */
  appName?: string;
}

export const LoadingPage: React.FunctionComponent<LoadingPageProps> = (props) => {
    return (
        <div className="app__loading-container">
            <Bullseye>
                <Flex direction={{"default":"column"}} >
                    <FlexItem spacer={{"default":"spacerXl"}} alignSelf={{"default":"alignSelfCenter"}} >
                        <Spinner/>
                    </FlexItem>
                    <FlexItem>
                        <Title headingLevel="h4" size="xl">
                            Loading {props.appName}
                        </Title>
                    </FlexItem>
                </Flex>
            </Bullseye>
        </div>
    )
}
