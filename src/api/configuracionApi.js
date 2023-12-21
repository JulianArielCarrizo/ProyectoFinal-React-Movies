const API = "https://api.themoviedb.org/3";

export function obtener (path) {
   return fetch(API + path, {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIyNmI5ZDIxNjY0YWQyM2ViYmViOTZlZDAzMDQ5YyIsInN1YiI6IjY1NjVmMGUyYTM0OTExMDBlMWNhMWYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1v82O0x9SoopHoAgJKGqxriWyXPOCZUbvIpgyzqMoRQ",
     "Content-Type" : "application/json;charset=utf-8",
    }, 
  })
  .then((result) => result.json());
}
