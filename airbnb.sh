
a=`curl --cookie-jar cookie.txt https://www.airbnb.com/login | grep  name=\"authenticity_token\" | head -1  | cut -c 278-348`

echo $a
