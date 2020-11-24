var helpers = require("./functions.ts");
class Game {
  static async DisplayAllRows(client) {
    try {
      await helpers.DisplayAllRows("Game", client);
    } catch (err) {
      console.log(err);
    }
  }
  static async AddRow(reader, client) {
    console.clear();
    console.log("----Add game option----");
    const dateInput = helpers.getDateInput(reader);
    if (dateInput.error) return;
    const gameTypeInput = helpers.getGameTypeInput(reader);

    if (gameTypeInput.error) return;

    await helpers.DisplayAllRows("Stadium", client);
    const stadiumId = reader.question("Enter id of Stadium\ninput:");
    if (!helpers.checkIntegerInput(stadiumId)) return;

    await helpers.DisplayAllRows("Score", client);
    const scoreId = reader.question("Enter id of Score\ninput:");
    if (!helpers.checkIntegerInput(scoreId)) return;

    const query = `INSERT INTO public."Game" ("Type","Date","StadionId","ScoreId") values ('${gameTypeInput.data}','${dateInput.data}','${stadiumId}','${scoreId}')`;
    try {
      const action = await client.query(query);
      console.log("Game has been successfully added");
    } catch (err) {
      if (err.detail) console.log(err.detail);
      else console.log("There was an error while adding Game");
    }
  }
  static async EditRow(reader, client) {
    console.clear();
    console.log("----Edit game option----");
    const dateInput = helpers.getDateInput(reader);
    if (dateInput.error) return;

    const gameTypeInput = helpers.getGameTypeInput(reader);
    if (gameTypeInput.error) return;

    await helpers.DisplayAllRows("Stadium", client);
    const stadiumId = reader.question("Enter id of Stadium\ninput:");
    if (!helpers.checkIntegerInput(stadiumId)) return;

    await helpers.DisplayAllRows("Score", client);
    const scoreId = reader.question("Enter id of Score\ninput:");
    if (!helpers.checkIntegerInput(scoreId)) return;

    await helpers.DisplayAllRows("Game", client);
    const editedId = reader.question(
      "Enter id of Game which you want to edit:\ninput:"
    );
    if (!helpers.checkIntegerInput(editedId)) return;

    const query = `UPDATE public."Game" SET "Type"='${gameTypeInput.data}', "Date"='${dateInput.data}', "StadionId"='${stadiumId}', "ScoreId"='${scoreId}' WHERE "GameId"='${editedId}'`;
    console.log(query);
    try {
      const action = await client.query(query);
      if (action.rowCount < 1) {
        console.log("Game with this id does not exist");
      } else {
        console.log("Game has been successfully edited");
      }
    } catch (err) {
      if (err.detail) {
        console.log(err.detail);
      } else {
        console.log("There was an error while editing Game");
      }
    }
  }
  static async DeleteRow(reader, client) {
    console.clear();
    console.log("----Delete game option----");
    const deleteId = await helpers.InputDelete(reader, client, "Game");
    const queryDeleteGame = `DELETE FROM public."Game"  WHERE "GameId"='${deleteId}'`;
    try {
      const actionDeleteGame = await client.query(queryDeleteGame);
      if (actionDeleteGame.rowCount < 1) {
        console.log("Game with this id does not exist");
      } else {
        console.log("Game has been successfully deleted");
      }
    } catch (err) {
      if (err.detail) {
        console.log(err.detail);
      } else {
        console.log("There was an error while deleting Game");
      }
    }
  }
}
module.exports = Game;
