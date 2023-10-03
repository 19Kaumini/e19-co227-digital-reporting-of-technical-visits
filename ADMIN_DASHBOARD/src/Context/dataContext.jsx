import React, { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const [technicians, setTechnicians] = useState([]);
  const [clients, setClients] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("Warning: Data Fetching");
    const technicianCollectionRef = collection(db, "Technicians");

    const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
      const updatedTechnicians = [];
      snapshot.forEach((doc) => {
        updatedTechnicians.push({ ...doc.data(), id: doc.id });
      });
      setTechnicians(updatedTechnicians);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Warning: Data Fetching");
    const jobsCollectionRef = collection(db, "Tasks");

    const unsubscribe = onSnapshot(jobsCollectionRef, async (snapshot) => {
      console.log("Warning: Data Fetching");
      const updatedJobs = [];

      for (const docRef of snapshot.docs) {
        const jobData = docRef.data();
        var jobWithTechnician = jobData;
        if (jobData.email && jobData.technicianRef) {
          const technicianRef = jobData.technicianRef;
          console.log(jobData);

          const technicianDoc = await getDoc(technicianRef);

          if (technicianDoc.exists()) {
            const technicianName =
              technicianDoc.data().firstName +
              " " +
              technicianDoc.data().lastName;
            jobWithTechnician = {
              ...jobWithTechnician,
              technicianName,
            };
            console.log(technicianName);
          }
        }

        if (jobData.companyRef) {
          const companyRef = jobData.companyRef;
          const companyDoc = await getDoc(companyRef);
          const companyName = companyDoc.data().companyName;
          const companyAddress = companyDoc.data().address;

          jobWithTechnician = {
            ...jobWithTechnician,
            companyName,
            companyAddress,
          };

          updatedJobs.push(jobWithTechnician);
        }
      }

      setJobs(updatedJobs);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    console.log("Warning: Data Fetching");
    const clientCollectionRef = collection(db, "Clients");

    const unsubscribe = onSnapshot(clientCollectionRef, (snapshot) => {
      const updatedClients = [];
      snapshot.forEach((doc) => {
        updatedClients.push({ ...doc.data(), id: doc.id });
      });
      setClients(updatedClients);
    });

    return () => {
      unsubscribe();
    };
  }, []);

//   useEffect(() => {
//     // Fetch data from Firestore and update state
//     const fetchFirestoreData = async () => {
//       try {
//         // Fetch technicians
//         const techniciansRef = firestore.collection("technicians");
//         const techniciansSnapshot = await techniciansRef.get();
//         const technicianData = techniciansSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTechnicians(technicianData);

//         // Fetch clients
//         const clientsRef = firestore.collection("clients");
//         const clientsSnapshot = await clientsRef.get();
//         const clientData = clientsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setClients(clientData);

//         // Fetch jobs
//         const tasksRef = firestore.collection("jobs");
//         const tasksSnapshot = await tasksRef.get();
//         const taskData = tasksSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTasks(taskData);
//       } catch (error) {
//         console.error("Error fetching data from Firestore:", error);
//       }
//     };

//     fetchFirestoreData();
//   }, []);

  return (
    <DataContext.Provider value={{ technicians, clients, jobs }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };