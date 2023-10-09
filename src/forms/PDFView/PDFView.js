import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink, PDFViewer,
} from "@react-pdf/renderer";
const PDFView = () => {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    table: {
      display: 'table',
      width: 'auto',
      borderCollapse: 'collapse',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    cell: {
      flex: 1,
      padding: 6,
      fontSize: 12,
      borderLeftColor: '#000',
      textAlign: 'center',
    },
  });

  const MyDocument = () => {
    return (
        <Document>
          <Page size="A4" style={{paddingTop:40,paddingBottom:40}}>
            <View style={styles.container}>
              <Text style={styles.title}>List Des Plats</Text>
              <View style={styles.table}>
                <View style={styles.row}>

                  <Text style={styles.cell}>Nom</Text>
                  <Text style={styles.cell}>Pays</Text>
                  <Text style={styles.cell}>Recette</Text>
                </View>

                {data.map((item, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={styles.cell}>{item.nom}</Text>
                      <Text style={styles.cell}>{item.pays.nom}</Text>
                      <Text style={styles.cell}>{item.recettes}</Text>
                    </View>
                ))}

              </View>
            </View>
          </Page>
        </Document>
    );
  };

  const listP = () => {
    navigate('/');
  }
  return (
      <div>
        <PDFViewer style={{width:"100%",height:"900px"}}>
          <MyDocument  />
        </PDFViewer>
        <div className="container d-xl-flex justify-content-xl-center">
          <button className="btn btn-primary btn-sm" type="button" onClick={()=>listP()}>
            <i className="far fa-list-alt" />
            &nbsp;Liste des Plats
          </button>
        </div>

      </div>
  );
};

export default PDFView;
