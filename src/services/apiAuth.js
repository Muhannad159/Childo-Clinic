export function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  let decodedToken = JSON.parse(jsonPayload);

  // Modify the specific claim
  decodedToken.name =
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ];

  decodedToken.id =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];

  decodedToken.role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  delete decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];

  return decodedToken;
}

export async function signup({
  firstName,
  lastName,
  userName,
  phoneNumber,
  email,
  password,
  passwordConfirm,
  role,
  setShowSuccess,
  setShowError,
}) {
  let requestBody;
  let response;
  if (role != "USER") {
    requestBody = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
      role: role,
    };
    response = await fetch("http://localhost:5023/api/v1/Staff/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } else {
    requestBody = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
    };
    response = await fetch("http://localhost:5023/api/v1/User/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  }
  if (!response.ok) {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
    // console.error("Failed to sign Up:", responseData.errors[0].message);
    throw new Error("Failed to sign Up");
  } else {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }
  console.log("res", response);
  const responseData = await response.json();
  console.log("data", responseData);

  return responseData;
}

export async function login({ email, password }) {
  try {
    const requestBody = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:5023/api/v1/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("res", response);
    const responseData = await response.json();
    console.log("data", responseData);
    const decodedToken = decodeJWT(responseData.token);
    console.log("decoded", decodedToken);
    // getCurrentUser("auth");
    if (!response.ok) {
      console.error("Failed to sign in:", responseData.errors[0].message);
      //  getCurrentUser("not-auth");
      throw new Error("Failed to sign in");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  // // decode token
  const storedToken = localStorage.getItem("token");

  const decodedData = decodeJWT(storedToken);
  console.log("decoded", decodedData);

  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Staff/${decodedData.id}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function Logout() {
  localStorage.removeItem("token");
}

export async function updateCurrentUser({
  firstNameForm,
  lastNameForm,
  phoneNumberForm,
  email,
  staffId,
}) {
  try {
    console.log("ph changed", phoneNumberForm);
    const response = await fetch(
      `http://localhost:5023/api/v1/Staff/${staffId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          firstName: firstNameForm,
          lastName: lastNameForm,
          phoneNumber: phoneNumberForm,
          email: email,
        }),
      }
    );
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data from update", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}
