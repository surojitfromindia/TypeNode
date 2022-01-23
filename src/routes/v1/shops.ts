//api route for shop infomation
import { Router} from "express";
import {getAllShops} from "../../controllers/v1/shops"

const router:Router =  Router({caseSensitive:true});



//verb : 'GET'
//visiability : 'public'
//path : '/v1/shops'
router.get("/",getAllShops);

export {router};