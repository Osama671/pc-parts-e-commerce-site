FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY public public
COPY api/ .

EXPOSE 8000

CMD ["sh", "-c", "python3 seed.py && gunicorn -w 4 -b 0.0.0.0:8000 app:app"]

