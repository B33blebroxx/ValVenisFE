const databaseUrl = 'https://localhost:7067';

const getAboutMe = async () => {
  const response = await fetch(`${databaseUrl}/aboutme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

const editAboutMe = async (aboutMe) => {
  const response = await fetch(`${databaseUrl}/aboutme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aboutMe),
  });
  const data = await response.json();
  return data;
};

export { getAboutMe, editAboutMe };
