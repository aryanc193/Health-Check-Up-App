import {
  Account,
  Client,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.daddycoders.health_checkup",
  projectId: "669b6e560002eaa22804",
  storageId: "669b6ee7001db84df81f",
  databaseId: "669b6e8c0029b63281d8",
  userCollectionId: "669b6e92001fd3cfbeee",
  doctorsCollectionId: "66b3271500386e9506e4",
  appointmentCollectionId: "66b3722c003778b699cd",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    // Attempt to delete the current session
    await account.deleteSession("current"); // Ensure 'current' is the correct session ID if necessary
    console.log("User successfully signed out.");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out. Please try again.");
  }
};

export const getUniqueCities = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId
    );
    const cities = response.documents.map((doc) => doc.city);
    return [...new Set(cities)];
  } catch (error) {
    console.error("Error fetching cities: ", error);
    return [];
  }
};

export const getUniqueSpecialties = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId
    );
    const specialties = response.documents.map((doc) => doc.specialty);
    return [...new Set(specialties)];
  } catch (error) {
    console.error("Error fetching specialties: ", error);
    return [];
  }
};

export const getHighestRatedDoctors = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId,
      [Query.equal("rating", 5), Query.limit(5)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching highest-rated doctors: ", error);
    return [];
  }
};

export const getDoctorsByCityAndSpecialty = async (city, specialty) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId,
      [Query.search("city", city), Query.search("specialty", specialty)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching doctors: ", error);
    return [];
  }
};

export const searchDoctors = async (city, specialty) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId,
      [Query.equal("city", city), Query.equal("specialty", specialty)]
    );
    return result.documents;
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const doctor = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.doctorsCollectionId,
      id
    );
    return doctor;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error(error.message);
  }
};

export const bookAppointment = async (creator, doctorId, appointmentDate) => {
  try {
    const appointmentData = {
      date: appointmentDate.toISOString(),
      status: "Booked",
      creator: creator,
      doctorId: doctorId,
    };

    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      ID.unique(),
      appointmentData
    );

    return response;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error(error.message);
  }
};

export const getUserVisitedDoctors = async (userId) => {
  try {
    const appointmentsResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      [Query.equal("creator", userId)]
    );
    const appointments = appointmentsResponse.documents;

    const doctorsPromises = appointments.map(async (appointment) => {
      const doctorId = appointment.doctorId.$id;

      const doctor = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.doctorsCollectionId,
        doctorId
      );

      return {
        ...doctor,
        appointmentDate: appointment.date,
        appointmentStatus: appointment.status,
        appointmentId: appointment.$id,
      };
    });

    const doctors = await Promise.all(doctorsPromises);

    return doctors;
  } catch (error) {
    console.error("Error fetching visited doctors:", error);
    throw new Error(error.message);
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentCollectionId,
      appointmentId
    );
    return response;
  } catch (error) {
    console.error("Error canceling appointment:", error);
    throw new Error(error.message);
  }
};
