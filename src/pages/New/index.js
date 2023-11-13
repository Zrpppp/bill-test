import {Button, DatePicker, Input, NavBar, Toast} from 'antd-mobile'
import Icon from '@/components/icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import {useState} from "react";
import {addBillList} from "@/store/modules/billStore";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";

const New = () => {
    const navigate = useNavigate()
    //控制收入支出的状态
    const [billType,setBillType] = useState('pay')

    const [money,setMoney] = useState(0)
    const moneyChange = (value)=>{
        setMoney(value)
    }
    //收集账单类型
    const [useFor,setUseFor] = useState('')
    const dispatch = useDispatch()

    const saveBill = () => {
        if(!money) return  Toast.show({  content: '请填写金额' })
        if (!useFor) return Toast.show({  content: '请选择账单类型' })
        const data = {
            type: billType,
            money:billType==='pay' ? -money : +money,
            date:date,
            useFor:useFor
        }
        dispatch(addBillList(data))
        Toast.show({
            icon: 'success',
            content: '保存成功',
        })
    }

    //时间选择器
    const [date,setDate] = useState(new Date())
    const [dateVisible,setDateVisible] = useState(false)
    const dateConfirm = (value) => {
        setDate(value)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                        onClick={()=>setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'income' ? 'selected' : '')}
                        onClick={()=>setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={()=>setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            {/* 时间选择器 */}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={dateConfirm}
                                onClose={()=>setDateVisible(false)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {/* 数据区域 */}
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        // selected
                                        <div
                                            className={classNames('item', useFor===item.type ? 'selected' : '' )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New
