import React from 'react'
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { string } from 'prop-types'
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 32,
  },
  heading: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  para: {
    fontSize: 14
  }
});

const UserContractAgreement = ({agreement, title}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.heading}>Homitag {title}</Text>
        <Text style={styles.para}>{agreement}</Text>
      </View>
    </Page>
  </Document>
)
UserContractAgreement.propTypes = {
  agreement: string,
  title: string
}

export default UserContractAgreement;
