import {request} from './request'

//获取订单预览（创建订单未提交）包含默认地址，选中商品及商品详情
export function getOrderPreview(){
  return request({
    url:"/api/orders/preview",
  })
}
//data:address_id:String
export function submitOrder(data){
  return request({
    url:"/api/orders",
    method:'POST',
    data
  })
}
//include=user,orderDetails.goods
export function getOrderDetail(order,data){
  return request({
    url:`/api/orders/${order}?${data}`,
  })
}
//page, title,status:1下单 2支付 3发货 4收货 5过期
//include=user,orderDetails.goods
export function getOrderList(data){
  return request({
    url:`/api/orders?page=${data.page}&title=${data.title}&status=${data.status}&include=${data.include}`
  })
}
export function getOrder(order){
  return request({
    url:`/api/orders/${order}/express`,
    data
  })
}
export function confirmOrder(order){
  return request({
    url:`/api/orders/${order}/confirm`,
    method:'PATCH'
  })
}

//
export function submitComment(order,data){
  return request({
    url:`/api/orders/${order}/comment`,
    method:'POST',
    data
  })
}

export function getPayCode(order,data){
  return request({
    url:`/api/orders/${order}/pay?type=${data.type}`,
    data
  })
}

export function checkPayStatus(order){
  return request({
    url:`/api/orders/${order}/status`,
  })
}

