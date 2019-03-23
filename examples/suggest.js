/* eslint no-console: 0 */

import React from 'react';
import Select, { Option } from '../src';
import '../assets/index.less';

import { fetch } from './common/tbFetchSuggest';

const Input = props => <input {...props} />;

class Test extends React.Component {
  state = {
    data: [],
    value: '',
    isLoading: true,
    notFoundContent: '',
  };

  lastSelected = {
    id: '',
    value: '',
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      const { value } = this.state;
      console.log('onEnter', value);
      this.jump(value);
    }
  };

  onSelect = (value, opt) => {
    console.log('value, opt: ', value, opt);
    this.lastSelected.value = value;
    this.lastSelected.id = opt.props.id;
    this.setState({
      value,
    });
    this.jump(value);
  };

  jump = v => {
    console.log('jump ', v);
    // location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
  };

  handleChange = value => {
    this.setState({
      value: value || '',
    });
    this.fetchData(value);
  };

  handleBlur = () => {
    let { value } = this.state;
    if (!value) {
      this.lastSelected.id = '';
      this.lastSelected.value = '';
      return;
    }
    if (value !== this.lastSelected.value) {
      this.setState({
        value: this.lastSelected.value,
      });
    }
  };

  fetchData = value => {
    const content = value || this.state.value;
    this.setState({
      isLoading: true,
      notFoundContent: '',
    })
    fetch(content, data => {
      this.setState({
        data,
        isLoading: false,
        notFoundContent: data.length > 0 ? '' : '没有搜索到相关选项',
      });
    });
  };

  render() {
    const { data, value, isLoading, notFoundContent } = this.state;
    console.log('value: ', value);
    const options = data.map(d => {
      const index = d.text.indexOf(value);
      const beforeStr = d.text.substr(0, index);
      const afterStr = d.text.substr(index + value.length);
      return (
        <Option key={d.value} id={d.value} value={d.text}>
          <span style={{ fontWeight: 'bold' }}>{beforeStr}</span>
          <span>{value}</span>
          <span style={{ fontWeight: 'bold' }}>{afterStr}</span>
        </Option>
      );
    });
    return (
      <div>
        <h2>suggest</h2>

        <div onKeyDown={this.onKeyDown}>
          <Select
            style={{ width: 500 }}
            combobox
            // open
            dropdownAlign={{ offset: [0, 1] }} // Menu框与select框的距离
            value={value}
            allowClear
            placeholder="请输入搜索项"
            defaultActiveFirstOption={false}
            getInputElement={() => <Input />}
            showArrow
            notFoundContent={notFoundContent}
            onChange={this.handleChange}
            onSelect={this.onSelect}
            filterOption={false}
            optionLabelProp="value"
            onFocus={this.fetchData}
            onBlur={this.handleBlur}
            isLoading={isLoading}
          >
            {options}
          </Select>
        </div>
      </div>
    );
  }
}

export default Test;
