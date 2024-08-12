import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { CameraView } from "expo-camera";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permission to access camera is required!");
        return;
      }

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert("Permission to access location is required!");
        return;
      }
    })();
  }, []);

  const generatePhotoId = (latitude, longitude, timestamp) => {
    return `${latitude.toFixed(6)}_${longitude.toFixed(6)}_${timestamp.getTime()}`;
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const currentLocation = await Location.getCurrentPositionAsync({});
      const timestamp = new Date();

      console.log("Photo URI:", photo.uri);
      console.log("Location:", currentLocation);
      console.log("Timestamp:", timestamp);

      const photoId = generatePhotoId(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        timestamp
      );

      try {
        await setDoc(doc(db, "photos", photoId), {
          id: photoId,
          uri: photo.uri,
          location: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          timestamp: timestamp.toISOString(),
        });
        Alert.alert("Photo information saved to database");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type="front" ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}> Snap </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
