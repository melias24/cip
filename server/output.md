4096 128000


To fix the `fetchCompanyData` function, you need to ensure that you are using the correct database connections for the `Project_Table` and `Investment_Company` tables. If these tables are in different databases, you should use the appropriate database connection for each query.

Here's how you can modify the `fetchCompanyData` function to use the correct database connections:

1. Use `DatabaseService.getCompanyConnection()` for queries related to the `Investment_Company` table.
2. Use `DatabaseService.getProjectConnection()` for queries related to the `Project_Table` table.

Here's an example of how the function can be updated:

```typescript
export async function fetchCompanyData(
  investor: string,
): Promise<CompanyData | null> {
  // Use the company connection for the Investment_Company table
  const companyDb = DatabaseService.getCompanyConnection();
  if (!companyDb) {
    throw new Error("Company database connection not established");
  }

  const companySql = "SELECT * FROM Investment_Company WHERE Investor = ?";
  const company = await new Promise<Investment_Company | null>(
    (resolve, reject) => {
      companyDb.get(companySql, [investor], (err, row) => {
        if (err) reject(err);
        else resolve(row as Investment_Company | null);
      });
    },
  );

  if (!company) {
    return null;
  }

  // Use the project connection for the Project_Table table
  const projectDb = DatabaseService.getProjectConnection();
  if (!projectDb) {
    throw new Error("Project database connection not established");
  }

  const projectsSql = `
    SELECT Project.* 
    FROM Project_Table
    JOIN Invests_In ON Project.Project_id = Invests_In.Project_id
    WHERE Invests_In.Investor = ?
  `;
  const projects = await new Promise<Project[]>((resolve, reject) => {
    projectDb.all(projectsSql, [investor], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });

  const investsInSql = "SELECT * FROM Invests_In WHERE Investor = ?";
  const investsInData = await new Promise<Invests_In[]>((resolve, reject) => {
    projectDb.all(investsInSql, [investor], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Invests_In[]);
    });
  });

  return {
    Company: company,
    Projects: projects,
    Invests_In: investsInData[0] || null,
  };
}
```

In this updated function, we are using `companyDb` for the `Investment_Company` related query and `projectDb` for the `Project_Table` and `Invests_In` related queries. This ensures that each query is executed against the correct database.

