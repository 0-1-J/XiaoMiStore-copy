/**
 * Created by Administrator on 16-8-3.
 */

angular.module("cartMd", ["swxLocalStorage","utilMd"])
    .factory("cartService", function ($localStorage, util,$rootScope) {
        function myCart(cartName) {
            this.cartName = cartName;
            this.items = [];

            // ��ʼ��ʱ���ع��ﳵ
            this.loadItems();
            //this.clearItems();
        }

        // ��local storage���ع��ﳵ�Ĳ�Ʒ
        myCart.prototype.loadItems = function () {
            var items = $localStorage.get(this.cartName + "_items");
            if (items != null) {
                this.items = items;
            }
        }

        // ���湺�ﳵ
        myCart.prototype.saveItems = function () {
            $localStorage.put(this.cartName+ "_items",this.items);
        }

        // ��չ��ﳵ
        myCart.prototype.clearItems = function () {
            this.items = [];
            this.saveItems();
        }

        // �������򽫲�Ʒ���뵽���ﳵ��
        myCart.prototype.addProductInCart = function (product) {
            var productIndexOf = util.contains(this.items,product);
            //�����Ʒ�Ѿ����ڹ��ﳵ����β�Ʒ������+1,����ֱ�ӰѲ�Ʒ���뵽���ﳵ������
            if (productIndexOf != -1) {
                this.items[productIndexOf].quantity++;
            }
            else
            {
                var productNew = new productClass(product.productId, product.name, product.price, 1,product.img,false);
                this.items.push(productNew);
            }
            // save changes
            this.saveItems();
        }

        //���ﳵ���Ʒ�������Ӽ�����
        myCart.prototype.addNumber = function (product,number){
            if(product.quantity<=1 && number<0)
            {
                return;
            }
            product.quantity+=number;
        }
        //��ȡ���ﳵ���ܼ�
        myCart.prototype.getTotalPrice = function (product,number){
            var total = 0;
            angular.forEach(this.items,function(item){
                if(item.isChecked){
                    total += item.quantity * item.price;
                }

            })
            return total;
        }
        //��ȡ���ﳵ��ѡ��Ĳ�Ʒ����
        myCart.prototype.getAllSelected = function (product,number){
            var selectedNum = 0;
            angular.forEach(this.items,function(item){
                if(item.isChecked)
                {
                    selectedNum+=1;
                }
            })
            return selectedNum;
        }
        //ɾ�����ﳵ��Ĳ�Ʒ
        myCart.prototype.removeItem = function (index){
            this.items.splice(index,1);
            this.saveItems();
        }
        // �����ҵĹ��ﳵ
        var myCartObj;
        if($rootScope.user!=null){//�û��Ѿ���¼
            myCartObj = new myCart($rootScope.user.name);
        }

        // ���񷵻��ҵĹ��ﳵʵ������
        return {
            myCart: myCartObj
        };
    })

//���캯�����������ﳵ��Ĳ�Ʒ
//{"productId":1,"name":"С��Max","price":"1499","img":"max","number":15,"fl_id":1},
function productClass(productId,name,price,quantity,img,isChecked)
{
    this.productId = productId;
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
    this.imgSrc = img;
    this.isChecked = isChecked;
}

