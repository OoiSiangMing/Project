#!C:/python3111/python
print("Content-type: text/html")
print()
print("<body style='background-color:powderblue;'>")

import cgi

form=cgi.FieldStorage()

productid=form.getvalue("productid")
productname=form.getvalue("productname")
productprice=form.getvalue("productprice")
productimage=form.getvalue("productimage")

print("Updating...")
print("<br>")
print("productid: ", productid)
print("<br>")
print("productname: ", productname)
print("<br>")
print("productprice: ", productprice)
print("<br>")
print("productimage: ", productimage)
 
print("<br>")
print("<br>")

import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
print(" -Database connected- ")
cursor=conn.cursor()
#cursor.execute('UPDATE Authors SET productname='+productname,'productprice='+productprice,'WHERE productid='+productid)
cursor.execute('DELETE FROM product WHERE productid= '+productid)
#cursor.execute('UPDATE Authors SET YearBorn='+YearBorn 'WHERE productid='+productid)
conn.commit()

cursor.execute('insert into product values(%s,%s,%s,%s)',(productid,productname,productprice,productimage))
conn.commit()

cursor.close()
conn.close()

print("<br>")
print("-Record has been updated- ")
print("<br>")
print("<a href='http://localhost/youngor/adminpage.html'> BackToMain ")
 
 
