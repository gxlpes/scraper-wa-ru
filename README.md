# Scraper WhatsApp Bot

##Description
This application is a web scraper that retrieves content from a university restaurant website and sends the data to multiple WhatsApp groups. Currently, it is an MVP designed to deliver the necessary data as quickly as possible. The application is currently monolithic, but it can be refactored to a microservices architecture.

##Retrieving data
The project uses Cheerio to parse HTML data from two different websites. The parsed HTML is then processed and organized to be sent in a particular format as a string within the groups. Additionally, this treated data is used to send messages through WhatsApp.

##Organizing the parsed HTML
After parsing the correct HTML using the current date, the application organizes the returned HTML tags into a single string with the correct WhatsApp emojis (converted from images) and text formatting. The main objective of this process is to return the HTML for the given date.

##Sending messages
This app uses the BaileysAPI library to connect to my WhatsApp profile and send messages to assigned groups. The bot sends data to more than 4,000 people every weekday. The trigger to send messages is established via cronjobs within the Linux server, which starts the previously built Docker container.

##Hosting
The app is hosted on an Ubuntu Linux server physically located at my place. The entire application is started by a single Docker container built with necessary environment variables. Once again this container could be refactored to a multi-container system.

<b>Tech used</b>

<ul>
<li>TypeScript</li>
<li>BaileysAPI</li>
<li>Cheerio</li>
<li>Axios</li>
<li>Docker</li>
</ul>
