from fastapi import APIRouter,Query, HTTPException, Depends,FastAPI, UploadFile, File
import boto3
import uuid
from .keys import ACCESS_KEY_ID,SECRET_ACCESS_KEY
from models.user import cart,updatecart
from decimal import Decimal
import uuid
from boto3.dynamodb.conditions import Attr

router = APIRouter() 

dynamodb = boto3.resource('dynamodb',
                    aws_access_key_id = ACCESS_KEY_ID,
                    aws_secret_access_key = SECRET_ACCESS_KEY,
                    region_name='ap-south-1'
                          )




@router.get("/getAllRestaurants")
def get_all_restaurants(category: str = Query(None, description="Category to filter restaurants")):
    table = dynamodb.Table('restaurants')
    
    response = table.scan()
    items = response.get("Items", [])
    
    if category:
        category_lower = category.lower()
        filtered_items = [
            item for item in items
            if any(cat.lower() == category_lower for cat in item.get("type", []))
        ]
        return filtered_items
    
    return items


@router.post("/createRestaurant")
async def submitdata(data:dict):
    table = dynamodb.Table('restaurants')
    
    item = {
       'restaurant_id': str(uuid.uuid4()),
        'name': data['name'],
    }
    table.put_item(Item = item)
    return "data submitted successfully"


@router.get("/getRestaurant/{restaurant_id}")
async def get_restaurant(restaurant_id: str):
    table = dynamodb.Table('restaurants')
    
    try:
        response = table.get_item(Key={'restaurant_id': restaurant_id})
        item = response.get('Item')
        
        if item:
            return {"restaurant":item}
        else:
            raise HTTPException(status_code=404, detail="Restaurant not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.get("/getCartDetails/{username}")
async def get_cart(username: str):
    table = dynamodb.Table('cart')
    
    try:
        response = table.get_item(Key={'username': username})
        cart = response.get('Item')
        
        if cart:
            return {"cart":cart}
        else:
            raise HTTPException(status_code=404, detail="Cart not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  
    
    
@router.get('/get_presigned_url')
async def generate_presigned_url(key):
    # key="ovenstory.png"
    s3_client = boto3.client('s3')
    presigned_url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': "fullstackapp", 'Key':key})

    return presigned_url



@router.post("/addToCart")
async def submitdata(testItem:cart):
    table = dynamodb.Table('cart')
    
    item = testItem.dict()
        
    item['billdetails']["gst"]=Decimal(str(item['billdetails']["gst"])) 
    
    table.put_item(Item = item)
    return "data submitted successfully"    


@router.put("/cart/{username}")
async def update_item(username:str,cartitem:updatecart):
    table = dynamodb.Table('cart')
    response = table.update_item(
        Key={'username': username},
        UpdateExpression="SET items_count = :items_count,  billdetails = :billdetails,#items = :items,branch=:branch,restaurant_id=:restaurant_id,restaurant_name=:restaurant_name",
          ExpressionAttributeNames={
            '#items': 'items'  # since 'items' is a reserved keyword 
        },
        ExpressionAttributeValues={
            ':items_count': cartitem.items_count,
            ':items': list(filter(lambda item: item['count'] != 0, cartitem.items)),  #removes the items with count=0
            ':billdetails': cartitem.billdetails,
            ':branch': cartitem.branch,
            ':restaurant_id': cartitem.restaurant_id,
            ':restaurant_name': cartitem.restaurant_name


        },
        ReturnValues="UPDATED_NEW"  
    )
    return {"message": "Item updated successfully", "updated_attributes": response['Attributes']}


@router.get("/getOrder/{orderid}")
async def get_cart(orderid: str):
    table = dynamodb.Table('orders')
    
    try:
        response = table.get_item(Key={'order_id': orderid})
        order = response.get('Item')
        
        if cart:
            return {"order":order}
        else:
            raise HTTPException(status_code=404, detail="Order not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 


@router.get("/getAllOrders")
def get_all_orders(page: int = Query(1, ge=1), count: int = Query(10, ge=1)):
    table = dynamodb.Table('orders')
    total_items_response = table.scan(Select='COUNT')
    total_items = total_items_response['Count']

    limit = count
    start_key = None
    
    for _ in range(page - 1):
        response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
        start_key = response.get('LastEvaluatedKey')
        if not start_key:
            return {"orders": []}
    
    response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
    
    return {
        "count":total_items,
        "orders": response["Items"]
        
    }   


