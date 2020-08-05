// import 'echarts-wordcloud';

const option1 = (data: any) => {
  // const { actualAmount, recoverRate, dueAmount, month } = data;
  return {
    color: ['#7da3ff', '#6cbbff'],
    title: {
      // text: '销售额趋势',
      // x: 'center',
      // y: 'bottom',
    },
    legend: {
      data: ['授信金额', '提现金额'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额',
        // min: 0,
        // max: 25,
        // interval: 5,
        axisLabel: {
          formatter: '{value} 万元'
        }
      }
    ],
    series: [
      {
        name: '授信金额',
        type: 'bar',
        data: [10, 52, 200, 334, 390, 330, 220]
      },
      {
        name: '提现金额',
        type: 'bar',
        data: [130, 53, 20, 243, 190, 320, 120]
      }
    ]
  }
}

const bar2 = (data: any) => {
  const {
    dataArray,
    nameArray,
    company,
    companyName
  } = data;
  let firstArray = dataArray && dataArray[0] ? dataArray[0].value : [];
  let secondArray = dataArray && dataArray[1] ? dataArray[1].value : [];
  const firstName = dataArray && dataArray[0] ? dataArray[0].name : '';
  const secondName = dataArray && dataArray[1] ? dataArray[1].name : '';

  return {
    color: ['#7da3ff', '#a0e6b8'],
    title: {
      // text: '销售额趋势',
      // x: 'center',
      // y: 'bottom',
    },
    legend: {
      data: [firstName, secondName],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: nameArray,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: companyName,
        // min: 0,
        // max: 25,
        // interval: 5,
        axisLabel: {
          formatter: `{value} ${company}`
        }
      }
    ],
    series: [
      {
        name: firstName,
        type: 'bar',
        data: firstArray
      },
      {
        name: secondName,
        type: 'bar',
        data: secondArray
      }
    ]
  }
}

const pie = (value: any) => {

  const { data } = value;
  const newData = data.data ? data.data : []

  return {
    color: ['#7da3ff', '#ffca4d', '#43aaff', '#2ce69a'],
    backgroundColor: '#fff',

    title: {
      // text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        // colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: newData.sort(function (a: any, b: any) { return a.value - b.value; }),
        // data: [
        //   { value: 335, name: '汽车金融消费贷' },
        //   { value: 310, name: '经营消费贷' },
        //   { value: 274, name: '旅游消费贷' },
        //   { value: 235, name: '医疗消费贷' },
        // ].sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx: any) {
          return Math.random() * 200;
        }
      }
    ]
  };
}

const option4 = (data: any) => {
  return {
    color: ['#5e50fb'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['北京', '上海', '广州', '福建', '浙江', '江苏', '其他'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '人数',
        min: 0,
        max: 500,
        interval: 100,
        axisLabel: {
          formatter: '{value} 万人'
        }
      },
      {
        type: 'value',
        name: '逾期率',
        min: 0,
        max: 50,
        interval: 10,
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '人数',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  }
}


const bar = (data: any) => {
  const nameList = data && data.data ? data.data.map((item: any, index: number) => {
    return item.name
  }): []

  const valueList = data && data.data ? data.data.map((item: any, index: number) => {
    return item.value
  }) : []

  return {
    color: ['#16c0b9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        // name: '年龄',
        type: 'category',
        data: nameList,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额',
        // min: 0,
        // max: 500,
        // interval: 100,
        axisLabel: {
          formatter: '{value} 元'
        }
      }
    ],
    series: [
      {
        name: '金额（元）',
        type: 'bar',
        barWidth: '60%',
        label: {
          normal: {
              show: true,
              position: 'top',
              formatter: '{@score} 元'
          }
      },
        data: valueList
      }
    ]
  };
}

const circular = (data: any, name: string) => {
  const newData = data && data.data ? data.data : [];
  const nameList = data && data.data ? data.data.map((item: any, index: number) => {
    return item.name
  }) : []

  return {
    color: ['#7da3ff', '#ffca4d', '#ff9f7f', '#2ce69a'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      y: 'top',
      data: nameList
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: newData
      }
    ]
  }
};


export default {
  option1,
  bar2,
  pie,
  option4,
  bar,
  circular
}