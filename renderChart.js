export default function renderChart(option, theme) {
  const toString = obj => {
    let result = JSON.stringify(obj, function (key, val) {
      if (typeof val === 'function') {
        return `♠♥♦♣${val}♠♥♦♣`;
      }
      return val;
    });

    if (result.indexOf("♠♥♦♣") != -1)
      result = result.replace(/(")?♠♥♦♣(")?/g, '').replace(/\\n/g, '').replace(/\\"/g, '"');
    return result;
  }

  return `
    echarts.registerTheme('theme', ${JSON.stringify(theme)});
    var myChart = echarts.init(document.getElementById('main'), 'theme');
    myChart.setOption(${toString(option)});
  `
}
