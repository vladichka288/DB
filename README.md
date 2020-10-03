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
![1](https://user-images.githubusercontent.com/47531496/94867753-7f042080-044a-11eb-8525-6672d14e6205.png)
![image](https://user-images.githubusercontent.com/47531496/94867790-90e5c380-044a-11eb-9d0f-e8a2b3be8530.png)
![image](https://user-images.githubusercontent.com/47531496/94867818-a0650c80-044a-11eb-9260-993be1807f04.png)
