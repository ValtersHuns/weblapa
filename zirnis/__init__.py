from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://kfrmjpcoyjtxkd:45c4e2d8b895c591400082c699f56f994223eec20ff5c9a4d4e16f77fab08702@ec2-54-75-231-215.eu-west-1.compute.amazonaws.com:5432/dtafemdinvcro'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from zirnis import routes