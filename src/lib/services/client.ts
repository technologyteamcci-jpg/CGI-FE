import { db } from "@vercel/postgres";

async function getClientById({ id }: { id: string }) {
  const client = await db.connect();

  try {
    const clients = await client.query(
      `SELECT 
          c.id, 
          c.name, 
          c.created_at, 
          a.first_name AS csm_first_name, 
          a.last_name AS csm_last_name,
          pa.first_name AS pc_first_name, 
          pa.last_name AS pc_last_name
      FROM 
          client c
      LEFT JOIN 
          client_csm cc ON cc.client_id = c.id
      LEFT JOIN 
          account a ON a.id = cc.csm_id
      LEFT JOIN 
          client_practice_consultant cpc ON cpc.client_id = c.id
      LEFT JOIN 
         account pa ON pa.id = cpc.pc_id
      WHERE
          c.id = $1;`,
      [id],
    );
    return clients.rows[0];
  } catch (error) {
    return error;
  }
}

async function getAllClients({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  const client = await db.connect();
  search = search?.toLowerCase();
  if (!page || !search) {
    try {
      const clients = await client.sql`
      SELECT 
          c.*,
          csm.id AS csm_id,
          csm.first_name AS csm_first_name,
          csm.last_name AS csm_last_name,
          pc.id AS pc_id,
          pc.first_name AS pc_first_name,
          pc.last_name AS pc_last_name
      FROM 
          client c
      LEFT JOIN 
          client_csm cc ON cc.client_id = c.id
      LEFT JOIN 
          account csm ON csm.id = cc.csm_id
      LEFT JOIN 
          client_practice_consultant cpc ON cpc.client_id = c.id
      LEFT JOIN 
          account pc ON pc.id = cpc.pc_id
      ORDER BY 
        c.name ASC
      LIMIT 10`;
      return clients.rows;
    } catch (error) {
      return error;
    }
  }

  try {
    const clients = await client.query(
      `SELECT 
          c.*,
          csm.id AS csm_id,
          csm.first_name AS csm_first_name,
          csm.last_name AS csm_last_name,
          pc.id AS pc_id,
          pc.first_name AS pc_first_name,
          pc.last_name AS pc_last_name
      FROM 
          client c
      LEFT JOIN 
          client_csm cc ON cc.client_id = c.id
      LEFT JOIN 
          account csm ON csm.id = cc.csm_id
      LEFT JOIN 
          client_practice_consultant cpc ON cpc.client_id = c.id
      LEFT JOIN 
          account pc ON pc.id = cpc.pc_id
      WHERE 
          (LOWER(c.name) LIKE '%' || $1 || '%') 
      ORDER BY 
          c.name ASC
      LIMIT 10`,
      [search],
    );
    return clients.rows;
  } catch (error) {
    return error;
  }
}

async function getClientByUserId({
  userId,
  page,
  search,
}: {
  userId: string;
  page?: string;
  search?: string;
}) {
  const client = await db.connect();

  // @todo: Add matching on senior CSM
  try {
    const clients = await client.query(
      `SELECT 
          c.*,
          csm.id AS csm_id,
          csm.first_name AS csm_first_name,
          csm.last_name AS csm_last_name,
          pc.id AS pc_id,
          pc.first_name AS pc_first_name,
          pc.last_name AS pc_last_name
      FROM 
          client c
      LEFT JOIN 
          account_client ac ON ac.client_id = c.id
      WHERE 
          ac.id = $1`,
      [userId],
    );
    return clients.rows[0];
  } catch (error) {
    return error;
  }
}

async function getAllClientsByUserId({
  userId,
  page,
  search,
}: {
  userId: string;
  page?: string;
  search?: string;
}) {
  const client = await db.connect();

  if (!page || !search) {
    // @todo: Add matching on senior CSM
    try {
      const clients = await client.query(
        `SELECT 
            c.*,
            csm.id AS csm_id,
            csm.first_name AS csm_first_name,
            csm.last_name AS csm_last_name,
            pc.id AS pc_id,
            pc.first_name AS pc_first_name,
            pc.last_name AS pc_last_name
        FROM 
            client c
        LEFT JOIN 
            client_csm cc ON cc.client_id = c.id
        LEFT JOIN 
            account csm ON csm.id = cc.csm_id
        LEFT JOIN 
            client_practice_consultant cpc ON cpc.client_id = c.id
        LEFT JOIN 
            account pc ON pc.id = cpc.pc_id
        INNER JOIN 
            csm_senior sc ON sc.csm_id = cc.csm_id
        WHERE 
            (cc.csm_id = $1 OR pc.id = $1 OR sc.senior_csm_id = $1)
        LIMIT 10`,
        [userId],
      );
      return clients.rows;
    } catch (error) {
      return error;
    }
  }

  try {
    const clients = await client.query(
      `SELECT 
          c.*,
          csm.id AS csm_id,
          csm.first_name AS csm_first_name,
          csm.last_name AS csm_last_name,
          pc.id AS pc_id,
          pc.first_name AS pc_first_name,
          pc.last_name AS pc_last_name
      FROM 
          client c
      LEFT JOIN 
          client_csm cc ON cc.client_id = c.id
      LEFT JOIN 
          account csm ON csm.id = cc.csm_id
      LEFT JOIN 
          client_practice_consultant cpc ON cpc.client_id = c.id
      LEFT JOIN 
          account pc ON pc.id = cpc.pc_id
      WHERE 
          (cc.csm_id = $1
            AND
          LOWER(c.name) LIKE '%' || $2 || '%') 
      LIMIT 10`,
      [userId, search.toLowerCase()],
    );
    return clients.rows;
  } catch (error) {
    return error;
  }
}

export const client = {
  getAll: getAllClients,
  getByUserId: getClientByUserId,
  getAllByUserId: getAllClientsByUserId,
  getById: getClientById,
};
