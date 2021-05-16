# CityCycles
CityCycles is a progressive web application which allows users to search for bike shelters in various cities around the world.

## What makes CityCycles possible?

Bike API:
https://developer.jcdecaux.com/#/home

Weather API:
https://www.apixu.com/

## How to run the project?

To run the project download the project using git or as a zip file. 
        
        Then run the following commands:
        - npm install
        - ng serve --open

## Development process.

### LocalStorage

To ensure that there is an element of data persistence CityCycles makes use of the browsers localStorage. However, this would not be possible without the use of angular services which enabled me to maintain a tidy and organised code base, but at the same time allowing me to fetch and request data in a swift and efficient  manner.

### Home Page

The home page is the first page the user will arrive at. Upon arrival the user will be greeted with a welcome message and a number of options which will enhance to users experience as they use the application.

<img src ="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Default%20HomePage.png"  width="200" style="max-width:100%; margin-left: auto; margin-right: auto; display: block;">
<img src ="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Search-HomePage%20With%20Search%20History.png"  width="200" style="max-width:100%; align= center;">

### Search Page / Home Page

Once the user has chosen  whether to enable GPS or Manual search then the search bar will be displayed. This allows the user to search by city name. Again with the use of localStorage the users search history is saved for later use if the user wants to quickly search for available bike shelters. By calling the bikeService the home page fetched and displays the data in the form of a list. However, given a list could have more than forty shelters I decided to limit the number of shelters to ten per list. I achieved this by using JavaScript's array slice method. For the recent search storage functionality I have allowed a maximum of four searches to be stored. I achieved this by using the array shift() method which allows me to remove the oldest search entry and insert the most recent search. 

<img src ="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Search-HomePage.png"  width="200" style="max-width:100%; align= center;">
<img src ="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Search-HomePage-With-Distance.png"  width="200" style="max-width:100%; align= center;">

### Shelter-details Page

Once the user chooses a shelter they will be redirected to the shelter details page. This page displays valuable information to the user.  

      Information which includes: 
        - Number of bikes available
        - Number of stands available
        - Percentage of bikes available
        - Percentage of stands available
        - Shelter status: OPEN or Closed
        - Distance from user
        - Temperature
        - Wind speed

With the use of Chart.js I displayed the percentage bikes and stands available in the form of doughnut  charts. This enables the user to quickly glance and fetch the required information especially if they are in a rush. I pass the shelter id and city name in the URL / Router module. This allows me to fetch the shelter data again and thus allowing me to pass latitude and longitude data to the weatherService which then calls the weather API to fetch the required data.

<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Shelter%20Details%20Page.png" width="200" style="max-width:100%; align= center;">

### Settings Page

The settings page allows the user to customise the application as they wish. This page is completely reliant on localStorage as the users preferences are stored there. This ensures that this data is persistent which allows the application check whether or not the data needs to be modified (Converting km/h to mph and temperature). This page makes use of css transitions, when the user clicks on the switch, if these animations where not implemented the movement would be much more sudden. Whenever the user changes a setting, it immediately takes effect.

<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Settings%20Page.png" width="200" style="max-width:100%; align= center;">

### Dashboard Page

The dashboard page allows the user to view their trip details provided they enable Geolocation and start the stop watch. 

    The main functionality in this page is as follows:
        - Speed
        - Average Speed
        - Distance traveled
        - Calories burned

The Geolocation API is used extensively within this page. However, this functionality would be most beneficial in a city where the location accuracy would much higher than in more rural areas. Since this component uses coordinates to determine the distance travelled the user must be moving to see this functionality work. I used the Haversine formula to calculate the distance between two coordinates, this formula is based on the earths circumference and uses it to calculate the distance. To ensure that the user can view their speed and distance travelled in their preferred unit of measurement I have developed functionality which converts km/h to mph. I calculated the calories burned based on the trip duration, the weight of an average adult which is 62kg and MET value of 4 which is the recommended value for cycling at 10 km/h or over. This is was the most exciting component to develop as it rewards you with interesting and useful information which could possibly be developed further in future releases.

<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Dashboard%20km%20per%20hour.png" width="200" style="max-width:100%; align= center;">
<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Dashboard%20mph.png" width="200" style="max-width:100%; align= center;">
<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Dashboard%20km%20per%20hour%20Stop%20Button.png" width="200" style="max-width:100%; align= center;">

### Favourites Page

The favourites page allows the user to save and quickly access their favourite bike shelters. The functionality in this page uses the localService to store and fetch data from LocalStorage. The user also has the ability to delete shelters from their favourites. This page encourages long term usage of CityCycles as it gives the user a reason to use the app time and time again. This is mainly due to its convenience when the user has very little time to check for shelters in their area. 

<img src="https://github.com/PadraigMontague/CityCycles/blob/main/ScreenShots/CityCycles%20Favourites%20Page.png" width="200" style="max-width:100%; align= center;">

### Changes Made After Receiving Feedback

        1.) Styling of buttons (Colour and font changes).
        2.) Colour of text on the shelter-details page.
        3.) Styling of bike shelter details list (Changed colours and increased font size).
        4.) Remove distance traveled when not been used (When user does not have GPS enabled).

