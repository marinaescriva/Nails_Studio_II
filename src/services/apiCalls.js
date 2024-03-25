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
     
        // auth/login
        const response = await fetch(`${root}auth/login`, options)
        const data = await response.json()
      

        if(!data.success){
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
        throw new Error (data.message)
    }

    return data;
    } catch (error) {
        return error
    }

}

// export const myProfile = async (token) => {

//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//     }
  
//     try {
//       const response = await fetch(root + "users/profile", options)
  
//       const data = await response.json()
  
//       if (!data.success) {
//         throw new Error(data.message)
//       }
  
//       return data
  
//     } catch (error) {
//       return error
//     }
//   }