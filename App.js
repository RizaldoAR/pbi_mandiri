import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  icon,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=keyword&page=${page}&apiKey=c34494deb15e4110b93c34b65512cab5`,
      );

      const newArticles = response.data.articles;
      setArticles([...articles, ...newArticles]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const openArticle = item => {
    // Implement your article opening logic here
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'data:image/png;base64,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',
        }}
        style={styles.icon}
      />
      <Text style={styles.heading}>Mandiri News</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.articleCard}
            onPress={() => openArticle(item)}>
            <Image
              source={{uri: item.urlToImage}}
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        onEndReached={getNews}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  articleCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  loading: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 100, // Adjust the size to make it circular
    height: 100, // Adjust the size to make it circular
    borderRadius: 500, // Make it circular by setting half the width/height as borderRadius
    marginRight: 8,
  },
});

export default App;
