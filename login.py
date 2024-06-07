#!C:/python3111/python
print("Content-type: text/html")
print()

print("<html>")
print("<body style='background-color:#f6f5f7; text-align:center; padding: 40px; '>")
print("<script src='https://kit.fontawesome.com/03a09689fa.js' crossorigin='anonymous'></script>")
import cgi

form=cgi.FieldStorage()

username=form.getvalue("username")
password=form.getvalue("password")


import mysql.connector

conn=mysql.connector.connect(user='root', password='', host='localhost', database='youngor.db')
cursor=conn.cursor()

cursor.execute("SELECT * FROM user WHERE username= %s",(username,)) 

data = cursor.fetchall()

for row in data:

    if(row[0]==username and row[1]==password):
        print("<div style='border: 3px solid #df937a; border-radius: 10px; background-color: #f6f5f7; padding: 60px 60px; margin:100px auto; width: 500px;'>")
        print("<i class='fa-solid fa-heart' style='color: #df937a; font-size: 100px; margin: 10px auto;'></i>")
        print("<h3 style='font-family:Source Sans Pro; font-weight:600;'>Success.<br><br>You have successfully logged in!</h3>")
        print("<form action='index_user.html'>")
        print("<button type='submit' style='margin-top:20px; color:#ffffff; background-color:#ee8374; border-radius:10px; border: 2px solid #54567a; padding:10px 50px; font-weight:600; font-size:16px'>Back To Shopping!</a></button>")
        print("</form>")
        print("</div>")

    else:
        print("<div style='border: 3px solid #df937a; border-radius: 10px; background-color: white; padding: 60px 60px; margin:100px auto; width: 500px;'>")
        print("<i class='fa-solid fa-triangle-exclamation' style='color: #df937a; font-size: 100px; margin: 10px auto;'></i>")
        print("<h3 style='font-family:Source Sans Pro; font-weight:400;'>Sorry!<br><br>The username or password is wrong! Please try again.</h3>")
        print("<form action='login.html'>")
        print("<button type='submit' style='margin-top:20px; color:#ffffff; background-color:#ee8374; border-radius:10px; border: 2px solid #54567a; padding:10px 50px; font-weight:600; font-size:16px'>Retry</a></button>")
        print("</form>")
        print("</div>")

conn.commit()        
cursor.close()
conn.close()
print("</html>")
 