import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # This can cause issues, if DB is not set, , it has to be also URI
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')  # DB URI, but stored in .env