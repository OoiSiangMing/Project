#!C:/python3111/python
print("Content-type: text/html")
print()
print("<body style='background-color:powderblue;'>")

import cgi

form=cgi.FieldStorage()

productid=form.getvalue("productid")

print("Deleting... productid: ", productid)

 
print("<br>")
print("<br>")

import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
print(" -Database connected- ")
cursor=conn.cursor()
cursor.execute('DELETE FROM product WHERE productid= '+productid)
conn.commit()

cursor.close()
conn.close()

print("<br>")
print("-Record deleted successfully- ")
print("<br>")
print("<a href='http://localhost/youngor/adminpage.html'> BackToMain ")
 
 
