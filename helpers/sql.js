const { BadRequestError } = require("../expressError");

// Helper function used to generate a SQL query string for partial update in the 
//database.
//It takes 2 objects (dataToUpdate, jsTosql), maps keys to SQL column names,
//and returns an object with 2 properties: setCols, values
//If no data is provided error is thrown.
//the resuts from setCols is passed to the update function (SET ${setCols})


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
