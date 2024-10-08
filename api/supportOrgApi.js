const databaseUrl = 'https://localhost:7067';

const getOrgs = async () => {
  const response = await fetch(`${databaseUrl}/supportorgs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

const createOrg = async (org) => {
  const response = await fetch(`${databaseUrl}/supportorgs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(org),
  });
  const data = await response.json();
  return data;
};

const updateOrg = async (org) => {
  const response = await fetch(`${databaseUrl}/supportorgs/${org.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(org),
  });
  const data = await response.json();
  return data;
};

const deleteOrg = async (orgId) => {
  const response = await fetch(`${databaseUrl}/supportorgs/${orgId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export {
  getOrgs, createOrg, updateOrg, deleteOrg,
};
