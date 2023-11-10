import classNames from 'classnames'
import './index.scss'
const DailyBill = () => {
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{'11月10日'}</span>
                    {/* expand 有这个类名 展开的箭头朝上的样子 */}
                    <span className='arrow'></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{100}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{200}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{300}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            {/*<div className="billList" style={{ display: visible ? 'block' : 'none' }}>*/}
            {/*    {billList.map(item => {*/}
            {/*        return (*/}
            {/*            <div className="bill" key={item.id}>*/}
            {/*                /!* 图标 *!/*/}
            {/*                <Icon type={item.useFor} />*/}
            {/*                <div className="detail">*/}
            {/*                    <div className="billType">{billTypeToName[item.useFor]}</div>*/}
            {/*                </div>*/}
            {/*                <div className={classNames('money', item.type)}>*/}
            {/*                    {item.money.toFixed(2)}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    )
}
export default DailyBill
