4096 128000


```typescript
// Add to services.ts

export async function fetchCompanyDetails(companyName: string): Promise<Investment_Company | null> {
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Investment_Company WHERE Name = ?";
  const company = await new Promise<Investment_Company | null>((resolve, reject) => {
    db.get(sql, [companyName], (err, row) => {
      if (err) reject(err);
      else resolve(row as Investment_Company | null);
    });
  });
  return company;
}

// Add to handlers.ts

export async function HandleCompanyDetails(req: Request, res: Response) {
  const queryParams = req.query;
  const companyName = queryParams.name as string;
  if (!companyName) {
    return res.status(400).send("Company name parameter is required");
  }
  try {
    const companyDetails = await fetchCompanyDetails(companyName);
    if (companyDetails) {
      return res.json(companyDetails);
    } else {
      return res.status(404).send("Company not found");
    }
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}

// Add a new route to server.ts

app.get("/company/details", HandleCompanyDetails);
```

