from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Initialize extensions (no need to create DB locally)
db = SQLAlchemy()

def create_app():
    """Application factory function"""
    app = Flask(__name__)
    

    # if a database error comes up, the reason might be a missing .env file, see below

    # Load environment variables
    load_dotenv()

    # Load configurations, including cloud DB URI
    app.config.from_object('app.config.Config') # see also .env file for environment variables

    # Initialize the database, and connect it to a cloud database?
    with app.app_context():
        db.init_app(app)

    # Register Blueprints
    from app.routes import register_blueprints
    register_blueprints(app)

    return app
