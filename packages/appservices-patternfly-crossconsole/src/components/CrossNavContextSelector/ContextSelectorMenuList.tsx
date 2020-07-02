import * as React from 'react';

export interface ContextSelectorMenuListProps {
  /** Content rendered inside the Context Selector Menu */
  children?: React.ReactNode;
  /** Classess applied to root element of Context Selector menu */
  className?: string;
  /** Flag to indicate if Context Selector menu is opened */
  isOpen?: boolean;
}

export class ContextSelectorMenuList extends React.Component<ContextSelectorMenuListProps> {
  static defaultProps = {
    children: null as React.ReactNode,
    className: '',
    isOpen: true
  };

  refsCollection = [] as any;

  sendRef = (index: number, ref: any) => {
    this.refsCollection[index] = ref;
  };

  extendChildren() {
    return React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child as React.ReactElement<any>, {
        sendRef: this.sendRef,
        index
      })
    );
  }

  render = () => {
    const { className, isOpen, children, ...props } = this.props;
    return (
      <ul hidden={!isOpen} role="menu" {...props}>
        {this.extendChildren()}
      </ul>
    );
  };
}
