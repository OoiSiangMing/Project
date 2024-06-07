#!C:/python3111/python
print("Content-type: text/html")
print()

print("<html>")
print("<body style='background-color:floralwhite; text-align:center; padding: 40px; '>")
print("<script src='https://kit.fontawesome.com/03a09689fa.js' crossorigin='anonymous'></script>")
import cgi

form=cgi.FieldStorage()

adminID=form.getvalue("adminID")
password=form.getvalue("password")


import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
cursor=conn.cursor()

cursor.execute("SELECT * FROM admin WHERE adminID= %s",(adminID,)) 

data = cursor.fetchall()

for row in data:

    if(row[0]==adminID and row[1]==password):
        print("<div style='border: 3px solid #3cd061; border-radius: 10px; background-color: #f6f5f7; padding: 60px 60px; margin:100px auto; width: 500px;'>")
        print("<i class='fa-solid fa-heart' style='color: #7adf93; font-size: 100px; margin: 10px auto;'></i>")
        print("<h3 style='font-family:Source Sans Pro; font-weight:600;'>Yeah!<br><br>You have successfully logged in!</h3>")
        print("<form action='adminpage.html'>")
        print("<button type='submit' style='margin-top:20px; color:#ffffff; background-color:#67a29c; border-radius:10px; border: 2px solid #67a29c; padding:10px 50px; font-weight:600; font-size:16px'>GO TO MANAGE</a></button>")
        print("</form>")
        print("</div>")

    else:
        print("<div style='border: 3px solid #3cd061; border-radius: 10px; background-color: #f6f5f7; padding: 60px 60px; margin:100px auto; width: 500px;'>")
        print("<i class='fa-solid fa-triangle-exclamation' style='color: #7adf93; font-size: 100px; margin: 10px auto;'></i>")
        print("<h3 style='font-family:Source Sans Pro; font-weight:400;'>Sorry!<br><br>The adminID or password is wrong! Please try again.</h3>")
        print("<form action='adminlogin.html'>")
        print("<button type='submit' style='margin-top:20px; color:#ffffff; background-color:#67a29c; border-radius:10px; border: 2px solid #67a29c; padding:10px 50px; font-weight:600; font-size:16px'>GO LOGIN!</a></button>")
        print("</form>")
        print("</div>")

conn.commit()        
cursor.close()
conn.close()
print("</html>")
 