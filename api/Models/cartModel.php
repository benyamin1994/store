<?php

require_once("Model.php");

class CartModel extends Model{


    public function get_cart_by_user_id($id){
        return $this->dbc->Select("SELECT * FROM cart where userId = " .$id . " AND deleteDate is null");

    }
    public function get_carts_by_user_id($id){
        return $this->dbc->Select("SELECT * FROM cart where userId = " .$id);
        
    }

    
    public function get_products_by_cart_id($cartId){
        $data=$this->dbc->Select("SELECT cartId,productId,amount,price,amount*price as total FROM store.products_cart left join products on products_cart.productId=products.id where cartId=$cartId");

        return $data;
    }
    public function get_details_by_cart_id($cartId){
        $data=$this->dbc->Select("SELECT products.name,amount,price,amount*price as total FROM store.products_cart left join products on products_cart.productId=products.id where cartId=$cartId");

        return $data;
    }

    public function insert_new_cart($userId){
        $q = "INSERT INTO cart (userId) VALUES (?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("i",$userId);
            $stmt->execute();
            return $stmt->insert_id;
    }

    public function save_to_cart($productId, $cartId, $amount){
        $q = "INSERT INTO products_cart (cartId, productId,amount) VALUES (? , ?, ?)";
        $stmt = $this->dbc->Prepare($q);
        $stmt->bind_param("iii",$cartId,$productId,$amount);
        $stmt->execute();
        return $stmt->insert_id;
    }
   

   }

    



?>