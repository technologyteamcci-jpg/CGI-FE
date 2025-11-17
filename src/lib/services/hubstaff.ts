import { DateTime } from "luxon";
import { HubstaffMember, HubstaffUser } from "../types/hubstaff";
import { db } from "@vercel/postgres";

const DISCOVERY_URL =
  "https://account.hubstaff.com/.well-known/openid-configuration";
const API_BASE_URL = "https://api.hubstaff.com/";
const DEFAULT_REFRESH_TOKEN = process.env.HUBSTAFF_REFRESH_TOKEN;
const HUBSTAFF_ORGANIZATION_ID = 276879;

async function _getConfig() {
  if (hubstaffCache.get("token_endpoint")) {
    console.log("using cached endpoint");
    return hubstaffCache.get("token_endpoint");
  }
  return await fetch(DISCOVERY_URL)
    .then((res) => res.json())
    .then((data) => {
      hubstaffCache.set("token_endpoint", data.token_endpoint, 604800);
      return data.token_endpoint;
    });
}

async function _getAccessToken(token_endpoint: string) {
  if (hubstaffCache.get("access_token")) {
    console.log("using cached token");
    return hubstaffCache.get("access_token");
  }
  if (!hubstaffCache.get("refresh_token")) {
    hubstaffCache.set("refresh_token", DEFAULT_REFRESH_TOKEN, 86400);
  }
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", hubstaffCache.get("refresh_token")!);

  const request = new Request(token_endpoint, {
    method: "POST",
    body: params.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("fetching new token");
  return await fetch(request)
    .then((res) => res.json())
    .then((data) => {
      hubstaffCache.mset([
        {
          key: "access_token",
          val: data.access_token,
          ttl: data.expires_in,
        },
        {
          key: "refresh_token",
          val: data.refresh_token,
          ttl: 8640,
        },
      ]);
      return data.access_token;
    })
    .catch((e) => console.error(e));
}

async function getProjectById({ id }: { id: number }) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(`${API_BASE_URL}/v2/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
    .then((res) => res.json());
  // Only outputs projects where there is a matching client
  // .then((res) =>
  //   res.projects.filter((project) =>
  //     res.clients.find((client) =>
  //       client.project_ids.includes(project.id)
  //     )
  //   )
  // )
}

// async function _getAssignedProjects({ id }: { id: string }) {
//   return await _getConfig()
//     .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
//     .then((accessToken) =>
//       fetch(
//         `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/members?user_ids=${id}&include=projects&include_projects=true`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           keepalive: true,
//         }
//       )
//     )
//     .then((res) => res.json());
// }

async function getProjectList({
  skip,
  pageLimit = 10,
}: {
  skip: string | null;
  pageLimit: 10 | 20 | 30 | 40 | 50;
}) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/projects?page_limit=${pageLimit}&include=clients${
          skip ? `&page_start_id=${skip}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    .catch((error) => console.error(error));
  // Only outputs projects where there is a matching client
  // .then((res) =>
  //   res.projects.filter((project) =>
  //     res.clients.find((client) =>
  //       client.project_ids.includes(project.id)
  //     )
  //   )
  // )
}

async function getAllStaffByProjectId(projectId: string) {
  let memberIds: number[];

  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(`${API_BASE_URL}/v2/projects/${projectId}/members`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        keepalive: true,
      }),
    )
    .then((res) => res.json())
    // .then(/* Check that auth project id exists in projects array, otherwise throw 403 */)
    .then(({ members }: { members: HubstaffMember[] }) => {
      if (!members) {
        return [];
      }
      return (memberIds = members
        .filter((member) => member.membership_role === "user")
        .map((member) => member.user_id));
    })
    .then(() => _getConfig())
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) => {
      if (memberIds) {
        // console.log({ memberIds });
        return fetch(
          `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/members?include=users&include_profile=true&user_ids=${memberIds.join(
            ",",
          )}`,
          {
            keepalive: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      } else {
        // console.log("here");
        return new Response("{}");
      }
    })
    .then((res) => res.json())
    .then(
      ({
        users,
        members,
      }: {
        users: HubstaffUser[];
        members: HubstaffMember[];
      }) => {
        if (!members) {
          return [];
        }
        return members
          .filter((member) => member.membership_role === "user")
          .map((member) => {
            return {
              ...member,
              ...users.find((user) => user.id === member.user_id),
            };
          });
      },
    )
    .catch((error) => console.error(error));
}

async function getStaffByUserId({ id }: { id: string }) {
  const client = await db.connect();
  let projectId;

  try {
    const data = await client.query(
      `SELECT c.hubstaff_id FROM client c JOIN account_client ac ON c.id = ac.client_id WHERE ac.account_id = $1`,
      [id],
    );
    projectId =
      "hubstaff_id" in data.rows[0] ? data.rows[0]["hubstaff_id"] : undefined;
    if (!projectId) {
      return;
    }
  } catch (error) {
    return error;
  }

  return await getAllStaffByProjectId(projectId);
}

