import {NavBar, DatePicker, Empty} from 'antd-mobile'
import './index.scss'
import {useState, useMemo, useEffect} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from 'lodash'
import DayBill from "./components/DayBill";
import {QuestionCircleOutline} from 'antd-mobile-icons'

const Month = () => {
    //按月做数据分组
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    console.log(monthGroup)

    // 控制时间选择器打开和关闭
    const [dateVisible, setDateVisible] = useState(false)

    //控制时间value
    const [currentData, setCurrentData] = useState(dayjs(new Date()).format('YYYY-MM'))

    //控制当前月份的账单列表
    const [currentMonthList, setCurrentMonthList] = useState([])

    //月度账单统计
    const monthResult = useMemo(() => {
        if (!currentMonthList) return {pay: 0, income: 0, total: 0}
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((total, item) => total + item.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((total, item) => total + item.money, 0)
        return {pay, income, total: pay + income}
    }, [currentMonthList])

    //时间选择器确认按钮
    const dateConfirm = (data) => {
        const date = dayjs(data).format('YYYY-MM')
        setCurrentMonthList(monthGroup[date])
        setCurrentData(date)
    }

    //初始化月度账单列表
    useEffect(() => {
        const nowData = (dayjs(new Date()).format('YYYY-MM'))
        //边界控制
        if (monthGroup[nowData]) {
            setCurrentMonthList(monthGroup[nowData])
        }
    }, [monthGroup])

    //当前月按照日期分组
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            keys,
            groupData
        }
    }, [currentMonthList])
    console.log(dayGroup)
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}> 月度收支 </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text"> {currentData + ''}月账单 </span>
                        {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
                        <span className={classNames('arrow', dateVisible && 'expand')}/>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={dateConfirm}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表统计 */}
                {dayGroup.keys.length > 1 ? dayGroup.keys.map(key => {
                    return <DayBill key={key} date={key} billList={dayGroup.groupData[key]}/>
                }) :  <Empty description='暂无数据' />}
            </div>
        </div>
    )
}

export default Month
