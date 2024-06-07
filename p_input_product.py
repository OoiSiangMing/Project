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

print("productid: ", productid)
print("<br>")
print("productname: ",productname)
print("<br>")
print("productprice: ", productprice)
print("<br>")
print("productimage: ", productimage)
print("<br>")
print("...From form HTML and Python")
print("<br>")

import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
print(" -Database connected- ")
cursor=conn.cursor()
cursor.execute('insert into product values(%s,%s,%s,%s)',(productid,productname,productprice,productimage))
conn.commit()

cursor.close()
conn.close()

print("<br>")
print("-Record inserted successfully- ")
print("<br>")
print("<a href='http://localhost/youngor/adminpage.html'> BackToMain ")
 
 
