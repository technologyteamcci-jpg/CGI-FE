import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { ClientUser, InternalUser, User } from "../types/p400";

async function getSelf({
  id,
  role,
}: {
  id: string;
  role: "client" | "internal";
}) {
  const client = await db.connect();

  if (role === "internal") {
    try {
      const _user = await client.query(`SELECT * FROM account WHERE id = $1`, [
        id,
      ]);
      const { password, permissions, ...user } = _user.rows[0];
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw new Error("Failed to fetch user.");
    }
  }

  try {
    const _user = await client.query(
      `SELECT a.*, c.client_id AS client_id 
      FROM account a 
      JOIN account_client c
        ON a.id = c.account_id
      WHERE id = $1`,
      [id],
    );
    const { password, permissions, ...user } = _user.rows[0];
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function getUserByEmail(email: string): Promise<User | undefined> {
  const client = await db.connect();

  try {
    const user = await client.query<ClientUser | InternalUser>(
      `SELECT * FROM account WHERE email=$1`,
      [email],
    );
    // console.log({ user: user.rows[0] });
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function createUser(user: Partial<InternalUser | ClientUser>) {
  const client = await db.connect();

  if (!user.password) {
    user.password = "password123";
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await client.query(
    `INSERT INTO account (first_name, last_name, time_zone, role, permissions, email, phone, password, created_at, updated_at, department, hubstaff_id, title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO NOTHING;`,
    [
      user.first_name,
      user.last_name,
      user.time_zone,
      user.role,
      user.permissions,
      user.email,
      user.phone,
      hashedPassword,
      new Date().toISOString(),
      new Date().toISOString(),
      "department" in user ? user.department : null,
      "hubstaff_id" in user ? user.hubstaff_id : null,
      "title" in user ? user.title : null,
    ],
  );
}

async function createClientUser(
  user: Partial<InternalUser | ClientUser> & { client_id: string },
) {
  const client = await db.connect();

  if (!user.password) {
    user.password = "password123";
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await client.query(
    `
    WITH inserted_account AS (
      INSERT INTO account (
        first_name, last_name, time_zone, role, permissions, email, phone, password, created_at, updated_at, department, hubstaff_id, title
      ) VALUES (
        $1, 
        $2, 
        $3, 
        $4, 
        $5,  
        $6,
        $7, 
        $8, 
        $9, 
        $10,  
        $11,
        $12, 
        $13
      )
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    )
    INSERT INTO account_client (account_id, client_id)
    SELECT id, $14
    FROM inserted_account;
`,
    [
      user.first_name,
      user.last_name,
      user.time_zone,
      user.role,
      user.permissions,
      user.email,
      user.phone,
      hashedPassword,
      new Date().toISOString(),
      new Date().toISOString(),
      "department" in user ? user.department : null,
      "hubstaff_id" in user ? user.hubstaff_id : null,
      "title" in user ? user.title : null,
      user.client_id,
    ],
  );
}

async function removeAccess(id: User["id"]) {
  const client = await db.connect();

  try {
    await client.query(`UPDATE account SET is_removed = true WHERE id = $1`, [
      id,
    ]);
    return new Response("User removed");
  } catch (e) {
    return new Error("Issue removing user");
  }
}

async function getInternalUsers() {
  const client = await db.connect();

  try {
    const users =
      await client.sql`SELECT id, first_name, last_name, email, phone, is_removed, is_verified, permissions FROM account WHERE role='internal' ORDER BY first_name`;
    return users.rows;
  } catch (error) {
    return error;
  }
}

async function getUsersByClientId({ clientId }: { clientId: string }) {
  const client = await db.connect();

  try {
    const users = await client.query(
      `SELECT 
            account.id, 
            account.first_name, 
            account.last_name, 
            account.email, 
            account.role,
            account.permissions,
            account.is_verified,
            account.is_removed
        FROM 
            account
        JOIN 
            account_client ON account.id = account_client.account_id
        WHERE 
            account_client.client_id = $1;`,
      [clientId],
    );
    return users.rows;
  } catch (error) {
    return error;
  }
}

async function getUsersByClientUserId({ id }: { id: string }) {
  const client = await db.connect();

  try {
    const users = await client.query(
      `SELECT 
          a.id, 
          a.first_name, 
          a.last_name, 
          a.email, 
          a.role,
          a.permissions,
          a.is_verified,
          a.is_removed
      FROM 
          account a
      JOIN 
          account_client ac1 ON a.id = ac1.account_id
      WHERE 
          ac1.client_id = (
              SELECT 
                  ac2.client_id 
              FROM 
                  account_client ac2 
              WHERE 
                  ac2.account_id = $1
          );`,
      [id],
    );
    return users.rows;
  } catch (error) {
    return error;
  }
}

async function updateProfile(_user: Partial<InternalUser | ClientUser>) {
  const client = await db.connect();
  const { id, ...user } = _user;
  const keys: string[] = [...Object.keys(user)];
  const values: any[] = [...Object.values(user), id];

  const query = `UPDATE account SET ${keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ")} WHERE id = $${values.length}`;

  try {
    await client.query(query, values);
    return new Response("User modified");
  } catch (error) {
    console.error({ error });
    return error;
  }
}

async function userHasModifyPrivileges({
  requesterId,
  modifyId,
}: {
  requesterId: string;
  modifyId: string;
}) {
  const client = await db.connect();

  try {
    const response = await client.query(
      `SELECT 
          COUNT(*) > 0 AS is_authorized
      FROM 
          account_client ac1
      JOIN 
          account_client ac2 ON ac1.client_id = ac2.client_id
      WHERE 
          ac1.account_id = $1  -- requesterId
          AND ac2.account_id = $2;  -- modifyId`,
      [requesterId, modifyId],
    );

    return response.rows[0]["is_authorized"];
  } catch (error) {
    console.error({ error });
    return error;
  }
}

export const user = {
  getSelf,
  getByEmail: getUserByEmail,
  getByClientId: getUsersByClientId,
  getByClientUserId: getUsersByClientUserId,
  getAllInternal: getInternalUsers,
  create: createUser,
  createByClientId: createClientUser,
  remove: removeAccess,
  update: updateProfile,
  hasModifyPrivileges: userHasModifyPrivileges,
};
