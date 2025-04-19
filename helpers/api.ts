import { APIRequestContext } from "@playwright/test";


export async function createUser(request: APIRequestContext, newUser: { name: string, job: string }) {
  const response = await request.post('/api/users', {
    data: newUser,
  });

  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function singleUser(request:APIRequestContext, userId: number) {
  const response = await request.get(`api/users/${userId}`);
  return {
    status: response.status(),
    data: await response.json(),
  }; 
}
export async function listUsers(request: APIRequestContext) {
  const response = await request.get(`/api/users?page=2`);
  return {
    status: response.status(),
    data: await response.json(),
  }; // Returns list from the response
}

export async function updateUser(request: APIRequestContext, userId: number, updatedUser: { name: string, job: string }) {

  const response = await request.put(`api/users/${userId}`, {
    data: {name: updatedUser.name, job: updatedUser.job},
  });

  return {
    status: response.status(),
    data: await response.json(),
  }; 

}

export async function deleteUser(request: APIRequestContext, userId: number) {
  const response = await request.delete(`api/users/${userId}`);
  return {
    status: response.status(), 
  }; 
}
export async function singleUserNotFound(request:APIRequestContext, uri:string) {
  const response = await request.get(uri);
  return {
    status: response.status(),
    data: await response.json(),
  }; // Returns the single user from the response
}

export async function listResource(request: APIRequestContext,uri:string) {
  const response = await request.get(uri);
  return {
    status: response.status(),
    data: await response.json(),
  }; // Returns list from the response
}
// Helper function to update a user

export async function getResource(request: APIRequestContext, id: number) {
  const response = await request.get(`api/unknown/${id}`);
  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function register(request: APIRequestContext, user: { email: string, password: string }) {
  const response = await request.post('/api/register', {
    data: user,
  });

  return {
    status: response.status(),
    data: await response.json(),
  };
}


export async function unsuccessfulRegister(request: APIRequestContext, user: { email: string }) {
  const response = await request.post('/api/register', {
    data: user,
  });

  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function login(request: APIRequestContext, user: { email: string, password: string }) {
  const response = await request.post('/api/login', {
    data: user,
  });

  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function loginUnsuccessful(request: APIRequestContext, user: { email: string}) {
  const response = await request.post('/api/login', {
    data: user,
  });

  return {
    status: response.status(),
    data: await response.json(),
  };
}

export async function delayedResponse(request: APIRequestContext, page: number) {
  const response = await request.get(`/api/users?page=${page}`);
  return {
    status: response.status(),
    data: await response.json(),
  };
}