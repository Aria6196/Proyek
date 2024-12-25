<?php
    include ('products.php');

    $products = getProducts();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- <script src="https://use.fontawesome.com/0c7a3095b5.js"></script> -->
    <link rel="stylesheet" href="style.css">
    

    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.4/css/bootstrap-dialog.min.css"/>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-8">
                

                <div class="searchResultContainer">
                    <div class="row">
                        <?php foreach($products as $product){ ?>
                        <div class="col-4 productColContainer" data-pid="<?= $product['id'] ?>">
                            <div class="productResultContainer">
                                <img src="<?= $product['image'] ?>" class="productImage" alt="">
                                <div class="productInfoContainer">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <p class="productName"><?= $product['name'] ?></p>
                                        </div>
                                        <div class="col-md-4">
                                            <p class="productPrice">Rp<?= $product['price'] ?></p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php }?>
                    </div>
                </div>
            </div>
            
            <div class="col-4 posOrderContainer">
                <div class="pos-header">
                        <div class="setting alignRight">
                            <a href="javascript:void(0);"><i class="fa fa-gear"></i></a>
                        </div>
                    <p class="logo">IMS</p>
                    <p class="timeAndDate"></p>
                </div>
                <div class="pos-items-container">
                    <div class="pos-items">
                        <p class="itemNoData">No Data</p>
                    </div>
                    <div class="item-total-container">
                        <p class="item-total">
                            <span class="item-total-label">TOTAL</span>
                            <span class="item-total-value">Rp0</span>
                        </p>
                    </div>
                </div>
                <div class="checkout-button-container">
                    <a href="javascript:void(0);" class="checkout-button">CHECKOUT</a>
                </div>
                <div class="mx-3">
                    <a href="logout.php" class="btn btn-danger w-100">Logout</a>
                </div>


            </div>
        </div>
    </div>


<script>
    let productsJson = <?= json_encode($products) ?>;
    var products = {};

    productsJson.forEach((product) => {

        products[product.id] = {
            name: product.name,
            stock: product.stock,
            price: product.price
        }
    });

    

</script>
<script src="script.js?v=<?= time() ?>"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.4/js/bootstrap-dialog.min.js"></script>


</body>
</html>
