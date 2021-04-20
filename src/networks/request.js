import axios from 'axios'

//axios instance 1 for one server
const rqInstance1= axios.create({
  baseURL:'',
  timeout: 5000
});

export function request(config){
  //request intercrept...
  
  return rqInstance1(config);
}