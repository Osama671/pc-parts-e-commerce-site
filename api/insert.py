import mysql.connector
from dotenv import load_dotenv
from os import environ
import json

load_dotenv()

db = mysql.connector.connect(
    host=environ['DB_HOST'], user=environ['DB_USER'], password=environ['DB_PASSWORD'], database=environ['DB_NAME'])


with open('public/api/products.json', 'r') as file:
    # Load the JSON data from the file
    data = json.load(file)
    cursor = db.cursor()

    for product in data:
        cursor.execute(
            "INSERT INTO product (id, name, category, details) VALUES(%s, %s, %s, %s)", (product['id'], product['name'], product
                                                                                         ['category'], json.dumps(product)))
        print(f"Inserted product ID {product['id']}")
    db.commit()
