import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Componente que representa el contenido del PDF
const MyDocument = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Información del seguro:</Text>
        <Text>Institución: {userData && userData.informacion && userData.informacion.datos_personales && userData.informacion.datos_personales.institucion}</Text>
        <Text>Número de afiliación: {userData && userData.informacion && userData.informacion.datos_personales && userData.informacion.datos_personales.nss}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
