import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ReactECharts from 'echarts-for-react';


// 柱状图
export default function Bar() {

  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20]);
  const [stock, setStock] = useState([10, 30, 50, 20, 20, 30]);

  const getOptions = (sales, stock) => {
    return {
      title: {
        text: '部分产品销量与库存预览'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sales
        },
        {
          name: '库存',
          type: 'bar',
          data: stock
        }
      ]
    };
  };

  const update = () => {
    const newSales = sales.map(s=> {
      return s + 1;
    });
    const newStock = stock.map(s=> {
      return s - 1;
    });
    setSales(newSales);
    setStock(newStock);
  };

  return (
    <div>
      <Card>
        <Button type='primary' onClick={update}>更新</Button>
      </Card>
      <Card>
        <ReactECharts option={getOptions(sales, stock)} />
      </Card>
    </div>
  )
}
