/* eslint no-console: 0 */

import React from 'react';
import Select, { Option } from '../src';
import '../assets/index.less';
import positionImg from './images/position.png';

class Test extends React.Component {
  state = {
    destroy: false,
    value: '',
  };

  onChange = (e, opt) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    console.log('onChange', value, opt);
    this.setState({
      value,
    });
  };

  onDestroy = () => {
    this.setState({
      destroy: 1,
    });
  };

  onBlur = v => {
    console.log('onBlur', v);
  };

  onFocus = () => {
    console.log('onFocus');
  };

  render() {
    const { value, destroy } = this.state;
    if (destroy) {
      return null;
    }
    return (
      <div style={{ margin: 20 }}>
        <h2>Single Select</h2>

        <div style={{ width: 300 }}>
          <Select
            id="my-select"
            value={value}
            // open
            placeholder="placeholder"
            dropdownMenuStyle={{ maxHeight: 200 }}
            showSearch={false}
            // combobox
            notFoundContent="没有搜索到相关选项"
            allowClear
            style={{ width: '100%' }}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            optionLabelProp="text"
            optionFilterProp="text"
            dropdownAlign={{ offset: [0, 1] }} // Menu框与select框的距离
            onChange={this.onChange}
          >
            <Option value="01" text="jack1" title="jack2">
              <b
                style={{
                  color: 'red',
                }}
              >
                jack
              </b>
              <label>天津</label>
            </Option>
            <Option value="11" text="lucy">
              <i className="text-icon icon-lpt-clock" style={{ color: '#5897ff' }} />
              lucy
              <label>北京</label>
            </Option>
            <Option value="21" disabled text="disabled">
              disabled
              <label>河北</label>
            </Option>
            <Option value="31" text="yiminghe">
              <i className="text-icon">
                <img src={positionImg} />
              </i>
              yiminghe
              <label>北京</label>
            </Option>
            {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(i => {
              return (
                <Option key={i} value={i} text={String(i)}>
                  {i}-text
                  <label>天津</label>
                </Option>
              );
            })}
          </Select>
        </div>
        <h2>native select</h2>
        <select value={value} style={{ width: 500 }} onChange={this.onChange}>
          <option value="01">jack</option>
          <option value="11">lucy</option>
          <option value="21" disabled>
            disabled
          </option>
          <option value="31">yiminghe</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <option value={i} key={i}>
                {i}
              </option>
            );
          })}
        </select>

        <p>
          <button type="button" onClick={this.onDestroy}>
            destroy
          </button>
        </p>
      </div>
    );
  }
}

export default Test;
