import math
import traceback
from flask import Flask, request, jsonify, abort, make_response
import mysql.connector
from dotenv import load_dotenv
from os import environ

import json
load_dotenv()

db = mysql.connector.connect(
    host=environ['DB_HOST'], user=environ['DB_USER'], password=environ['DB_PASSWORD'], database=environ['DB_NAME'])
app = Flask(__name__)

# example query
# example_cursor = db.cursor()
# example_cursor.execute('SELECT * FROM product')
# print(example_cursor.fetchall())


def get_user_id():
    if request.authorization == None or request.authorization.type != 'basic':
        abort(401)
    return request.authorization.get('username')


@app.route('/products/featured', methods=['GET'])
def get_featured_products():
    # Hardcoded. Replace with actual data from DB
    # select 4 random products from product table
    # return them as a list
    response = jsonify({
        "products": [
            {
                "id": 1,
                "name": "Amazon Basics USB Wired Computer Keyboard and Wired Mouse Bundle Pack",
                "price": 2599,
                "category": "accessories",
                "stock": 41,
                "description": "<ul><li><span> Low-profile keys provide a quiet, comfortable typing experience  </span></li>",
                "image": "https://m.media-amazon.com/images/I/71y-jMVFfTL._AC_SL1500_.jpg",
                "alt_images": [
                    "https://m.media-amazon.com/images/I/51o3dhWxLSL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/51P4u8QBpJL._AC_SL1367_.jpg",
                    "https://m.media-amazon.com/images/I/81zDsqaBwAL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/91K61OKfPkL._AC_SL1500_.jpg"
                ],
                "reviews": [
                    {
                        "username": "Maxime1",
                        "rating": 5,
                        "review": "If you are into basics, I don't think you can get a better deal than this."
                    }
                ]
            },
            {
                "id": 2,
                "name": "Wireless Keyboard and Mouse Combo",
                "price": 4299,
                "category": "accessories",
                "stock": 60,
                "description": "<ul><li><span> ?Ergonomic Wireless Keyboard and Mouse? JOYACCESS wireless keyboard and mouse combo designed ergonomic</li></ul>",
                "image": "https://m.media-amazon.com/images/I/71fH1bumcBL._AC_SL1500_.jpg",
                "alt_images": [
                    "https://m.media-amazon.com/images/I/71xCKnpg08L._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/71CYi3hoZKL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/61mpN2N5yeL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/712-hRbokcL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/71y-DSs04JL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/71zrUEKoX2L._AC_SL1500_.jpg"
                ],
                "reviews": [
                    {
                        "username": "Frieda.Krajcik72",
                        "rating": 4,
                        "review": "Super clavier!"
                    }
                ]
            }
        ]
    })

    response.status_code = 200
    return response

def get_products_query(search, category, offset):    
    main_query = "SELECT * FROM product WHERE 1=1"
    count_query = "SELECT COUNT(*) as count FROM product WHERE 1=1"

    params = []

    if search:
        main_query += " AND name LIKE %s"
        count_query += " AND name LIKE %s"
        params.append(f'%{search}%')      

    if category:
        main_query += " AND category = %s"
        count_query += " AND category = %s"
        params.append(category)
        
    main_query += " LIMIT 50 OFFSET %s"
    params.append(offset)
    
    return main_query, count_query, tuple(params)

@app.route('/products', methods=['GET'])
def get_products():
    args = request.args.to_dict()

    search = args.get("search")
    category = args.get("category")
    page = int(args.get('page', 1))

    # Calculate OFFSET value based on the page number
    offset = (page - 1) * 50

    main_query, count_query, params = get_products_query(search, category, offset)
    
    try:
        if(search != None):
            search = '%'+search+'%' 
        else:
            search = '%%' 
        cursor = db.cursor(dictionary=True)

        # Execute the main query to get product details
        cursor.execute('SELECT details FROM product WHERE 1=1 AND name LIKE %s AND category = %s LIMIT 50 OFFSET %s', [search, category, offset])
        products = cursor.fetchall()

        # Execute the count query to get the total number of products
        cursor.execute('SELECT COUNT(*) as count FROM product WHERE 1=1 AND name LIKE %s AND category = %s',[search, category])
        count_result = cursor.fetchone()

        #cursor.execute(main_query, params)
        #products = cursor.fetchall()

        # Execute the count query to get the total number of products
        #cursor.execute(count_query, params)
        #count_result = cursor.fetchone()

        total_count = count_result['count']

        # Calculate total pages
        total_pages = math.ceil(total_count / 50)

        # Parse details column as JSON
        for product in products:
            product['details'] = json.loads(product['details'])

        # Prepare the response JSON
        response = {
            "total_products": total_count,
            "total_pages": total_pages,
            "products": products
        }

        return jsonify(response)

    except Exception as e:
        traceback.print_exc()  # Print the full traceback
        print(f"Error executing query: {e}")
        return jsonify({"error": "Failed to retrieve products"}), 500

    finally:
        if cursor:
            cursor.close()

