
import { CartItemType } from '../redux/slices/cartSlice'

export const getTotalPrice=(items:CartItemType[])=> items.reduce((sum, obj) => obj.price * obj.count + sum, 0)

export const getTotalCount=(items:CartItemType[])=>{return  items.reduce((sum, obj) => obj.count + sum, 0)}