//账单列表相关store
import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const billStore = createSlice({
    name: 'bill',
    //数据状态
    initialState: {
        billList: [],
    },
    //同步方法
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        addBill(state, action) {
            state.billList.push(action.payload)
        }
    }
})

//解构出同步方法
const {setBillList,addBill} = billStore.actions

//编写异步
const getBillList = () =>  {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}

const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka',data)
        dispatch(addBill(res.data))
    }
}

export {getBillList,addBillList}

//导出reducer
const reducer = billStore.reducer
export default reducer
