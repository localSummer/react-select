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
    text: '',
    value: '',
  };

  componentDidMount() {
    this.fetchData(() => {
      this.setState({
        value: '2730',
      });
    });
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      const { value } = this.state;
      console.log('onEnter', value);
    }
  };

  onSelect = (value, opt) => {
    console.log('value, opt: ', value, opt);
    this.lastSelected.value = value;
    this.lastSelected.text = opt.props.text;
    this.setState({
      value,
    });
  };

  handleSearch = (value) => {
    console.log('handleSearch value: ', value);
    this.setState({
      value,
    });
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

  fetchData = (callback) => {
    this.setState({
      isLoading: true,
      notFoundContent: '',
    })
    fetch(this.state.value, data => {
      this.setState({
        data: [
          {value: "2730", text: "java毕业生设计"},
          {value: "2731", text: "java毕业生设计"},
          {value: "31325", text: "java编程思想"},
          {value: "1239", text: "java教程自学全套"},
          {value: "55303", text: "java程序设计"},
          {value: "42118", text: "javascript"},
          {value: "29414", text: "java核心技术"},
          {value: "1250", text: "java公路车"},
          {value: "15008", text: "java入门"},
          {value: "11172", text: "javascript高级程序设计"},
          {value: "1368", text: "java自行车"},
        ],
        isLoading: false,
        notFoundContent: data.length > 0 ? '' : '没有搜索到相关选项',
      });
      callback && callback();
    });
  };

  render() {
    const { data, value, isLoading, notFoundContent } = this.state;
    console.log('value: ', value);
    // const options = data.map(d => {
    //   const index = d.text.indexOf(value);
    //   const beforeStr = d.text.substr(0, index);
    //   const afterStr = d.text.substr(index + value.length);
    //   return (
    //     <Option key={d.value} id={d.value} value={d.text}>
    //       <span style={{ fontWeight: 'bold' }}>{beforeStr}</span>
    //       <span>{value}</span>
    //       <span style={{ fontWeight: 'bold' }}>{afterStr}</span>
    //     </Option>
    //   );
    // });
    let selectedArr = [];
    let unSelectedArr = [];
    data.forEach(item => {
      if (item.value === value) {
        selectedArr.push(item);
      } else {
        unSelectedArr.push(item);
      }
    });
    let filterData = [...selectedArr, ...unSelectedArr];
    const options = filterData.map(d => {
      return (
        <Option id={d.value} value={d.value} text={d.text}>
          {d.text}
        </Option>
      );
    });
    const dropdownMenuStyle = {
      maxHeight: 200,
    };
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
            // onChange={this.handleChange}
            onSelect={this.onSelect}
            filterOption={false}
            optionLabelProp="text"
            optionFilterProp="text"
            onFocus={this.fetchData}
            onBlur={this.handleBlur}
            onSearch={this.handleSearch}
            isLoading={isLoading}
            customFilterStyle
            dropdownMenuStyle={dropdownMenuStyle}
          >
            {options}
          </Select>
        </div>
      </div>
    );
  }
}

export default Test;
