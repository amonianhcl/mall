import axios from 'axios'

//axios instance 1 for one server
export function request(config){
  const instance= axios.create({
    baseURL:'https://api.shop.eduwork.cn',
    timeout: 5000
  });
  
  //request intercrept...
  instance.interceptors.request.use(config=>{
    //if need the token

    return config;
  },err => {

  });
  
  //responce intercept///
  instance.interceptors.response.use(res => {
    return res.data? res.data : res; //响应结果只取数据部分
  },err => {
    //return err code
    
  })
  return instance(config);
}