async function getStaffByHubstaffId(userId: string) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/members?include=users&include_profile=true&user_ids=${userId}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    // .then(/* Check that auth project id exists in projects array, otherwise throw 403 */)
    .then(
      ({
        users,
        members,
      }: {
        users: HubstaffUser[];
        members: HubstaffMember[];
      }) => {
        if (!users || !members) {
          return {};
        }
        return {
          ...members[0],
          ...users[0],
        };
      },
    )
    .catch((error) => console.error(error));
}

async function getActivitiesByUserId({ userIds }: { userIds: string }) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/activities?page_limit=500&time_slot[start]=${DateTime.now()
          .minus({ hours: 1 })
          .toISO()}&time_slot[stop]=${DateTime.now().toISO()}&user_ids=${userIds}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

async function getDailyActivitiesByUserId({ userIds }: { userIds: string }) {
  // const projectId = cache.get("projectId");
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) => {
      return fetch(
        `${API_BASE_URL}/v2/projects/1165021/activities/daily?page_limit=500&date[start]=${DateTime.now()
          .startOf("week")
          .minus({ weeks: 1 })
          .toISO()}&date[stop]=${DateTime.now()
          .startOf("week")
          .toISO()}&user_ids=${userIds}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    })
    .then((res) => res.json())
    // .then(/* Check that auth project id exists in projects array, otherwise throw 403 */)
    .catch((error) => console.error(error));
}

async function getPreviousWeekActivitiesByUserId({
  userIds,
}: {
  userIds: string;
}) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) => {
      return fetch(
        `${API_BASE_URL}/v2/projects/1165021/activities/daily?page_limit=500&date[start]=${DateTime.now()
          .startOf("week")
          .minus({ weeks: 1 })
          .toISO()}&date[stop]=${DateTime.now()
          .startOf("week")
          .toISO()}&user_ids=${userIds}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    })
    .then((res) => res.json())
    // .then(/* Check that auth project id exists in projects array, otherwise throw 403 */)
    .catch((error) => console.error(error));
}

async function getCurrentWeekActivitiesByUserId({
  userIds,
}: {
  userIds: string;
}) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) => {
      return fetch(
        `${API_BASE_URL}/v2/projects/1165021/activities/daily?page_limit=500&date[start]=${DateTime.now()
          .startOf("week")
          .toISO()}&date[stop]=${DateTime.now().toISO()}&user_ids=${userIds}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    })
    .then((res) => res.json())
    // .then(/* Check that auth project id exists in projects array, otherwise throw 403 */)
    .catch((error) => console.error(error));
}

async function getHolidays() {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/holidays?date[start]=${DateTime.now()}&date[stop]=${DateTime.now()
          .plus({ months: 1 })
          .toISO()}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

async function getScreenshotsByDayByUserId({
  userId,
  date,
}: {
  userId: string;
  date: DateTime;
}) {
  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/screenshots?page_limit=5&time_slot[start]=${date
          .startOf("day")
          .toISO()}&time_slot[stop]=${date
          .endOf("day")
          .toISO()}&user_ids=${userId}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

async function _getScreenshotPreviewsByDayByUserId({
  userId,
  date,
}: {
  userId: string;
  date: DateTime;
}) {
  console.log({
    url: `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/screenshots?page_limit=5&time_slot[start]=${date
      .startOf("day")
      .toISO()}&time_slot[stop]=${date
      .endOf("day")
      .toISO()}&user_ids=${userId}`,
  });

  return await _getConfig()
    .then((tokenEndpoint) => _getAccessToken(tokenEndpoint))
    .then((accessToken) =>
      fetch(
        `${API_BASE_URL}/v2/organizations/${HUBSTAFF_ORGANIZATION_ID}/screenshots?page_limit=5&time_slot[start]=${date
          .startOf("day")
          .toISO()}&time_slot[stop]=${date
          .endOf("day")
          .toISO()}&user_ids=${userId}`,
        {
          keepalive: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    )
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

async function getScreenshotPreviewsByWeekByUserId({
  userId,
  offset = 0,
}: {
  userId: string;
  offset?: number;
}) {
  const endDate = DateTime.now().minus({ weeks: offset });
  let res = [];
  for (let i = 0; i < 7; i++) {
    res.push({
      ...(await _getScreenshotPreviewsByDayByUserId({
        userId,
        date: endDate.minus({ days: i }),
      })),
      date: endDate.minus({ days: i }).toISO(),
    });
  }
  return res;
}

const activities = {
  getByUserId: getActivitiesByUserId,
  getDailyByUserId: getDailyActivitiesByUserId,
  getCurrentWeekByUserId: getCurrentWeekActivitiesByUserId,
  getPreviousWeekByUserId: getPreviousWeekActivitiesByUserId,
};

const holidays = {
  getNextMonth: getHolidays,
};

const project = {
  getById: getProjectById,
  getList: getProjectList,
};

const screenshots = {
  getByDayByUserId: getScreenshotsByDayByUserId,
  getWeekPreviewsByUserId: getScreenshotPreviewsByWeekByUserId,
};

const staff = {
  getByUserId: getStaffByUserId,
  getByHubstaffId: getStaffByHubstaffId,
  getByProjectId: getAllStaffByProjectId,
};

const timeOff = {
  // getUpcoming
};

export { activities, holidays, project, staff, screenshots, timeOff };
