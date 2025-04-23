// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// export const ADDscreen = () => {
//   const [states, setstates] = useState([]);
//   const [cities, setcities] = useState([]);
//   const [areas, setareas] = useState([]);
//   const getAllStates = async () => {
//     const res = await axios.get("/state/getallstates");
//     console.log(res.data);
//     setstates(res.data.data);
//   };

//   const getCityByStateId = async (id) => {
//     //api...
//     const res = await axios.get("city/getcitybystate/" + id);
//     console.log("city response...", res.data);
//     setcities(res.data.data);
//   };

//   const getAreaByCityId = async (id) => {
//     //alert(id)
//     const res = await axios.get("/area/getareabycity/" + id);
//     setareas(res.data.data);
//   };

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const { register, handleSubmit } = useForm();

//   const submitHandler = async (data) => {

//     const userId = localStorage.getItem("id")
//     data.userId = userId;
//     const res = await axios.post("",data)
//     console.log(res.data)

//   };
//   return (
//     <div style={{
//       textAlign: "center",
//       backgroundImage: "url('/path/to/car-image.jpg')",
//       backgroundSize: "cover",
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>
//       <div style={{
//         backgroundColor: "rgba(255, 255, 255, 0.9)",
//         padding: "30px",
//         borderRadius: "15px",
//         boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
//         width: "80%",
//         maxWidth: "1200px"
//       }}>
//         <h1 style={{ marginBottom: "20px", color: "#007BFF" }}>ADD DESTINATION</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div style={{ marginBottom: "15px" }}>
//             <label>Rate</label>
//             <input type="number" {...register("hourlyRate")} style={{
//               width: "100%",
//               padding: "10px",
//               margin: "5px 0",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}/>
//           </div>
//           <div style={{ marginBottom: "15px" }}>
//             <label>SELECT STATE</label>
//             <select {...register("stateId")} onChange={(event) => {
//               getCityByStateId(event.target.value);
//             }} style={{
//               width: "100%",
//               padding: "10px",
//               margin: "5px 0",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}>
//               <option>SELECT STATE</option>
//               {states?.map((state) => {
//                 return <option value={state._id}>{state.name}</option>;
//               })}
//             </select>
//           </div>
//           <div style={{ marginBottom: "15px" }}>
//             <label>SELECT CITY</label>
//             <select {...register("cityId")} onChange={(event) => {
//               getAreaByCityId(event.target.value);
//             }} style={{
//               width: "100%",
//               padding: "10px",
//               margin: "5px 0",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}>
//               <option>SELECT CITY</option>
//               {cities?.map((city) => {
//                 return <option value={city._id}>{city.name}</option>;
//               })}
//             </select>
//           </div>
//           <div style={{ marginBottom: "15px" }}>
//             <label>SELECT AREA</label>
//             <select {...register("areaId")} style={{
//               width: "100%",
//               padding: "10px",
//               margin: "5px 0",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}>
//               <option>SELECT AREA</option>
//               {areas?.map((area) => {
//                 return <option value={area._id}>{area.name}</option>;
//               })}
//             </select>
//           </div>
//           <div>
//             <input type="submit" style={{
//               padding: "10px 20px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor: "#007BFF",
//               color: "white",
//               cursor: "pointer",
//               width: "100%",
//               fontSize: "16px"
//             }}/>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
