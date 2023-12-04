import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

interface UserInfoProps {
  userData: {
    name: string;
    emergency_contact: string;
    emergency_number: string;
    blood_type: string;
  };
}

const PDFFile: React.FC<UserInfoProps> = ({ userData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Información de Usuario</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre:</Text>
          <Text>{userData.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Contacto de emergencia:</Text>
          <Text>{userData.emergency_contact}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Número de emergencia:</Text>
          <Text>{userData.emergency_number}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Tipo de sangre:</Text>
          <Text>{userData.blood_type}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
