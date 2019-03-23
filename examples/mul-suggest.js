/* eslint no-console: 0 */

import React from 'react';
import Select, { Option } from '../src';
import '../assets/index.less';

import { fetch } from './common/tbFetchSuggest';

class Test extends React.Component {
  state = {
    data: [],
    value: [],
    notFoundContent: '',
    isLoading: false,
  };

  onChange = value => {
    console.log('onChange ', value);
    this.setState({
      value,
    });
  };

  onFocus = () => {
    this.fetchData('11');
  };

  fetchData = value => {
    console.log('search value: ', value);
    this.setState({
      notFoundContent: '',
      isLoading: true,
    });
    fetch(value, data => {
      console.log('data: ', data);
      this.setState({
        isLoading: false,
        data,
        notFoundContent: data.length > 0 ? '' : '没有搜索到相关选项',
      });
    });
  };

  render() {
    const { data, value, notFoundContent, isLoading } = this.state;
    const options = data.map(d => {
      return (
        <Option key={d.value}>
          <i>{d.text}</i>
        </Option>
      );
    });
    return (
      <div>
        <h2>multiple suggest</h2>

        <div>
          <Select
            value={value}
            labelInValue
            style={{ width: 500 }}
            animation="slide-up"
            placeholder="搜索下"
            optionLabelProp="children"
            notFoundContent={ notFoundContent }
            multiple
            onSearch={this.fetchData}
            onChange={this.onChange}
            onFocus={this.onFocus}
            filterOption={false}
            isLoading = {isLoading}
          >
            {options}
          </Select>
        </div>
      </div>
    );
  }
}

export default Test;
