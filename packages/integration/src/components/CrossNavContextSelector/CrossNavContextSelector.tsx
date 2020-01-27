import React from 'react';
import { ContextSelector } from '@patternfly/react-core';
import { ContextSelectorToggle } from './ContextSelectorToggle';
import { ContextSelectorMenuList } from './ContextSelectorMenuList';
import styles from '@patternfly/react-styles/css/components/ContextSelector/context-selector';
import { css } from '@patternfly/react-styles';
import FocusTrap from 'focus-trap-react';

const ContextSelectorContext = React.createContext({
    onSelect: (event: any, value: React.ReactNode): any => undefined
  });

class CrossNavContextSelector extends ContextSelector {

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
                  <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                    <ContextSelectorContext.Provider value={{ onSelect }}>
                      <ContextSelectorMenuList isOpen={isOpen}>{children}</ContextSelectorMenuList>
                    </ContextSelectorContext.Provider>
                  </FocusTrap>
                )}
              </div>
            )}
          </div>
        );
      }
}
