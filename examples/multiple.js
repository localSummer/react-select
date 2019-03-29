/* eslint no-console: 0 */

import React from 'react';
import Select, { Option } from '../src';
import classnames from 'classnames';
import '../assets/index.less';

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option
      key={i.toString(36) + i}
      disabled={i === 10 || i === 11}
      isDispatch={i === 10}
      title={`中文${i}`}
    >
      中文{i}
    </Option>,
  );
}

const menuItemSelectedIcon = props => {
  const { ...p } = props;
  const menuStyle = classnames({
    checkboxui: true,
    'checkboxui-checked': p.isSelected,
    'checkboxui-disabled': p.disabled,
  });
  return (
    <label>
      {p.isDispatch && p.disabled ? '已转发' : <i className={menuStyle} />}
    </label>
  );
};

class Test extends React.Component {
  state = {
    useAnim: 0,
    showArrow: 0,
    loading: 0,
    value: ['c12'],
  };

  onChange = (value, options) => {
    console.log('onChange', value, options);
    this.setState({
      value,
    });
  };

  onSelect = (...args) => {
    console.log(args);
  };

  onDeselect = (...args) => {
    console.log(args);
  };

  useAnim = e => {
    this.setState({
      useAnim: e.target.checked,
    });
  };

  showArrow = e => {
    this.setState({
      showArrow: e.target.checked,
    });
  };

  loading = e => {
    this.setState({
      loading: e.target.checked,
    });
  };

  onClearAll = () => {
    console.log('onClearAll', this.state.value);
  };

  render() {
    const { useAnim, showArrow, loading, value } = this.state;
    const dropdownMenuStyle = {
      maxHeight: 200,
    };
    return (
      <div>
        <h2>multiple select（scroll the menu）</h2>

        <p>
          <label htmlFor="useAnim">
            anim
            <input id="useAnim" checked={useAnim} type="checkbox" onChange={this.useAnim} />
          </label>
          <p />
          <label htmlFor="showArrow">
            showArrow
            <input id="showArrow" checked={showArrow} type="checkbox" onChange={this.showArrow} />
          </label>
        </p>
        <p>
          <label htmlFor="loading">
            loading
            <input id="loading" checked={loading} type="checkbox" onChange={this.loading} />
          </label>
        </p>

        <div style={{ width: 300 }}>
          <Select
            value={value}
            animation={useAnim ? 'slide-up' : null}
            choiceTransitionName="rc-select-selection__choice-zoom"
            dropdownMenuStyle={dropdownMenuStyle}
            style={{ width: 300 }}
            multiple
            // open
            dropdownAlign={{ offset: [0, 1] }} // Menu框与select框的距离
            loading={loading}
            showArrow={showArrow}
            allowClear
            // clearIcon={<i className="text-icon icon-prompt-failure"></i>}
            // showArrow
            // showSearch
            optionFilterProp="children"
            optionLabelProp="children"
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
            placeholder="please select"
            onChange={this.onChange}
            onFocus={() => console.log('focus')}
            onBlur={v => console.log('blur', v)}
            onClearAll={this.onClearAll}
            tokenSeparators={[' ', ',']}
            menuItemSelectedIcon={menuItemSelectedIcon}
            isMulDeleteFocusItem
          >
            {children}
          </Select>
        </div>
      </div>
    );
  }
}

export default Test;
