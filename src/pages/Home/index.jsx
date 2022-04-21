import React from 'react';
import { Card, Space, Statistic, Row, Col, DatePicker, Timeline, Button  } from 'antd';
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons';
import { Chart, Line, Point, Tooltip, Legend, Axis, Annotation, G2, Interval, } from 'bizcharts';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// // 首页路由
export default function Home() {

  // 数据源
  const data = [
    {
      month: "Jan",
      city: "Tokyo",
      temperature: 7
    },
    {
      month: "Jan",
      city: "London",
      temperature: 3.9
    },
    {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.9
    },
    {
      month: "Feb",
      city: "London",
      temperature: 4.2
    },
    {
      month: "Mar",
      city: "Tokyo",
      temperature: 9.5
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7
    },
    {
      month: "Apr",
      city: "Tokyo",
      temperature: 14.5
    },
    {
      month: "Apr",
      city: "London",
      temperature: 8.5
    },
    {
      month: "May",
      city: "Tokyo",
      temperature: 18.4
    },
    {
      month: "May",
      city: "London",
      temperature: 11.9
    },
    {
      month: "Jun",
      city: "Tokyo",
      temperature: 21.5
    },
    {
      month: "Jun",
      city: "London",
      temperature: 15.2
    },
    {
      month: "Jul",
      city: "Tokyo",
      temperature: 25.2
    },
    {
      month: "Jul",
      city: "London",
      temperature: 17
    },
    {
      month: "Aug",
      city: "Tokyo",
      temperature: 26.5
    },
    {
      month: "Aug",
      city: "London",
      temperature: 16.6
    },
    {
      month: "Sep",
      city: "Tokyo",
      temperature: 23.3
    },
    {
      month: "Sep",
      city: "London",
      temperature: 14.2
    },
    {
      month: "Oct",
      city: "Tokyo",
      temperature: 18.3
    },
    {
      month: "Oct",
      city: "London",
      temperature: 10.3
    },
    {
      month: "Nov",
      city: "Tokyo",
      temperature: 13.9
    },
    {
      month: "Nov",
      city: "London",
      temperature: 6.6
    },
    {
      month: "Dec",
      city: "Tokyo",
      temperature: 9.6
    },
    {
      month: "Dec",
      city: "London",
      temperature: 4.8
    }
  ];

  const scale = {
    temperature: { min: 0 },
    city: {
      formatter: v => {
        return {
          London: '电器',
          Tokyo: '服装'
        }[v];
      }
    }
  };

  const data2 = [
    { name: '男性', 月份: 'Jan.', 日均访问量: 18.9 },
    { name: '男性', 月份: 'Feb.', 日均访问量: 28.8 },
    { name: '男性', 月份: 'Mar.', 日均访问量: 39.3 },
    { name: '男性', 月份: 'Apr.', 日均访问量: 81.4 },
    { name: '男性', 月份: 'May', 日均访问量: 47 },
    { name: '男性', 月份: 'Jun.', 日均访问量: 20.3 },
    { name: '男性', 月份: 'Jul.', 日均访问量: 24 },
    { name: '男性', 月份: 'Aug.', 日均访问量: 35.6 },
    { name: '男性', 月份: 'Sep', 日均访问量: 62.6 },
    { name: '男性', 月份: 'Oct.', 日均访问量: 35.5 },
    { name: '男性', 月份: 'Nov.', 日均访问量: 27.4 },
    { name: '男性', 月份: 'Dec.', 日均访问量: 52.4 },
    { name: '女性', 月份: 'Jan.', 日均访问量: 12.4 },
    { name: '女性', 月份: 'Feb.', 日均访问量: 23.2 },
    { name: '女性', 月份: 'Mar.', 日均访问量: 34.5 },
    { name: '女性', 月份: 'Apr.', 日均访问量: 99.7 },
    { name: '女性', 月份: 'May', 日均访问量: 52.6 },
    { name: '女性', 月份: 'Jun.', 日均访问量: 35.5 },
    { name: '女性', 月份: 'Jul.', 日均访问量: 37.4 },
    { name: '女性', 月份: 'Aug.', 日均访问量: 42.4 },
    { name: '女性', 月份: 'Sep', 日均访问量: 92.6 },
    { name: '女性', 月份: 'Oct.', 日均访问量: 37.5 },
    { name: '女性', 月份: 'Nov.', 日均访问量: 32.2 },
    { name: '女性', 月份: 'Dec.', 日均访问量: 43.6 },
  ];

    return (
      <div>
        <Row style={{padding: 20}}>
          <Col span={7}>
            <Card title="商品总量" extra={<QuestionCircleOutlined />} >
              <Space>
                <Statistic
                  value={1128163}
                  valueStyle={{ color: '#0083ff', fontSize: 30, fontWeight: 'bold' }}
                />
                <span>件</span>
              </Space>
              <Statistic
                title="周同比"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Statistic
                title="日同比"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={1}></Col>
          <Col span={16} style={{padding: '20px 0'}}>
            <Chart scale={scale} padding={[30, 20, 60, 40]} autoFit height={280} data={data} interactions={['element-active']}>
              < Axis name="month" />
              <Annotation.Text
                position={[0, 'max']}
                content="月销售额(单位:万件)"
                style={{
                  textAlign: 'left',
                  fontSize: 14
                }} />
              <Point position="month*temperature" color="city" shape='circle' />
              <Line shape="smooth" position="month*temperature" color="city" label='temperature' />
              <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
              <Legend background={{
                padding:[5,100,5,36],
                style: {
                  fill: '#eaeaea',
                  stroke: '#fff'
                }
              }} />
            </Chart>
          </Col>
        </Row>
        <Card title={<a href="#!">访问量</a>} extra={<RangePicker format={dateFormat} />} style={{ width: '100%' }}>
          <Row>
            <Col span={16} style={{paddingRight: 20}}>
              <Card title='访问趋势' extra={<Button type='link'><ReloadOutlined /></Button>} >
                <Chart height={400} padding="auto" data={data2} autoFit>
                  <Interval
                    adjust={[
                      {
                        type: 'dodge',
                        marginRatio: 0,
                      },
                    ]}
                    color="name"
                    position="月份*日均访问量"
                  />
                  <Tooltip shared />
                </Chart>
              </Card>
            </Col>
            <Col span={8}>
              <Card title='进度' extra={<Button type='link'><ReloadOutlined /></Button>}>
                <Timeline>
                  <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 2015-09-01</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <p>Technical testing 1</p>
                    <p>Technical testing 2</p>
                    <p>Technical testing 3 2015-09-01</p>
                  </Timeline.Item>
                  <Timeline.Item color="gray">
                    <p>Technical testing 1</p>
                    <p>Technical testing 2</p>
                    <p>Technical testing 3 2015-09-01</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }