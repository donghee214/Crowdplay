import React from 'react';
import {Motion, spring, TransitionMotion} from '../../node_modules/react-motion/build/react-motion';
import Up from './svgs/up.js'

export default class DropDown extends React.Component {
    willEnter() {
      return {
        transform: 120
      }
    }
    willLeave() {
      return {
        transform: spring(120)
      }
    }

    shouldComponentUpdate(nextProps){
      return this.props.doUnmount !== nextProps.doUnmount
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
                    <div className="upToggleContainer" onClick={this.props.toggleDropDown} onTouchMove={this.props.toggleDropDown}>
                      <Up style={"up"}/>
                    </div>
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
