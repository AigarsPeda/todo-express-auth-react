export const updateImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const rawResponse = await fetch("http://localhost:8000/user/image", {
    method: "POST",
    headers: {
      Accept: "application/json",
      //"Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // "Content-Type": "application/jpeg",
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  console.log("nu?");

  const response: string = await rawResponse.json();
  return response;
};
