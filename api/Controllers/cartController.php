<?php

require_once("./models/CartModel.php");
class CartController{

    public $model;
 
    public function __construct(){
         $this->model = new CartModel();

    }

    public function create_cart(){
        //insert  userid , date creation 
        //return cart id
       return $this->model->insert_new_cart($_GET['userId']);
        

    }

    public function get_cart()
    {
        if(isset($_GET['userId'])){
            $data = $this->model->get_cart_by_user_id($_GET['userId']);
            if(count($data) > 0 ){
                echo json_encode($data[0]);
            }
            else{
                $res = $this->create_cart();
                 $cart['id'] = $res;
                echo json_encode($cart);
            }
        }
    }
    public function add_product(){
        
        $data = $this->model->save_to_cart($_POST['id'],$_POST['cartId'],$_POST['amount']);
            if($data != 0){
                echo "product added";
            }
            else{
                echo "error";
            }
        // $GUID = CartController::getGUID();
        // echo $GUID;
       
    }


     public function get_carts()
    {
    $carts=$this->model->get_carts_by_user_id($_POST['userId']);
    
    for ($index=0; $index <count($carts) ; $index++) { 
       $rows=$this->model->get_products_by_cart_id($carts[$index]->id);
       $carts[$index]->totalPrice=0;
       for ($i=0; $i <count($rows) ; $i++) { 
           $carts[$index]->totalPrice=$carts[$index]->totalPrice+$rows[$i]->total;
       }
       $carts[$index]->sop=count($rows);

    }

    
 echo json_encode($carts);
}

 public function get_cart_details()
    {
    
       $rows=$this->model->get_details_by_cart_id($_POST["cartId"]);

      
       echo json_encode($rows);

    }

    
 

   

    

    public static function getGUID(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = chr(123)// "{"
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12)
                .chr(125);// "}"
            return $uuid;
        }
    }
    // public function getBenchmarks(){
    //     $data  = $this->model->get_all_benchmarks();
    //     echo json_encode($data);
    // }

    // public function delete(){
    //     $data  = $this->model->delete();
    //     echo json_encode($data);
    // }



  
}




?>