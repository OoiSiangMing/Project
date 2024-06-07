#!C:/python3111/python
print("Content-type: text/html")
print()

print("<html>")
print("<body style='background-color:powderblue;'>")
print("<h1> Searching by productid </h1>") 


import cgi

form=cgi.FieldStorage()

productid=form.getvalue("productid")

import mysql.connector
conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
print("<h5> -Database connected- </h5>")
cursor=conn.cursor()
 
print("Searching for the productid:"+productid)
cursor.execute('SELECT * FROM product WHERE productid='+productid)
#cursor.execute('SELECT * FROM Authors WHERE productprice="Nelson"')
#cursor.execute('SELECT * FROM Authors WHERE productprice= "%s"',productprice) 
#cursor.execute('DELETE FROM Authors WHERE productid= '+productid)
data = cursor.fetchall()
print("<hr>")
print("<h4> productid | productname | productprice   </h4>")
print("<hr>") 
a=1
for row in data:
    print (a,"&emsp;" , row[0],"&emsp;" , row[1], "&emsp;" ,row[2],"&emsp;&emsp;", "<br>")
    a += 1
photo1=row[3]
print('<img src="', photo1,'" width="250" height="250">')
print("Number of records :  ", a-1)
conn.commit()        
cursor.close()
conn.close()

print("<br>")
print("<h3> -End- </h3>")
print("<br>")
print("<a href='http://localhost/youngor/adminpage.html'> BackToMain ")
