import React, { Component } from 'react';
import { WebView, View, ViewProps } from 'react-native';
import renderChart from './renderChart';

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
  <script src="./echarts.min.js"></script>
</head>
<body>
  <div id="main" />
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
  onPress?: Function
};

export default class Index extends Component<props> {
  componentDidUpdate(prevProps) {
    if (prevProps.option !== this.props.option) {
      this.chart.reload();
    }
  }

  render() {
    const { option, theme = require("./theme/vintage.json"),
      height, width, style, backgroundColor = 'transparent' } = this.props;
    return (
      <View style={[{ flex: 1 }, { height: height || 400, width: width || "100%" }, style]}>
        <WebView
          ref={e => this.chart = e}
          scrollEnabled={false}
          injectedJavaScript={renderChart(option, theme)}
          style={{ flex: 1, backgroundColor: backgroundColor }}
          scalesPageToFit={false}
          source={{ html, baseUrl: 'https://cdn.bootcss.com/echarts/4.1.0/' }}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
