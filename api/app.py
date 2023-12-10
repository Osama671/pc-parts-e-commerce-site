import math
import traceback
from flask import Flask, request, jsonify, abort, make_response
import mysql.connector
from dotenv import load_dotenv
from os import environ
import json

import json
load_dotenv()

db = mysql.connector.connect(
    host=environ['DB_HOST'], user=environ['DB_USER'], password=environ['DB_PASSWORD'], database=environ['DB_NAME'])
app = Flask(__name__)

# Stops flask.jsonify() from automatically sorting dictionaries.
app.json.sort_keys = False

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
    
    c_featuredProducts = db.cursor(dictionary=True)
    
    c_featuredProducts.execute('SELECT details FROM product ORDER  BY RAND() LIMIT 4')
    details_data = c_featuredProducts.fetchall()

    c_featuredProducts.close() 
    response_data = {"products": []}

    for index, details in enumerate(details_data, start=1):
        product_details = json.loads(details["details"]) if details["details"] else {}

        response_data["products"].append(product_details)

    response = jsonify(response_data)
    response.status_code = 200
    return response

def get_products_query(search, category, offset):    
    main_query = "SELECT * FROM product"
    count_query = "SELECT COUNT(*) as count FROM product"
    
    filters = []
    params = []

    if search:
        filters.append('name LIKE %s')
        params.append(f'%{search}%')

    if category:
        filters.append('category = %s')
        params.append(category)


    if len(filters) > 0:
        where_clause = " WHERE " + (" AND ".join(filters))
        main_query += where_clause
        count_query += where_clause
    
    main_query += f" LIMIT 50 OFFSET {offset}"
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
    
    cursor = db.cursor(dictionary=True)
    # Execute the main query to get product details
    cursor.execute(main_query, params)
    products = cursor.fetchall()

    # Execute the count query to get the total number of products
    cursor.execute(count_query, params)
    count_result = cursor.fetchone()

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
    cursor.close()
    return jsonify(response)
        
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
