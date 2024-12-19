let script = function(){

    this.orderItems = function(){

    }

    this.products = {
        1 : {
            name: 'Indomie Goreng',
            stock: 10,
            price: 3000
        }
    };
    
    this.showClock = function(){ 
        var dateObj = new Date;
    
        let month = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        let year = dateObj.getFullYear();
        let monthNum = dateObj.getMonth();
        let dateCal = dateObj.getDate();
        let hour = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();
    
        document.querySelector(".timeAndDate").innerHTML = month[monthNum] + " " + dateCal + ", " + year + " " + hour + ":" + min + ":" + sec; 
        setInterval(loadScript.showClock, 1000);
    }

    this.registerEvents = function(){
        document.addEventListener('click', function(e){
            let targetEl = e.target;
            let targetElClassList = targetEl.classList;
            
            let addToOrderClasses = ['productImage', 'productName', 'productPrice'];

            if(targetElClassList.contains(addToOrderClasses[0]) ||
                targetElClassList.contains(addToOrderClasses[1]) ||
                targetElClassList.contains(addToOrderClasses[2])){
                    
                    let productContainer = targetEl.closest('div.productColContainer');
                    let pid = productContainer.dataset.pid;
                    let productInfo = loadScript.products[pid];

                    let curStock = productInfo['stock']
                    if(curStock === 0) {
                        loadScript.dialogError('Selected product is currently out of stock.');

                        return a;
                    }
                    

                    let dialogForm = '\
                            <h6 class="dialogProductName">' + productInfo['name'] + ' <span class="float-right">Rp'+ productInfo['price'] +' </span></h6>\
                            <input type="number" id="orderQty" class="form-control" placeholder="Enter Quantity" min="1"  />\
                        ';

                    
                    BootstrapDialog.confirm({
                        title: 'Add To Order',
                        type: BootstrapDialog.TYPE_DEFAULT,
                        message: dialogForm,
                        callback: function(addOrder){
                            if (addOrder){
                                let orderQty = parseInt(document.getElementById('orderQty').value);
                                if(isNaN(orderQty)) {
                                    loadScript.dialogError('Please enter order quantity!');

                                    return a;
                                }

                                if(orderQty > curStock) {
                                    loadScript.dialogError('Order quantity exceeds current stock! \ <strong>(' + curStock + ')</strong>');

                                    return a;
                                }

                                loadScript.addToOrder(productInfo, orderQty);
                            }

                            
                        }
                    });
                }
        })
    }

    this.addToOrder = function(productInfo, orderQty) {

        if(loadScript.orderItems){
            orderItems
        }

        let ordersContainer = document.querySelector('.pos_items');



        let tableHtml = `
            <table class="table" id="pos-items-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                 </thead>
                 <tbody>__ROWS__</tbody>    
            </table>`;
    }

    this.dialogError = function(message){
        BootstrapDialog.alert({
            title: '<strong>Error</strong>',
            type: BootstrapDialog.TYPE_DANGER,
            message: message
        });
    }

    this.initialize = function(){
        this.showClock();

        this.registerEvents();
    }

};

let loadScript = new script;
loadScript.initialize();





