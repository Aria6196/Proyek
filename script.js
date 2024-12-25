let script = function(){

    this.orderItems = {};
    this.totalOrderAmount = 0;

    this.products = products;
    
    //fungsi membuat jam
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

    //memilih berdasarkan klik
    this.registerEvents = function(){
        document.addEventListener('click', function(e){
            let targetEl = e.target;
            let targetElClassList = targetEl.classList;
            
            let addToOrderClasses = ['productImage', 'productName', 'productPrice'];

            //klik product
            if(targetElClassList.contains(addToOrderClasses[0]) ||
                targetElClassList.contains(addToOrderClasses[1]) ||
                targetElClassList.contains(addToOrderClasses[2])){
                    

                    let productContainer = targetEl.closest('div.productColContainer');
                    let pid = productContainer.dataset.pid;
                    let productInfo = loadScript.products[pid];

                    //cek jumlah stok dari produk yang diklik
                    let curStock = productInfo['stock']
                    if(curStock === 0) {
                        loadScript.dialogError('Selected product is currently out of stock.');

                        return a;
                    }
                    
                    //form jumlah pesanan
                    let dialogForm = '\
                            <h6 class="dialogProductName">' + productInfo['name'] + ' <span class="float-right">Rp'+ productInfo['price'] +' </span></h6>\
                            <input type="number" id="orderQty" class="form-control" placeholder="Enter Quantity" min="1"  />\
                        ';

                    //konfirmasi jumlah pesanan
                    BootstrapDialog.confirm({
                        title: 'Add To Order',
                        type: BootstrapDialog.TYPE_DEFAULT,
                        message: dialogForm,
                        callback: function(addOrder){
                            if (addOrder){
                                //mengisi form jumlah pesanan
                                let orderQty = parseInt(document.getElementById('orderQty').value);

                                //jika jumlah tidak diisi
                                if(isNaN(orderQty)) {
                                    loadScript.dialogError('Please enter order quantity!');

                                    return a;
                                }

                                //jika jumlah melebihi stok
                                if(orderQty > curStock) {
                                    loadScript.dialogError('Order quantity exceeds current stock! \ <strong>(' + curStock + ')</strong>');

                                    return a;
                                }

                                loadScript.addToOrder(productInfo, pid, orderQty);
                            }
                            
                        }
                    });
                }

                if(targetElClassList.contains('deleteOrderItem')){
                    let pid = targetEl.dataset.id;
                    let productInfo = loadScript.orderItems[pid];

                    BootstrapDialog.confirm({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: '<strong>Delete Order</strong>',
                        message: 'Are you sure want to delete <strong>' + productInfo['name'] + '</strong>',
                        callback: function(toDelete){
                            if(toDelete){
                                let orderedQuantity = productInfo['orderQty'];
                                loadScript.products[pid]['stock'] += orderedQuantity;

                                delete loadScript.orderItems[pid];

                                loadScript.updateOrderItemTable();
                            }
                        }
                    })

                    
                };

                if (targetElClassList.contains('quantityUpdateButton_minus')){
                    let pid = targetEl.dataset.id;
        

                    loadScript.products[pid]['stock']++;
                    loadScript.orderItems[pid]['orderQty']--;

                    loadScript.orderItems[pid]['amount'] = loadScript.orderItems[pid]['orderQty'] * loadScript.orderItems[pid]['price'];

                    if(loadScript.orderItems[pid]['orderQty'] === 0){
                        delete loadScript.orderItems[pid];
                    }

                    loadScript.updateOrderItemTable();
                }

                if (targetElClassList.contains('quantityUpdateButton_plus')){
                    let pid = targetEl.dataset.id;

                    if(loadScript.products[pid]['stock'] === 0 ){
                        loadScript.dialogError('Selected product is currently out of stock.');
                    }else {
                        loadScript.products[pid]['stock']--;
                        loadScript.orderItems[pid]['orderQty']++;

                        loadScript.orderItems[pid]['amount'] = loadScript.orderItems[pid]['orderQty'] * loadScript.orderItems[pid]['price'];

                        loadScript.updateOrderItemTable();
                    }
        
                    
                }

        });
    }

    this.updateOrderItemTable = function(){
        let ordersContainer = document.querySelector('.pos-items');
        let html = '<p class="itemNoData">No Data</p>'
        
        loadScript.totalOrderAmount = 0;

        //cek jika variabel barang pesanan kosong atau tidak
        if(Object.keys(loadScript.orderItems)){

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

            //loop barang pesanan dan simpan di baris
            let rows = '';
            let rowNum = 1;

            for (const [pid, orderItems] of Object.entries(loadScript.orderItems)) {
                rows += `
                    <tr>
                        <td>${rowNum}</td>
                        <td>${orderItems['name']}</td>
                        <td>${orderItems['price']}</td>
                        <td>
                            ${orderItems['orderQty']}
                            <a href="javascript:void(0);" data-id="${pid}" class="quantityUpdateButton quantityUpdateButton_minus">
                                <i data-id="${pid}" class="fa fa-minus quantityUpdateButton_minus"></i>
                            </a>
                            <a href="javascript:void(0);" data-id="${pid}" class="quantityUpdateButton quantityUpdateButton_plus">
                                <i data-id="${pid}" class="fa fa-plus quantityUpdateButton_plus"></i>
                            </a>
                        </td>
                        <td>${orderItems['amount']}</td>
                        <td>
                            <a href="javascript:void(0);" class="deleteOrderItem" data-id="${pid}">
                                <i class="fa fa-trash deleteOrderItem" data-id="${pid}"></i>
                            </a>    
                        </td>
                    </tr>    
                `;
                
                rowNum++;

                loadScript.totalOrderAmount += orderItems['amount'];
            }

            html = tableHtml.replace('__ROWS__', rows);

        }
        ordersContainer.innerHTML = html;

        this.updateTotalOrderAmount();
        
    };

    this.updateTotalOrderAmount = function(){
        document.querySelector('.item-total-value').innerHTML = 'Rp' + loadScript.totalOrderAmount;
    };

    this.addToOrder = function(productInfo, pid, orderQty) {
        // cek pesanan yang diklik dan simpan di variabel
        let curItemId = Object.keys(loadScript.orderItems);
        let totalAmount = productInfo['price'] * orderQty;
        
        //cek jika produk sudah ada di list
        if(curItemId.indexOf(pid) > -1){

            //jika sudah ada, update jumlah
            loadScript.orderItems[pid]['amount'] += totalAmount;
            loadScript.orderItems[pid]['orderQty'] += orderQty;

             //merubah stok berdasarkan jumlah pesanan
             loadScript.products[pid]['stock'] -= orderQty;
        } else {

            //jika belum, tambahkan
            loadScript.orderItems[pid] = {
                name: productInfo['name'],
                price: productInfo['price'],
                orderQty: orderQty,
                amount: totalAmount

            };

        };

        //merubah stok berdasarkan jumlah pesanan
        loadScript.products[pid]['stock'] -= orderQty;

        this.updateOrderItemTable();

    };

    this.checkout = function () {
        let orderItems = loadScript.orderItems;

        // Jika tidak ada item dalam pesanan
        if (Object.keys(orderItems).length === 0) {
            loadScript.dialogError("No items to checkout.");
            return;
        }

        // Format tabel pesanan untuk ditampilkan dalam dialog
        let orderDetails = `
        <table class='table'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
        `;

        for (const [pid, item] of Object.entries(orderItems)) {
            orderDetails += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.orderQty}</td>
                    <td>Rp${item.price}</td>
                    <td>Rp${item.amount}</td>
                </tr>
            `;
        } 

        orderDetails += `
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total</th>
                        <th>Rp${loadScript.totalOrderAmount}</th>
                    </tr>
                </tfoot>
            </table>
            <div>
                <label for="paymentAmount">Enter (Rp):</label>
                <input type="number" id="paymentAmount" class="form-control" placeholder="Enter Payment" min="${loadScript.totalOrderAmount}" />
            </div>
        `;

        let cleanOrderDetails = orderDetails.replace(/[\r\n]+/gm, "");

        // Tampilkan dialog checkout
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_INFO,
            title: "Checkout",
            message: cleanOrderDetails.trim(),
            buttons: [
                {
                    label: "Cancel",
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: "OK",
                    cssClass: "btn-primary",
                    action: function (dialogRef) {
                        let paymentAmount = parseInt(document.getElementById("paymentAmount").value);
                    
                        if (isNaN(paymentAmount) || paymentAmount < loadScript.totalOrderAmount) {
                            loadScript.dialogError("Invalid payment amount.");
                            return;
                        }
                    
                        let change = paymentAmount - loadScript.totalOrderAmount;
                    
                        
                        const { jsPDF } = window.jspdf;
                        const doc = new jsPDF();
                        doc.text("Transaction Receipt", 10, 10);
                        doc.text(`Date: ${new Date().toLocaleString()}`, 10, 20);
                        doc.text("Order Details:", 10, 30);
                    
                        let y = 40;
                        for (const [pid, item] of Object.entries(orderItems)) {
                            doc.text(
                                `${item.name} (Qty: ${item.orderQty}) - Rp${item.amount}`,
                                10,
                                y
                            );
                            y += 10;
                        }
                    
                        doc.text(`Total: Rp${loadScript.totalOrderAmount}`, 10, y + 10);
                        doc.text(`Payment: Rp${paymentAmount}`, 10, y + 20);
                        doc.text(`Change: Rp${change}`, 10, y + 30);
                    
                        doc.save("Transaction_Receipt.pdf");
                    
                        loadScript.orderItems = {};
                        loadScript.totalOrderAmount = 0;
                        loadScript.updateOrderItemTable();
                    
                        dialogRef.close();
                    }
                    
                }
            ]
        });
    };
    

// Tambahkan event listener untuk tombol checkout
document.querySelector(".checkout-button").addEventListener("click", function () {
    loadScript.checkout();
});

    //fungsi error jumlah pesanan 
    this.dialogError = function(message){
        BootstrapDialog.alert({
            title: '<strong>Error</strong>',
            type: BootstrapDialog.TYPE_DANGER,
            message: message
        });
    };

    //fungsi menjalankan jam
    this.initialize = function(){
        this.showClock();

        this.registerEvents();
    };

};

let loadScript = new script;
loadScript.initialize();


