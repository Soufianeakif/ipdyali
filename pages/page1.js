// pages/page1.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Linking, Clipboard } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

export default function Page1() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
        fetchIpDetails(response.data.ip);
      } catch (err) {
        setError('Failed to fetch IP address');
      }
    };

    fetchIp();
  }, []);

  const fetchIpDetails = async (ip) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch IP details');
    } finally {
      setLoading(false);
    }
  };

  const copyIpToClipboard = () => {
    Clipboard.setString(ip);
    Alert.alert('IP Copied', 'The IP address has been copied to the clipboard.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ipSection}>
        {loading && <ActivityIndicator size="large" color="#007BFF" />}
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        {data && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>IP Address: 
              <Text style={styles.ipText} onPress={copyIpToClipboard}>
                {` ${ip}`}
              </Text>
            </Text>
            <Text style={styles.detailText}>Country: {data.country}</Text>
            <Text style={styles.detailText}>Region: {data.regionName}</Text>
            <Text style={styles.detailText}>City: {data.city}</Text>
            <Text style={styles.detailText}>ISP: {data.isp}</Text>
            <Text style={styles.detailText}>Organization: {data.org}</Text>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: data.lat,
                longitude: data.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={{ latitude: data.lat, longitude: data.lon }} title="IP Location" />
            </MapView>
          </View>
        )}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed by{' '}
          <Text
            style={styles.footerLink}
            onPress={() => Linking.openURL('https://akifsoufiane.tech/')}
          >
            AKIF Soufiane
          </Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ipSection: {
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ipText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  map: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
