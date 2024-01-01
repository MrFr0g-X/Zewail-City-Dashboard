from flask import Flask, jsonify, render_template,request
import sqlite3 as sql
import pandas as pd
from sqlalchemy import create_engine
from sqlite3 import Error

def create_connection (db_file):
    conn = None
    try:
        conn = sql.connect (db_file)
    except Error as e:
        print(e)
    return conn

db_url = 'sqlite:///university_database.db'
engine = create_engine(db_url, echo=True)
df = pd.read_sql( 'select * from university_database', engine)


df["index"] = df["index"].sort_values()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index2')
def index2():
    return render_template('index2.html')

@app.route('/get-pieChart')
def get_datachart():
    # Read data from the database
    dfn = pd.read_sql_query(
        "SELECT [Employee Department], COUNT(*) AS [Number of Employees] FROM university_database GROUP BY [Employee Department]; ",
        engine,
    )

    # Prepare data for the pie chart
    category = dfn["Employee Department"].tolist()
    values = dfn["Number of Employees"].tolist()
    data = [{"category": c, "value": int(v)} for c, v in zip(category, values)]

    # Return the data in JSON format
    return jsonify(data)

@app.route('/get-BarChart')
def get_datachart1t():
    dfn = pd.read_sql_query(
        "SELECT [Employee Department], COUNT(*) AS [Number of Employees] FROM university_database GROUP BY [Employee Department]; ",
        engine,
    )
    dfn = dfn.sort_values(by="Employee Department", ascending=False)

    category = dfn["Employee Department"]
    values = dfn["Number of Employees"]

    # Prepare data for AMCharts 5
    data = [{"country": c, "value": int(v)} for c, v in zip(category, values)]

    return jsonify(data)



@app.route('/get-studentsCount', methods=["POST"])
def get_datachart4():
    department = request.form.get("department")

    # Read data from the database
    if department:
        dfn = pd.read_sql_query(
            f"SELECT [Student Program], COUNT(*) AS [Number of Students] FROM university_database WHERE [Student Department] LIKE '%{department}%' GROUP BY [Student Program]; ",
            engine,
        )
    else:
        dfn = pd.read_sql_query(
            "SELECT [Student Program], COUNT(*) AS [Number of Students] FROM university_database GROUP BY [Student Program]; ",
            engine,
        )

    # Prepare data for the column chart
    category = dfn["Student Program"].tolist()
    values = dfn["Number of Students"].tolist()
    data = [{"country": c, "value": int(v)} for c, v in zip(category, values)]

    # Return the data in JSON format
    return jsonify(data)



@app.route('/get-studentsGPAbar', methods=["POST"])
def get_datachart7():
    department = request.form.get("department")

    # Read data from the database
    if department:
        dfn = pd.read_sql_query(
            f"SELECT [Student Department], [Student Program] as category, AVG(GPA) AS value FROM university_database WHERE [Student Department] LIKE '%{department}%' GROUP BY [Student Program];",
            engine,
        )
    else:
        dfn = pd.read_sql_query(
            "SELECT [Student Department] as category, AVG(GPA) AS value FROM university_database GROUP BY [Student Department]; ",
            engine,
        )

    # Prepare data for the column chart
    data = dfn.to_dict(orient="records")

    # Return the data in JSON format
    print(data)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

