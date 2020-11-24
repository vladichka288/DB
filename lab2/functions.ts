async function DisplayAllRows(tableName, client) {
  const queryGetAllRows = `SELECT * FROM public."${tableName}"`;
  const actionGetAllRows = await client.query(queryGetAllRows);
  console.log(actionGetAllRows.rows);
}
function checkIntegerInput(input) {
  if (!+input) {
    console.log("Навчіться вводити числа");
    return false;
  }
  return true;
}
async function InputCreateScore(reader, client) {
  let returnObject = { error: null, points: null, winnerId: null };
  const points = reader.question("Enter points:\ninput:");
  if (!checkIntegerInput(points)) {
    returnObject.error = "Invalid point input";
    return returnObject;
  }
  returnObject.points = +points;
  await DisplayAllRows("Team", client);
  const winnerId = reader.question("Enter Winner Id:\ninput:");
  if (!checkIntegerInput(winnerId)) {
    returnObject.error = "Invalid winnerId input";
    return returnObject;
  }
  returnObject.winnerId = +winnerId;
  return returnObject;
}
async function InputEditScore(reader, client) {
  let createObject = await InputCreateScore(reader, client);
  await DisplayAllRows("Score", client);
  const editedId = reader.question(
    "Enter id of Score which you want to edit:\ninput:"
  );
  if (!checkIntegerInput(editedId)) {
    createObject.error = "Invalid editedId input";
    return createObject;
  }
  let editObject = { ...createObject, editedId: editedId };
  return editObject;
}
async function InputDelete(reader, client, type) {
  await DisplayAllRows(`${type}`, client);
  const deletedId = reader.question(
    `Enter id of ${type} which you want to delete:\ninput:`
  );
  if (!checkIntegerInput(deletedId)) {
    return null;
  } else {
    return +deletedId;
  }
}

function InputCreateStadium(reader) {
  let returnObject = { error: null, name: null, location: null };
  const name = reader.question("Enter name:\ninput:");
  returnObject.name = name;
  const location = reader.question("Enter location:\ninput:");
  returnObject.location = location;
  return returnObject;
}
async function InputEditStadium(reader, client) {
  let inputData = InputCreateStadium(reader);
  await DisplayAllRows("Stadium", client);
  const editedId = reader.question(
    "Enter id of Stadium which you want to edit:\ninput:"
  );
  if (!checkIntegerInput(editedId)) {
    inputData.error = "Invalid editedId input";
    return inputData;
  }
  let editObject = { ...inputData, editedId: editedId };
  return editObject;
}
async function InputCreateMatch(reader, client) {
  let returnObject = { error: null, gameId: null, teamId: null };
  await DisplayAllRows("Game", client);
  const gameId = reader.question("Enter gameId:\ninput:");
  if (!checkIntegerInput(gameId)) {
    returnObject.error = "Invalid id input";
    return returnObject;
  }
  returnObject.gameId = gameId;
  await DisplayAllRows("Team", client);
  const teamId = reader.question("Enter location:\ninput:");
  if (!checkIntegerInput(teamId)) {
    returnObject.error = "Invalid id input";
    return returnObject;
  }
  returnObject.teamId = teamId;
  return returnObject;
}
function getDateInput(reader) {
  const year = reader.question("Enter year of game:\ninput:");
  const month = reader.question("Enter month of game:\ninput:");
  const day = reader.question("Enter day of game:\ninput:");
  const GameDateValidation = new Date(`${year}-${month}-${day}`);
  if (GameDateValidation.toString() == "Invalid Date") {
    console.log("Навчіться вводити дату !");
    return { data: "", error: "Invalid Date" };
  }
  const stringDate = `${year}-${month}-${day}`;
  return { data: stringDate, error: null };
}
function getGameTypeInput(reader) {
  const typeInput = reader.question(
    "Enter type of game:\n1 - Volleyball\n2 - Football\n3 - Basketball\ninput:"
  );
  let GameTypeInput = { data: null, error: null };
  switch (typeInput) {
    case "1": {
      GameTypeInput.data = "Volleyball";
      break;
    }
    case "2": {
      GameTypeInput.data = "Football";
      break;
    }
    case "3": {
      GameTypeInput.data = "Basketball";
      break;
    }
    default: {
      console.log("invalid input");
      GameTypeInput.error = "invalid input";
      break;
    }
  }
  return GameTypeInput;
}

module.exports.DisplayAllRows = DisplayAllRows;
module.exports.InputCreateScore = InputCreateScore;
module.exports.InputEditScore = InputEditScore;
module.exports.InputDelete = InputDelete;
module.exports.InputCreateStadium = InputCreateStadium;
module.exports.InputEditStadium = InputEditStadium;
module.exports.InputCreateMatch = InputCreateMatch;
module.exports.checkIntegerInput = checkIntegerInput;
module.exports.getDateInput = getDateInput;
module.exports.getGameTypeInput = getGameTypeInput;
