from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://omlhmtowldtibl:919fc007ae69e2972fc17e2af30dd011d279b9dc079a90ec8fc9eff9a24b6f2a@ec2-54-247-79-178.eu-west-1.compute.amazonaws.com:5432/d2ui6905hi4ksl'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from flaskblog import routes