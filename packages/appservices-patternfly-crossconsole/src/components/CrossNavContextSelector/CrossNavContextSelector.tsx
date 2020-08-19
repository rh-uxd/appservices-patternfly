import React from 'react';
import { ContextSelectorProps} from '@patternfly/react-core';
import { CrossNavApp } from '@rh-uxd/appservices-patternfly-core';
import { ContextSelectorToggle } from './ContextSelectorToggle';
import { ContextSelectorMenuList } from './ContextSelectorMenuList';
import { ContextSelectorContext } from './CrossNavContextSelectorConstants';
import styles from '@patternfly/react-styles/css/components/ContextSelector/context-selector';
import { css } from '@patternfly/react-styles';

export interface CrossNavContextSelectorProps extends Omit<ContextSelectorProps, 'onSearchButtonClick' |
  'onSearchInputChange' |
  'searchInputPlaceholder' |
  'searchButtonAriaLabel' |
  'searchInputValue' |
  'onToggle'> {
  /** Callback called when toggle is clicked */
  onToggle?: (event: any, value: boolean) => void;
}

export class CrossNavContextSelector extends React.Component<CrossNavContextSelectorProps> {

  parentRef: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    const toggleId = 'rhuxd-crossnav-context-selector-toggle';
    const screenReaderLabelId = 'rhuxd-crossnav-context-selector-label';
    const {
      children,
      className,
      isOpen,
      onToggle,
      onSelect,
      screenReaderLabel,
      toggleText,
      ...props
    } = this.props;
    return (
      <div 
        className="app-context-selector-wrapper"
      >
      <div
        className={css(styles.contextSelector, isOpen && styles.modifiers.expanded, className)}
        ref={this.parentRef}
        {...props}
      >
        {screenReaderLabel && (
          <span id={screenReaderLabelId} hidden>
            {screenReaderLabel}
          </span>
        )}
        <ContextSelectorToggle
          onToggle={onToggle}
          isOpen={isOpen}
          toggleText={toggleText}
          id={toggleId}
          parentRef={this.parentRef.current}
          aria-labelledby={`${screenReaderLabelId} ${toggleId}`}
        />
        {isOpen && (
          <div className={css(styles.contextSelectorMenu)}>
            {isOpen && (
                <ContextSelectorContext.Provider value={{ onSelect }}>
                  <ContextSelectorMenuList isOpen={isOpen}>{children}</ContextSelectorMenuList>
                </ContextSelectorContext.Provider>
            )}
          </div>
        )}
      </div>
      </div>
    );
  }
}
