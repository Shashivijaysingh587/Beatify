import smtplib

try:
    print("Connecting...")

    server = smtplib.SMTP("smtp.gmail.com", 587, timeout=10)

    print("Connected!")

    server.ehlo()

    server.starttls()

    print("TLS Started!")

    server.quit()

except Exception as e:
    import traceback
    traceback.print_exc()