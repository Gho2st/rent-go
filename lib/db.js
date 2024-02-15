import { createPool } from "mysql2";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "rent&go",
  connectionLimit: 10, // Adjust as needed
};

const pool = createPool(dbConfig);

export default pool.promise();
