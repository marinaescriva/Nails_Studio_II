import { Appointments } from "../pages/Appointments/Appointments";

const root = "http://localhost:4000/api/"

export const loginMe = async (credentials) => {


  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials),

  };



  try {

    const response = await fetch(`${root}auth/login`, options)
    const data = await response.json()


    if (!data.success) {
      throw new Error(data.message)
    }

    return data;

  } catch (error) {

    return error;
  }

}


export const registerMe = async (credentials) => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials),
  };

  try {
    // auth/register
    const response = await fetch(`${root}auth/register`, options)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data;
  } catch (error) {
    return error
  }

}

export const myProfile = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${root}users/profile`, options)

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data

  } catch (error) {
    return error
  }
}

export const updateProfile = async (token, newData) => {

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  }

  try {
    const response = await fetch(`${root}users/profile`, options)

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data.data

  } catch (error) {
    return error
  }
}


export const getStudioServices = async () => {


  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(`${root}services`, options)

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data

  } catch (error) {
    return error
  }

}

export const getAppointments = async (token) => {


  const options = await fetch(`${root}appointments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  
  return options.json();
}

export const createAppointment = async (token, appointmentsData) => {

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(appointmentsData)
};

try {
    const response = await fetch(`${root}appointments`, options);

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
} catch (error) {
  console.log(error.message)
    return error;
}
}

export const deleteAppointment = async (token, appointmentId)=>{
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({"appointmentId" : appointmentId})
  }

  try {
    const response = await fetch(`${root}appointments`, options)

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data

  } catch (error) {
    return error
  }

}

export const getUsers = async (token) => { {/*SUPERADMIN */}

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${root}users`, options)

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data

  } catch (error) {
    return error
  }
}

export const deleteUser = async (token) => {
  
}