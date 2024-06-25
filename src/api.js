const API_URL = "https://koders-list-api.vercel.app"

export function getKoders () {
  return fetch(`${API_URL}/koders`)
  .then((response) => response.json())
  .then((data) => data.koders)
}

export function createKoder (koder) {
  return fetch (`${API_URL}/koders`, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: koder.firstName,
      lastName: koder.lastName,
      email: koder.email
    })

  })
}

export function deleteKoder (koderId) {
  return fetch (`${API_URL}/koders/${koderId}/delete`, {
    method: "POST",
  })
}



//!Fetch por defecto ocupa el metodo get
