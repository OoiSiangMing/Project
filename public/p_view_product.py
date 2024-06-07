#!C:/python3111/python
print("Content-type: text/html")
print()

print("<html>")
print("<body style='background-color: powderblue;'>")
print("<h1> View product </h1>") 

import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
#print("<h5> -Database connected- </h5>")
cursor=conn.cursor()

conn.commit()

cursor.execute('SELECT * FROM product')

data = cursor.fetchall()
print("<hr>")
print("<h4> productid | productname | productprice </h4>")
print("<hr>") 
a=1
for row in data:
    print (a,"&emsp;" , row[0],"&emsp;" , row[1], "&emsp;" ,row[2],"&emsp;&emsp;", "<br>")
    #a += 1
    photo1=row[3]
    print('<img src="',photo1,'" width="200" height="200">')
    print("<br> ")
    a += 1
print("<br>")
print("<i>Number of records :  </i>", a-1)
        
cursor.close()
conn.close()
print("<h3> -Records viewed successfully- </h3>")
print("<br>")
print("<a href='http://localhost/youngor/adminpage.html'> BackToMain ")