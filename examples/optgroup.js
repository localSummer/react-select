/* eslint no-console: 0 */

import React from 'react';
import Select, { Option, OptGroup } from '../src';
import '../assets/index.less';
import positionImg from './images/position.png';

class Test extends React.Component {
  state = {
    value: '',
  };

  onChange = (value, option) => {
    console.log(`selected ${value}`, option);
    this.setState({
      value,
    });
  };

  clearHistory = () => {
    console.log('清空历史记录');
  };

  render() {
    return (
      <div>
        <h2>Select OptGroup</h2>
        <div style={{ width: 300 }}>
          <Select
            placeholder="分组下拉"
            open
            combobox
            value={this.state.value}
            style={{ width: '100%' }}
            showSearch
            allowClear
            onChange={this.onChange}
            dropdownAlign={{ offset: [0, 1] }} // Menu框与select框的距离
          >
            <OptGroup
              label={
                <label>
                  历史记录<span onClick={this.clearHistory}>清除记录</span>
                </label>
              }
            >
              <Option value="jack" test-prop="jack-prop">
                <i className="text-icon icon-lpt-clock" style={{ color: '#5897ff' }} />
                <b
                  style={{
                    color: 'red',
                  }}
                >
                  jack
                </b>
              </Option>
              <Option value="lucy" test-prop="lucy-prop">
                <i className="text-icon icon-lpt-clock" style={{ color: '#5897ff' }} />
                lucy
              </Option>
            </OptGroup>
            <OptGroup label="中国城市">
              <Option value="yiminghe" test-prop="yiminghe-prop">
                yiminghe
              </Option>
              <Option value="11" text="lucy">
                <i className="text-icon icon-lpt-clock" style={{ color: '#5897ff' }} />
                lucy2
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
                yiminghe2
                <label>北京</label>
              </Option>
            </OptGroup>
          </Select>
        </div>
      </div>
    );
  }
}

export default Test;
