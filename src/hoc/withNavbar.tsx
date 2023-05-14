import React, { ComponentType } from 'react';
import Heading5 from '../component/common/sematic_tags/Heading5';

interface NavbarProps {}

const withNavbar = <T extends NavbarProps>(WrappedComponent: ComponentType<T>) => (
  class extends React.Component<T> {
    render() {
      return (
        <div>
          <nav className="bg-black text-white">
            <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                </div>
                <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0">
                    <Heading5 className='text-lg font-semibold'>MIS Report</Heading5>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  }
);

export default withNavbar;
