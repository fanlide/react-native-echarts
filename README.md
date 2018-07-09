# react-native-echarts

百度ECharts的react-native实现

echarts版本4.1.0
由于，加载的是[bootcdn](http://www.bootcdn.cn/)中的在线文件，所以需在线使用

## 安装

- npm
```
npm i -S react-native-wk-echarts
```

- yarn
```
yarn add react-native-wk-echarts
```

## 使用
```javascript
...
import Echarts from 'react-native-echarts';
import dark from 'react-native-echarts/theme/dark.json';
...
<Echarts option={{
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  }} theme={dark} />
...
```
自带一个深色、一个浅色主题，可从ECharts官网自定义主题
