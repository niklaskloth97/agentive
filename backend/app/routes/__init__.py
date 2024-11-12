from app.routes.info import infoBP
from app.routes.users import userBP, loginBP, registrBP

def register_blueprints(app):
    app.register_blueprint(infoBP)
    app.register_blueprint(userBP)
    app.register_blueprint(loginBP)
    app.register_blueprint(registrBP)

