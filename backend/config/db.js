import mysql from "mysql2";

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true, // Ensures secure SSL connection
  },
});

// Connect to MySQL
conn.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database!");

  // Create 'users' table if it doesn't exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY
    );
  `;

  conn.query(createUsersTable, (err) => {
    if (err) {
      console.error("❌ Error creating users table:", err);
      return;
    }
    console.log("✅ Users table is ready!");
  });

  // Blood test tables
  const bloodTestTables = {
    complete_blood_count: `
      CREATE TABLE IF NOT EXISTS complete_blood_count (
        email VARCHAR(255) PRIMARY KEY,
        hemoglobin FLOAT,
        hematocrit FLOAT,
        rbc_count FLOAT,
        wbc_count FLOAT,
        platelet_count FLOAT,
        mcv FLOAT,
        mch FLOAT,
        mchc FLOAT,
        rdw FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    lipid_panel: `
      CREATE TABLE IF NOT EXISTS lipid_panel (
        email VARCHAR(255) PRIMARY KEY,
        total_cholesterol FLOAT,
        hdl FLOAT,
        ldl FLOAT,
        triglycerides FLOAT,
        vldl FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    liver_function: `
      CREATE TABLE IF NOT EXISTS liver_function (
        email VARCHAR(255) PRIMARY KEY,
        total_bilirubin FLOAT,
        direct_bilirubin FLOAT,
        indirect_bilirubin FLOAT,
        ast FLOAT,
        alt FLOAT,
        alp FLOAT,
        total_protein FLOAT,
        albumin FLOAT,
        globulin FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    kidney_function: `
      CREATE TABLE IF NOT EXISTS kidney_function (
        email VARCHAR(255) PRIMARY KEY,
        bun FLOAT,
        creatinine FLOAT,
        uric_acid FLOAT,
        sodium FLOAT,
        potassium FLOAT,
        chloride FLOAT,
        bicarbonate FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    blood_sugar: `
      CREATE TABLE IF NOT EXISTS blood_sugar (
        email VARCHAR(255) PRIMARY KEY,
        fasting_glucose FLOAT,
        postprandial_glucose FLOAT,
        random_glucose FLOAT,
        hba1c FLOAT,
        insulin FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    thyroid_function: `
      CREATE TABLE IF NOT EXISTS thyroid_function (
        email VARCHAR(255) PRIMARY KEY,
        tsh FLOAT,
        free_t3 FLOAT,
        free_t4 FLOAT,
        total_t3 FLOAT,
        total_t4 FLOAT,
        anti_tpo FLOAT,
        anti_tg FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    vitamin_levels: `
      CREATE TABLE IF NOT EXISTS vitamin_levels (
        email VARCHAR(255) PRIMARY KEY,
        vitamin_d FLOAT,
        vitamin_b12 FLOAT,
        iron FLOAT,
        tibc FLOAT,
        transferrin_sat FLOAT,
        ferritin FLOAT,
        magnesium FLOAT,
        phosphorus FLOAT,
        zinc FLOAT,
        copper FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    inflammatory_markers: `
      CREATE TABLE IF NOT EXISTS inflammatory_markers (
        email VARCHAR(255) PRIMARY KEY,
        crp FLOAT,
        hs_crp FLOAT,
        esr FLOAT,
        rf FLOAT,
        ana FLOAT,
        anti_ccp FLOAT,
        c3 FLOAT,
        c4 FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    coagulation_tests: `
      CREATE TABLE IF NOT EXISTS coagulation_tests (
        email VARCHAR(255) PRIMARY KEY,
        pt FLOAT,
        inr FLOAT,
        aptt FLOAT,
        d_dimer FLOAT,
        fibrinogen FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    cancer_markers: `
      CREATE TABLE IF NOT EXISTS cancer_markers (
        email VARCHAR(255) PRIMARY KEY,
        psa FLOAT,
        ca_125 FLOAT,
        ca_19_9 FLOAT,
        cea FLOAT,
        afp FLOAT,
        beta_hcg FLOAT,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    meal_plans: `
      CREATE TABLE IF NOT EXISTS meal_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        plan TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `,
    workout_plans: `
      CREATE TABLE IF NOT EXISTS workout_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        plan TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
      );
    `
  };

  // Create all tables
  Object.entries(bloodTestTables).forEach(([tableName, query]) => {
    conn.query(query, (err) => {
      if (err) {
        console.error(`❌ Error creating ${tableName} table:`, err);
      } else {
        console.log(`✅ ${tableName} table is ready!`);
      }
    });
  });

});
// Function to insert data into any table
const insertData = (tableName, data, callback) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).map(() => "?").join(", ");
  const values = Object.values(data);

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})
                 ON DUPLICATE KEY UPDATE ${Object.keys(data)
                   .map((key) => `${key} = VALUES(${key})`)
                   .join(", ")}`;

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error(`❌ Error inserting into ${tableName}:`, err);
      return callback(err);
    }
    console.log(`✅ Data inserted into ${tableName} successfully!`);
    callback(null, result);
  });
};
export { conn, insertData };
