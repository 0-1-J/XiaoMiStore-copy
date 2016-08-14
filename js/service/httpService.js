/**
 * Created by Administrator on 16-6-20.
 */

angular.module("httpMd",[])
    .factory("httpService",function($http,$q){
        return{
            get:function(_urlPath){
                var defer=$q.defer(); //�����Ӻ�ִ��
                $http({method:'GET',url:_urlPath})
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //����ִ�гɹ�
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //����ִ��ʧ��
                    });
                return defer.promise; //���س�ŵ�����ػ�ȡ���ݵ�API
            }
        }
        var urlPath = "json/products.json"
        var factory = {
            data:$http(	{
                    method:'get',
                    url:urlPath,
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=gbk'}}
            ).success(function(data,state,config,headers){
                    return data;
                })
        };
    })