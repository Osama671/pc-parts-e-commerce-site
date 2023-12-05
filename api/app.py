from flask import Flask, request, jsonify, abort, make_response
import mysql.connector
import json
from dotenv import load_dotenv
from os import environ
from flask_cors import CORS, cross_origin
import base64

load_dotenv()

db = mysql.connector.connect(
    host=environ['DB_HOST'], user=environ['DB_USER'], password=environ['DB_PASSWORD'], database=environ['DB_NAME'])
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# example query
# example_cursor = db.cursor()
# example_cursor.execute('SELECT * FROM product')
# print(example_cursor.fetchall())


def get_user_id():
    auth_header = request.headers.get('Authorization')
    auth_header = auth_header.split(" ")
    decoded_bytes = base64.b64decode(auth_header[1])
    decoded_string = decoded_bytes.decode('utf-8')
    if auth_header[0].lower() != 'basic':
        abort(401)
    return decoded_string


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


@app.route('/products', methods=['GET'])
@cross_origin()
def get_products():
    args = request.args.to_dict()

    search = args.get("search")
    category = args.get("category")
    page = args.get("page")

    # Could be `None` or could be some string
    print(search, category, page)

    # Hardcoded response. Replace with actual data from DB.
    # Use SQL query to select from DB using search, category and page variables above (check if each one has some value)
    # if `search` has some value, filter by product.name column
    # if `category` has some value, filter by product.category column
    # if `page` has some value, use LIMIT = 50, OFFSET = (page - 1). If `page` has no value, default to 1
    # "total_products" should be the total number of results after filtering (without LIMIT)
    response = jsonify({
        "total_products": 2,
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


@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):

    product_cursor = db.cursor()
    product_cursor.execute(
        'SELECT details FROM product WHERE id=%s', [product_id])

    product_data = product_cursor.fetchone()

    if product_data is None:
        response = make_response({"error": "Product not found"}, 404)
    else:
        response = make_response(json.loads(product_data[0]), 200)

    return response


@app.route('/cart', methods=['GET'])
@cross_origin()
def get_cart():
    user_id = get_user_id()
    print(user_id)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM cart WHERE user_id=%s', [user_id])
    result = cursor.fetchall()
    response = []
    for product in result:
        response.append({
            "product_id": product[2],
            "quantity": product[3],
        })
    return response



@app.route('/cart/add', methods=['POST'])
@cross_origin()
def add_to_cart():
    user_id = get_user_id()
    addCart = request.get_json()
    product_id = addCart['product_id']
    quantity = addCart['quantity']
    cursor = db.cursor()
    cursor.execute(
        'SELECT * FROM cart WHERE user_id=%s AND product_id=%s', (user_id, product_id))
    data = cursor.fetchone()
    if data is None:
        cursor.execute('INSERT INTO cart (`user_id`, `product_id`, `quantity`) VALUES (%s, %s, %s)', (user_id, product_id, quantity))
    else:
        new_quantity = int(quantity) + data[3]
        cursor.execute('UPDATE cart SET quantity = %s WHERE user_id=%s AND product_id=%s', (new_quantity, user_id, product_id))
    db.commit()
    
    cursor.execute('SELECT * FROM cart WHERE user_id=%s', [user_id])
    output = cursor.fetchall()
    result_list = []
    for row in output:
        result_dict = dict(zip(cursor.column_names, row))
        result_list.append(result_dict)
    response = jsonify({'cart' : result_list})
    response.status_code = 200


    response.status_code = 200
    return response

@app.route('/cart/setquantity', methods=['POST'])
@cross_origin()
def set_product_quantity():
    user_id = get_user_id()
    cart_item = request.get_json()
    quantity = cart_item['quantity']
    product_id = cart_item['product_id']
    cursor = db.cursor()
    cursor.execute('UPDATE cart SET quantity = %s WHERE user_id=%s AND product_id=%s', (quantity, user_id, product_id))
    db.commit()
    cursor.execute('SELECT * FROM cart WHERE user_id=%s', [user_id])
    output =  cursor.fetchall()
    result_list = []
    for row in output:
        result_dict = dict(zip(cursor.column_names, row))
        result_list.append(result_dict)
    response = jsonify({'cart' : result_list})
    response.status_code = 200
    
    return response


@app.route('/cart/item/<cart_item_id>', methods=['DELETE'])
@cross_origin()
def delete_from_cart(cart_item_id):
    user_id = get_user_id()
    cursor = db.cursor()
    cursor.execute('DELETE from cart WHERE user_id=%s AND product_id=%s', (user_id, cart_item_id))
    response = []
    db.commit()
    cursor.execute('SELECT * FROM cart WHERE user_id=%s', (user_id))
    output = cursor.fetchall()
    result_list = []
    for row in output:
        result_dict = dict(zip(cursor.column_names, row))
        result_list.append(result_dict)
    response = jsonify({'cart' : result_list})
    response.status_code = 200
    return response


@app.route('/cart', methods=['DELETE'])
@cross_origin()
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
