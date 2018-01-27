import React from 'react';
import {Motion, spring, TransitionMotion} from '../../node_modules/react-motion/build/react-motion';
import Up from './svgs/up.js'

export default class DropDown extends React.Component {
    willEnter() {

      return {
        transform: 100
      }
    }
    willLeave() {
      return {
        transform: spring(100)
      }
    }
    render() {
      {
    return (
      <TransitionMotion 
        styles={this.props.doUnmount ? [] : [{
          key: 'child',
          data: {},
          style: {transform: spring(0)}
        }]}
        willEnter={this.willEnter}
        willLeave={this.willLeave} >
          {(items) => {
            return (
              <div>
                {items.map(item => {
                  return (
                    <div key={item.key} className="backdrop" style ={{
                    transform: 'translate3d(0, -' + item.style.transform + 'vh, 0)'
                  }}>
                    {this.props.renderContent}
                    <Up style={"up"} toggleDropDown={this.props.toggleDropDown}/>
                    </div>
                  );
                })}
              </div>
            )
          }}
      </TransitionMotion>
    )
  }
}
}