@app.route('/cart', methods=['GET'])
def get_cart():
    user_id = get_user_id()
    print(user_id)

    # Hardcoded. Replace with actual data from DB
    # use `user_id` above to SELECT from cart table. There can be 0 or more items. Return as a list
    response = jsonify({
        "cart": [
            {
                "product_id": 1,
                "quantity": 2
            },
            {
                "product_id": 2,
                "quantity": 1
            }
        ]
    })

    response.status_code = 200
    return response


@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    user_id = get_user_id()
    print(user_id)

    cart_item = request.get_json()
    print(cart_item['product_id'], cart_item['quantity'])

    # Hardcoded. Replace with actual data from DB
    # Use `user_id` and `product_id` and check if there is already an entry in cart table
    # if there is an entry, increase the quantity column by the `cart_item.quantity` value above
    # if there isn't an entry, INSERT a new row
    # after inserting, return all items in this user's cart (Same kind of query+response as /cart API above)
    response = jsonify({
        "cart": [
            {
                "product_id": 1,
                "quantity": 2
            },
            {
                "product_id": 2,
                "quantity": 1
            }
        ]
    })

    response.status_code = 200
    return response


@app.route('/cart/item/<cart_item_id>', methods=['DELETE'])
def delete_from_cart(cart_item_id):
    user_id = get_user_id()
    print(user_id)

    print(cart_item_id)

    # Hardcoded. Replace with actual data from DB
    # Use `cart_item_id` and delete from cart table where id = that
    # after deleting, return all items in this user's cart (Same kind of query+response as /cart API above)
    response = jsonify({
        "cart": [
            {
                "product_id": 1,
                "quantity": 2
            },
            {
                "product_id": 2,
                "quantity": 1
            }
        ]
    })

    response.status_code = 200
    return response


@app.route('/cart', methods=['DELETE'])
def clear_cart():
    user_id = get_user_id()
    print(user_id)

    # Hardcoded. Replace with actual data from DB
    # Use `user_id` and delete all rows in cart table where user_id = that
    # return this empty cart list
    response = jsonify({
        "cart": []
    })

    response.status_code = 200
    return response


@app.route('/cart/checkout', methods=['POST'])
def checkout():
    user_id = get_user_id()
    print(user_id)

    # Hardcoded. Replace with actual data from DB
    # Use `user_id` and find all items in the user's cart (WHERE user_id = )
    # generate a random order ID like this: AAAA111111 (4 random letters, 4 random number)
    # INSERT each cart item into into the order table along with this order ID
    # after inserting into order table, clear the user's cart. ie, DELETE everything in cart table where user_id = this user (similar to DELETE: /cart API above)
    # finally, return the random order id
    # if there were no items in the user's cart, set response.status_code = 400, and body: { message: "Cart is empty" }
    response = jsonify({
        "order_id": "ABCD123456"
    })

    response.status_code = 200
    return response


@app.route('/order/<order_id>', methods=['POST'])
def get_order(order_id):
    user_id = get_user_id()
    print(user_id)

    print(order_id)

    # Hardcoded. Replace with actual data from DB
    # find items in order table where id = order_id
    response = jsonify({
        "order": [
            {
                "product_id": 1,
                "quantity": 2
            },
            {
                "product_id": 2,
                "quantity": 1
            }
        ]
    })

    response.status_code = 200
    return response


@app.route('/')
def home():
    return 'Hello, Flask!'


if __name__ == '__main__':
    app.run(debug=True)
