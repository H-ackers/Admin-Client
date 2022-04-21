import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { PieChart } from 'bizcharts';

// 饼图
export default function Pie() {


  // 销量数据源
  const [sales, setSales] = useState([
    {
      type: '衬衫',
      value: 27,
    },
    {
      type: '羊毛衫',
      value: 10,
    },
    {
      type: '雪纺衫',
      value: 36,
    },
    {
      type: '裤子',
      value: 35,
    },
    {
      type: '高跟鞋',
      value: 20,
    },
    {
      type: '袜子',
      value: 60,
    },
  ]);

  // 库存数据源
  const [stock, setStock] = useState([
    {
      type: '衬衫',
      value: 60,
    },
    {
      type: '羊毛衫',
      value: 20,
    },
    {
      type: '雪纺衫',
      value: 40,
    },
    {
      type: '裤子',
      value: 75,
    },
    {
      type: '高跟鞋',
      value: 35,
    },
    {
      type: '袜子',
      value: 20,
    },
  ]);

  const getSales = (sales) => (sales);
  const getStock = (stock) => (stock);

  const update = () => {
    const newSales = sales.map(s=> {
      s.value += 1;
      const s2 = s;
      return s2;
    });
    const newStock = stock.map(s=> {
      s.value -= 1;
      const s2 = s;
      return s2;
    });
    
    setSales(newSales);
    setStock(newStock);
  };
  

  return (
    <>
      <Card>
        <Button type='primary' onClick={update}>更新</Button>
      </Card>
      <Card>
        <PieChart
          forceUpdate={true}    //  每次更新都销毁g2实例，重新绘制图表
          data={getSales(sales)}
          title={{
            visible: true,
            text: '部分产品销量预览',
          }}
          description={{
            visible: true,
            text: '',
          }}
          radius={1}
          angleField='value'
          colorField='type'
          label={{
            visible: true,
            type: 'spider',
            labelHeight: 28,
            content: v => `${v.type}\n${v.value}`
          }}
        />
        <hr style={{marginTop: 30}}/>
        <PieChart
          forceUpdate={true}
          data={getStock(stock)}
          title={{
            visible: true,
            text: '部分产品库存预览',
          }}
          description={{
            visible: true,
            text: '',
          }}
          radius={1}
          angleField='value'
          colorField='type'
          label={{
            visible: true,
            type: 'spider',
            labelHeight: 28,
            content: v => `${v.type}\n${v.value}`
          }}
        />
      </Card>
    </>
  )
}
