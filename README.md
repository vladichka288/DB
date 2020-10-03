# База даних спортивних змагань
**Лабораторна робота 1**

**студент групи КП-83 Бойчук Владислав**

## Сутності:
* Stadium: 
    * StadiumID (Primary Key)
    * GameID (Foreign Key)
    * Name 
    * Location
* Game 
    * GameID (Primary Key)
    * Date
    * Type
    * ScoreId
* Match 
    * MatchID (Primary Key)
    * GameId (Foreign Key)
    * TeamId (Foreign Key)
* Team 
    * TeamID (Primary Key)
    * Name
    * Country
    * Rating
* Score 
    * ScoreID (Primary Key)
    * Score 
    * Winner (Foreign Key)
    
## Зв'язки:
* Many To Many: між Game та Team за допомогою таблиці Match
* One to Many: між Stadium та Game, Airport та Flight
* One to 0ne: між Score та Team, Game та Score
   
## ER Diagram
![1](https://github.com/vladichka288/Games/blob/main/Untitled%20Diagram.png)

## DB Structure
![1](https://github.com/vladichka288/Games/blob/main/Untitled%20Diagram%20(2).png)

## PG4 Screenshots
![1](https://github.com/vladichka288/Games/blob/main/Game.jpg)
![1](https://github.com/vladichka288/Games/blob/main/Team.jpg)
![1](https://github.com/vladichka288/Games/blob/main/Match.jpg)
![1](https://github.com/vladichka288/Games/blob/main/Score.jpg)
![1](https://github.com/vladichka288/Games/blob/main/Stadium.jpg)
