const reader = require("readline-sync");
var helpers = require("./functions.ts");
const GameViewController = require("./Games.ts");
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Games2",
  password: "1",
  port: 5432,
});
client.connect();
async function ui() {
  while (true) {
    let table = reader.question(
      "Select table :\n1 - Games\n2 - Match\n3 - Stadium\n4 - Score\n5 - Team\n6 - Special query\n7 - Exit\ninput:"
    );
    console.clear();
    switch (table) {
      case "1": {
        const operation = reader.question(
          "Select operation :\n1 - View all rows\n2 - Add row\n3 - Edit row\n4 - Delete row\n5 - Exit\ninput:"
        );
        switch (operation) {
          case "1": {
            await GameViewController.DisplayAllRows(client);
            break;
          }
          case "2": {
            await GameViewController.AddRow(reader, client);
            break;
          }
          case "3": {
            await GameViewController.EditRow(reader, client);
            break;
          }
          case "4": {
            await GameViewController.DeleteRow(reader, client);
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case "2": {
        console.clear();
        console.log("---- Match ----");
        const operation = reader.question(
          "Select operation :\n1 - View all rows\n2 - Add row\n3 - Edit row\n4 - Delete row\n5 - Exit\ninput:"
        );
        switch (operation) {
          case "1": {
            try {
              await helpers.DisplayAllRows("Match", client);
            } catch (err) {
              console.log(err);
            }
            break;
          }
          case "2": {
            let matchInput = await helpers.InputCreateMatch(reader, client);
            if (matchInput.error) {
              console.log("Invalid input");
              break;
            }
            let queryCreateMatch = `INSERT INTO public."Match" ("GameId","TeamId") values ('${matchInput.gameId}','${matchInput.teamId}')`;
            console.log(queryCreateMatch);
            try {
              const actionCreateMatch = await client.query(queryCreateMatch);
              console.log("Match has been successfully created");
            } catch (err) {
              console.log(err.detail);
            }
            break;
          }
          case "3": {
            console.clear();
            console.log("----Edit Match option----");
            let matchInput = await helpers.InputCreateMatch(reader, client);
            if (matchInput.error) {
              console.log("Invalid input");
              break;
            }
            await helpers.DisplayAllRows("Match", client);
            const editedId = reader.question(
              "enter id of match which you want to edit\n input:"
            );
            if (!helpers.checkIntegerInput(editedId)) {
              console.log("Invalid input id");
            } else {
              const queryUpdateById = `UPDATE public."Match" SET "GameId"='${matchInput.gameId}',"TeamId"='${matchInput.teamId}' WHERE "MatchId"='${editedId}'`;
              console.log(queryUpdateById);

              try {
                const actionUpdateById = await client.query(queryUpdateById);
                if (actionUpdateById.rowCount < 1) {
                  console.log("There was an error while updating match");
                  break;
                } else {
                  console.log("Match with this id has been updated");
                }
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "4": {
            console.clear();
            console.log("----Delete Stadium option----");
            const deleteId = await helpers.InputDelete(
              reader,
              client,
              "Stadium"
            );
            const queryDeleteStadium = `DELETE FROM public."Stadium"  WHERE "StadionId"='${deleteId}'`;
            try {
              const actionDeleteSStadium = await client.query(
                queryDeleteStadium
              );
              if (actionDeleteSStadium.rowCount < 1) {
                console.log("Stadium with this id does not exist");
                break;
              } else {
                console.log("Stadium has been successfully deleted");
              }
            } catch (err) {
              console.log(err.detail);
            }
          }
          default:
            break;
        }
        break;
      }
      case "3": {
        console.clear();
        console.log("---- Stadium ----");
        const operation = reader.question(
          "Select operation :\n1 - View all rows\n2 - Add row\n3 - Edit row\n4 - Delete row\n5 - Generate rows\n6 - Exit\ninput:"
        );
        switch (operation) {
          case "1": {
            try {
              await helpers.DisplayAllRows("Stadium", client);
            } catch (err) {
              console.log(err);
            }
            break;
          }
          case "2": {
            let stadiumInput = helpers.InputCreateStadium(reader);
            let queryCreateStadium = `INSERT INTO public."Stadium" ("StadionName","StadionLocation") values ('${stadiumInput.name}','${stadiumInput.location}')`;
            console.log(queryCreateStadium);
            try {
              const actionCreateStadium = await client.query(
                queryCreateStadium
              );
              console.log("Stadium has been  successfully created");
            } catch (err) {
              console.log(err.detail);
            }
            break;
          }
          case "3": {
            console.clear();
            console.log("----Edit Stadium option----");
            let editStadiumInput = await helpers.InputEditStadium(
              reader,
              client
            );
            if (editStadiumInput.error) {
              console.log(editStadiumInput.error);
              break;
            } else {
              let queryEditStadium = `UPDATE public."Stadium" SET "StadionName"='${editStadiumInput.name}', "StadionLocation"='${editStadiumInput.location}' WHERE "StadionId"='${editStadiumInput.editedId}'`;
              console.log(queryEditStadium);
              try {
                let actionEditStadium = await client.query(queryEditStadium);
                if (actionEditStadium.rowCount < 1) {
                  console.log("There was an error while updating stadium");
                  break;
                } else {
                  console.log("Stadium has been successfully edited");
                }
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "4": {
            console.clear();
            console.log("----Delete Stadium option----");
            const deleteId = await helpers.InputDelete(
              reader,
              client,
              "Stadium"
            );
            const queryDeleteStadium = `DELETE FROM public."Stadium"  WHERE "StadionId"='${deleteId}'`;
            try {
              const actionDeleteSStadium = await client.query(
                queryDeleteStadium
              );
              if (actionDeleteSStadium.rowCount < 1) {
                console.log("Stadium with this id does not exist");
                break;
              } else {
                console.log("Stadium has been successfully deleted");
              }
            } catch (err) {
              console.log(err.detail);
            }
          }
          case "5": {
            console.clear();
            console.log("----Generate Stadium option----");
            const count = reader.question(
              "Enter count of row you want to generate\ninput :"
            );
            if (!helpers.checkIntegerInput(count)) {
              console.log("Invalid count");
            } else {
              let queryGenereteStadium = `INSERT INTO public."Stadium" ("StadionName", "StadionLocation")
              select substr(characters, (random() * length(characters) + 1)::integer, 15),
              substr(characters, (random() * length(characters) + 1)::integer, 15)
              from (values('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')) as symbols(characters), generate_series(1, ${count});`;
              try {
                await client.query(queryGenereteStadium);
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          default:
            break;
        }
        break;
      }
      case "4": {
        console.clear();
        console.log("---- Score ----");
        const operation = reader.question(
          "Select operation :\n1 - View all rows\n2 - Add row\n3 - Edit row\n4 - Delete row\n5 - Exit\ninput:"
        );
        switch (operation) {
          case "1": {
            try {
              const result = await helpers.DisplayAllRows("Score", client);
            } catch (err) {
              console.log(err);
            }
            break;
          }
          case "2": {
            console.clear();
            console.log("----Add Score option----");
            const newScoreObject = await helpers.InputCreateScore(
              reader,
              client
            );
            if (newScoreObject.error) {
              console.log(newScoreObject.error);
              break;
            } else {
              const queryCreateTeam = `INSERT INTO public."Score" ("Winner","Points") values ('${newScoreObject.winnerId}','${newScoreObject.points}')`;
              try {
                const result = await client.query(queryCreateTeam);
                console.log("Score has been successfully created");
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "3": {
            console.clear();
            console.log("----Edit Score option----");
            const editScoreObject = await helpers.InputEditScore(
              reader,
              client
            );
            if (editScoreObject.error) {
              console.log(editScoreObject.error);
              break;
            } else {
              const queryCreateTeam = `UPDATE  public."Score" SET "Winner"='${editScoreObject.winnerId}',"Points"='${editScoreObject.points}' WHERE "ScoreId"='${editScoreObject.editedId}'`;
              try {
                const actionUpdateById = await client.query(queryCreateTeam);
                if (actionUpdateById.rowCount < 1) {
                  console.log("There was an error while updating team");
                  break;
                } else {
                  console.log("Score has been successfully edited");
                }
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "4": {
            console.clear();
            console.log("----Delete Score option----");
            const deleteId = await helpers.InputDelete(reader, client, "Score");
            const queryDeleteScore = `DELETE FROM public."Score"  WHERE "ScoreId"='${deleteId}'`;
            try {
              const actionDeleteScore = await client.query(queryDeleteScore);
              if (actionDeleteScore.rowCount < 1) {
                console.log("There was an error while deleting score");
                break;
              } else {
                console.log("Score has been successfully deleted");
              }
            } catch (err) {
              console.log(err.detail);
            }
            break;
          }
        }
        break;
      }

      case "5": {
        console.clear();
        console.log("---- Team ----");
        const operation = reader.question(
          "Select operation :\n1 - View all rows\n2 - Add row\n3 - Delete row\n4 - Edit row\n5 - Exit\ninput:"
        );
        switch (operation) {
          case "1": {
            const query = {
              text: 'SELECT * FROM public."Team"',
              values: [],
            };
            const action = await client.query(query);
            console.log(action.rows);
            break;
          }
          case "2": {
            {
              console.clear();
              console.log("----Add Team option----");
              const name = reader.question("Enter name of team:\ninput:");
              const country = reader.question("Enter country of game:\ninput:");
              const rating = reader.question("Enter rating of game:\ninput:");
              if (!+rating) {
                console.log("Навчіться вводити числа");
                break;
              }
              const queryCreateTeam = `INSERT INTO public."Team" ("Name","Country","Rating") values ('${name}','${country}','${rating}')`;
              try {
                const actionCreateTeam = await client.query(queryCreateTeam);
                console.log("Game has been successfully added");
              } catch (err) {
                console.log(err);
              }
              break;
            }
          }
          case "3": {
            console.clear();
            console.log("----Delete Team option----");
            const query = 'SELECT * FROM public."Team"';
            try {
              const action = await client.query(query);
              console.log(action.rows);
              const id = reader.question(
                "Enter id of Game which you want to delete\n input:"
              );
              const queryDeleteById = `DELETE FROM public."Team" WHERE "TeamId"='${id}'`;
              const actionDeleteById = await client.query(queryDeleteById);
              if (actionDeleteById.rows.length <= 0) {
                console.log("Team with this id does not exist");
                break;
              } else {
                console.log("Team with this id has been deleted");
              }
            } catch (err) {
              console.log(err.detail);
            }
            break;
          }
          case "4": {
            console.clear();
            console.log("----EDIT Team option----");
            const name = reader.question("Enter name of team:\ninput:");
            const country = reader.question("Enter country of game:\ninput:");
            const rating = reader.question("Enter rating of game:\ninput:");
            if (!+rating) {
              console.log("Навчіться вводити числа");
              break;
            }
            const query = 'SELECT * FROM public."Team"';
            try {
              const action = await client.query(query);
              console.log(action.rows);
              const id = reader.question(
                "Enter id of Game which you want to edit\n input:"
              );
              const queryUpdateById = `UPDATE public."Team" SET "Name"='${name}',"Country"='${country}',"Rating"='${rating}' WHERE "TeamId"='${id}'`;
              console.log(queryUpdateById);
              const actionUpdateById = await client.query(queryUpdateById);
              console.log(actionUpdateById);
              if (actionUpdateById.rowCount < 1) {
                console.log("There was an error while updating team");
                break;
              } else {
                console.log("Team with this id has been updated");
              }
            } catch (err) {
              console.log(err);
            }
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case "6": {
        console.clear();
        console.log("----Special option----");
        const input = reader.question(
          "1 - Special games\n2 - Special team\n3 - Special ..."
        );
        switch (input) {
          case "1": {
            const gameInput = reader.question(
              "Enter type of game:\n1 - Volleyball\n2 - Football\n3 - Basketball"
            );
            let gameType = "";
            switch (gameInput) {
              case "1": {
                gameType = "Volleyball";
                break;
              }
              case "2": {
                gameType = "Football";
                break;
              }
              case "3": {
                gameType = "Basketball";
                break;
              }
              default:
                break;
            }
            console.log(gameType);
            if (gameType != "") {
              const year = reader.question("Enter year of game:\ninput:");
              const month = reader.question("Enter month of game:\ninput:");
              const day = reader.question("Enter day of game:\ninput:");
              const GameDateValidation = new Date(`${year}-${month}-${day}`);
              if (GameDateValidation.toString() == "Invalid Date") {
                console.log("Навчіться вводити дату !");
                break;
              }
              const stringDate = `${year}-${month}-${day}`;
              await helpers.DisplayAllRows("Stadium", client);
              const name = reader.question("Enter stadium's name:\ninput:");
              let startQueryTime = new Date();
              const queryUpdateById = `SELECT "GameId","Type","Date","StadionName","Stadium"."StadionId"
              FROM public."Game" INNER JOIN public."Stadium"
              ON public."Game"."StadionId"=public."Stadium"."StadionId" AND "Type"='${gameType}' AND "Date">'${stringDate}' AND "StadionName"='${name}'`;
              //     console.log(queryUpdateById);
              try {
                let nowTime = new Date();
                let execTime = nowTime.getTime() - startQueryTime.getTime();
                const specialQuerry = await client.query(queryUpdateById);
                console.log(specialQuerry.rows);
                console.log(`\n exec time - ${Date.now() - execTime}ms`);
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "2": {
            const gameInput = reader.question(
              "Enter type of game:\n1 - Volleyball\n2 - Football\n3 - Basketball"
            );
            let gameType = "";
            switch (gameInput) {
              case "1": {
                gameType = "Volleyball";
                break;
              }
              case "2": {
                gameType = "Football";
                break;
              }
              case "3": {
                gameType = "Basketball";
                break;
              }
              default:
                break;
            }
            console.log(gameType);
            if (gameType != "") {
              const year = reader.question("Enter year of game:\ninput:");
              const month = reader.question("Enter month of game:\ninput:");
              const day = reader.question("Enter day of game:\ninput:");
              const GameDateValidation = new Date(`${year}-${month}-${day}`);
              if (GameDateValidation.toString() == "Invalid Date") {
                console.log("Навчіться вводити дату !");
                break;
              }
              const stringDate = `${year}-${month}-${day}`;
              await helpers.DisplayAllRows("Stadium", client);
              const name = reader.question("Enter stadium's name:\ninput:");
              let startQueryTime = new Date();

              const queryUpdateById = `
              SELECT "TeamId","Team"."Name","Type","Date","StadionName"
              FROM "Score" INNER JOIN "Team" 
              ON "Winner" = "Team"."TeamId" 
              INNER JOIN "Game" 
              ON "Score"."ScoreId" = "Game"."ScoreId"
              INNER JOIN public."Stadium"
              ON "Game"."StadionId"="Stadium"."StadionId" AND "Type"='${gameType}'
              AND "Date">'${stringDate}' AND "StadionName"='${name}'`;
              //     console.log(queryUpdateById);
              try {
                const specialQuerry = await client.query(queryUpdateById);
                let nowTime = new Date();

                let execTime = nowTime.getTime() - startQueryTime.getTime();
                console.log(specialQuerry.rows);
                console.log(`\n exec time - ${Date.now() - execTime}ms`);
              } catch (err) {
                console.log(err.detail);
              }
            }
            break;
          }
          case "3": {
            const gameInput = reader.question(
              "Enter type of game:\n1 - Volleyball\n2 - Football\n3 - Basketball"
            );
            let gameType = "";
            switch (gameInput) {
              case "1": {
                gameType = "Volleyball";
                break;
              }
              case "2": {
                gameType = "Football";
                break;
              }
              case "3": {
                gameType = "Basketball";
                break;
              }
              default:
                break;
            }
            console.log(gameType);
            if (gameType != "") {
              const year = reader.question("Enter year of game:\ninput:");
              const month = reader.question("Enter month of game:\ninput:");
              const day = reader.question("Enter day of game:\ninput:");
              const GameDateValidation = new Date(`${year}-${month}-${day}`);
              if (GameDateValidation.toString() == "Invalid Date") {
                console.log("Навчіться вводити дату !");
                break;
              }
              const stringDate = `${year}-${month}-${day}`;
              await helpers.DisplayAllRows("Stadium", client);
              const name = reader.question("Enter stadium's name:\ninput:");
              const points = reader.question("Enter minimum points :\ninput:");
              if (!helpers.checkIntegerInput(points)) {
              } else {
                console.log("HERE");
                let startQueryTime = new Date();
                const queryUpdateById = `SELECT "Score"."ScoreId","Type","Date","StadionName"
                FROM "Score" inner JOIN "Game" 
                ON "Score"."ScoreId" = "Game"."ScoreId" AND "Points">'${points}'
                INNER JOIN "Stadium" 
                ON "Game"."StadionId"="Stadium"."StadionId" AND "Type"='${gameType}'
                AND "Date">'${stringDate}' AND "StadionName"='${name}'`;
                console.log(queryUpdateById);
                try {
                  console.log("HERE2");
                  const specialQuerry = await client.query(queryUpdateById);
                  let nowTime = new Date();
                  console.log(queryUpdateById);
                  let execTime = nowTime.getTime() - startQueryTime.getTime();
                  console.log(specialQuerry.rows);
                  console.log(`\n exec time - ${Date.now() - execTime}ms`);
                } catch (err) {
                  console.log(err.detail);
                }
              }
            }
            break;
          }
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }
}
ui();
