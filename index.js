import React, { Component } from 'react';
import { WebView, View, ViewProps } from 'react-native';
import { toString } from './common/fun';

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>echarts</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
  <style type="text/css">
    html, body, #main {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
  <script src="./echarts/4.1.0/echarts.min.js"></script>
  <script src="./moment.js/2.22.1/moment.min.js"></script>
</head>
<body>
  <div id="main" />
  <script>
    document.addEventListener('message', function(e) {
      myChart.setOption(e.data);
    });
  </script>
</body>
</html>
`
type props = {
  option: Object,
  theme?: JSON,
  height?: Number,
  width?: Number,
  backgroundColor?: String,
  style?: ViewProps,
  onMessage?: Function
};

export default class Index extends Component<props> {
  constructor(props) {
    super(props);
    let { option, theme = require("./theme/vintage.json") } = props;
    let optionStr = toString(option);
    this.option = `
      echarts.registerTheme('theme', ${JSON.stringify(theme)});
      var myChart = echarts.init(document.getElementById('main'), 'theme');
      myChart.setOption(${optionStr});
    `
  }

  componentDidUpdate(prevProps) {
    if (prevProps.option !== this.props.option) {
      this._chart.postMessage(toString(prevProps.option))
    }
  }

  render() {
    const { height, width, style, backgroundColor = 'transparent' } = this.props;
    return (
      <View style={[{ flex: 1 }, { height: height || 400, width: width || "100%" }, style]}>
        <WebView
          ref={e => this._chart = e}
          bounces={false}
          scrollEnabled={false}
          injectedJavaScript={this.option}
          style={{ flex: 1, backgroundColor: backgroundColor }}
          scalesPageToFit={false}
          source={{ html, baseUrl: 'https://cdn.bootcss.com/' }}
          onMessage={event => this.props.onMessage ? this.props.onMessage(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
