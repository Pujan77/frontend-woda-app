import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';
import { getNewsAPI } from '../services/externalAPI';
import Loader from './Loader';

const BlogTags = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map(tag => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogAuthor = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const loadNews = async param => {
    setLoading(true);
    let res = await getNewsAPI(param);
    if (res) {
      setNextPage(res.data.nextPage);
      setLoading(false);
      setNewsData(res.data.results);
    }
  };
  useEffect(() => {
    loadNews(`&country=np&language=ne&category=politics`);
  }, []);
  const loadingNewsArticle = () => {
    if (newsData || loading === false) {
      return newsData.map((news, i) => {
        return (
          <div key={i}>
            <Box
              marginTop={{ base: '1', sm: '5' }}
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center"
              >
                <Box
                  width={{ base: '100%', sm: '85%' }}
                  zIndex="2"
                  marginLeft={{ base: '0', sm: '5%' }}
                  marginTop="5%"
                >
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Image
                      borderRadius="lg"
                      src={
                        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                      }
                      alt="some good alt text"
                      objectFit="contain"
                    />
                  </Link>
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                  <Box
                    //   bgGradient={useColorModeValue(
                    //     'radial(orange.600 1px, transparent 1px)',
                    //     'radial(orange.300 1px, transparent 1px)'
                    //   )}
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: '3', sm: '0' }}
              >
                <BlogTags tags={news.category} />
                <Heading marginTop="1">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    {news.title}
                  </Link>
                </Heading>
                <Text
                  as="p"
                  marginTop="2"
                  maxH={`15em`}
                  overflow={`auto`}
                  // color={useColorModeValue('gray.700', 'gray.200')}
                  fontSize="lg"
                >
                  {news.content}
                </Text>
                <BlogAuthor
                  name={news.source_id}
                  date={new Date(news.pubDate)}
                />
              </Box>
            </Box>
            <Divider marginTop="5" />
          </div>
        );
      });
    } else {
      return <Loader />;
    }
  };
  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">ताजा समाचार</Heading>
      {newsData ? loadingNewsArticle() : <Loader />}
    </Container>
  );
};

export default ArticleList;
