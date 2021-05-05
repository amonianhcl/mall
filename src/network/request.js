import axios from 'axios'
import { Notify, Toast } from 'vant'
import router from 'router'

//axios instance 1 for one server
export function request(config){
  const instance= axios.create({
    baseURL:'https://api.shop.eduwork.cn',
    timeout: 5000
  });
  
  //request intercrept...
  instance.interceptors.request.use(config=>{
    //if a request needs the token
    let token = window.localStorage.getItem('token')
    if(token){
      config.headers.Authorization= 'Bearer '+ token;
    }
    return config;
  },err => {
    return Promise.reject(err) 
  });
  
  //responce intercept///
  instance.interceptors.response.use(res => {
    return res.data? res.data : res; //响应结果只取数据部分
  }, err => {
    //alert err info     
    console.log(err.response)
    let status= err.response.status;
    
    if(status == '422'){//验证错误） 请求参数未通过验证
      let errors= err.response.data.errors;
      Notify({ message: errors[Object.keys(errors)[0]][0] });
    }
    else if(status == '401'){ //（未授权）请求要求身份验证。
      let url = err.response.config.url;
      if(url.includes('login')){
        Notify({ message: "用户名或密码错误" });
      }else{
        Toast.fail("请登录");
        setTimeout(()=>{
          router.push({path:'/login'})
        },1000);
      }
    }


    return Promise.reject(err)   //!!! 必须返回Promise reject 否则请求响应还是会进入resolve
  })

  return instance(config);
}