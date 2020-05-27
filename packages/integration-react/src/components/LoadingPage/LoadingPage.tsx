import React from 'react';
import { Bullseye, Spinner, Flex, FlexItem, FlexModifiers, Title } from '@patternfly/react-core';

export interface LoadingPageProps {
  /** App name passed to Loading component */
  appName?: string;
}

export const LoadingPage: React.FunctionComponent<LoadingPageProps> = (props) => {
    return (
        <div className="app__loading-container">
            <Bullseye>
                <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                    <FlexItem breakpointMods={[{modifier: FlexModifiers["spacer-xl"]}, {modifier: FlexModifiers["align-self-center"]}]}>
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
