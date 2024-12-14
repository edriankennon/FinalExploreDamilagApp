import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Tricab = ({ route }) => {
  const navigation = useNavigation();
  const { place } = route.params; // Access the passed data
  const [showFullText, setShowFullText] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  // Array of images
  const images = [
    require('../../assets/Alae.png'),
    require('../../assets/Court.png'),
  ];

  // Function to open the modal with the selected image
  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/multicab.png')} style={styles.mainImage} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.subtitle}>{place.location}</Text>
        <View style={styles.divider} />
      </View>

      {/* Overview Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>
            {showFullText
              ? "A multicab is a small, lightweight vehicle with a seating capacity of around 11–13 people, commonly found in the Philippines. Multicabs are often used for transportation in urban areas, such as Metro Manila, Metro Cebu, and Metro Davao. They are known for being able to navigate narrow streets, and are generally more comfortable and quieter than jeepneys."
              : "A multicab is a small, lightweight vehicle with a seating capacity of around 11–13 people, commonly found in the Philippines..."}
          </Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={toggleReadMore}>
            <Text style={styles.readMoreText}>{showFullText ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>
        </View>

         {/* Guidelines Section */}
         <View style={styles.guidelinesTitleContainer}>
          <Text style={styles.guidelinesTitle}>Fare</Text>
        </View>
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <Text style={styles.routeText}>Alae → Barangay Hall</Text>
            <Text style={styles.fareText}>PHP 15.00</Text>
          </View>
          <View style={styles.routeRow}>
            <Text style={styles.routeText}>Barangay Hall → Camp Phillips</Text>
            <Text style={styles.fareText}>PHP 20.00</Text>
          </View>
          <View style={styles.routeRow}>
            <Text style={styles.routeText}>Full Route (end-to-end)</Text>
            <Text style={styles.fareText}>PHP 35.00</Text>
          </View>
        </View>

        {/* Swipeable Images Section */}
        <View style={styles.swipeableImagesContainer}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openImageModal(item)}>
                <Image source={item} style={styles.swipeImage} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* Modal for Full-Screen Image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          {selectedImage && <Image source={selectedImage} style={styles.fullScreenImage} />}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 80,
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  overviewContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  overviewText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
  },
  readMoreButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    width: '90%',
    marginTop: 10,
  
  },
  guidelinesTitleContainer: {
    marginBottom: 16,
  },
  guidelinesTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 18,
  },
  routeContainer: {
    marginTop: 16,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    marginLeft: 18,
  },
  routeText: {
    fontSize: 18,
    flex: 1,
  },
  fareText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    marginRight: 28,
  },
  swipeableImagesContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  swipeImage: {
    width: 200, // Set the desired width for the swipeable images
    height: 250, // Set the desired height for the swipeable images
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Tricab;
