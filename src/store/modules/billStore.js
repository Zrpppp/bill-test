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
        }
    }
})

//解构出同步方法
const {setBillList} = billStore.actions

//编写异步
const getBillList = () =>  {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}
export {getBillList}

//导出reducer
const reducer = billStore.reducer
export default reducer
