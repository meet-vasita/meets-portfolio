import projectImg from '../assets/project.png';
import CWD from '../assets/CWD.png'
import CCPP from '../assets/CCPP.png'
import ML from '../assets/ML.webp'

const projects = [
  {
    title: 'FundChainX - Crowdfunding Using Blockchain Technology',
    description: 'A decentralized crowdfunding platform built using React, Node.js, Solidity (Hardhat), and deployed on the Sepolia testnet. Campaign data is stored on MongoDB Atlas, images on AWS S3, and smart contracts handle fund management securely on-chain.',
    technologies: ['React', 'Nodejs', 'Solidity', 'Hardhat','Mongo Atlas','AWS'],
    github: 'https://github.com/meet-vasita/FundChainX',
    image: CWD,
  },
  {
    title: 'Crypto Currency Price Prediction using LSTM',
    description: 'A CryptoCurrency Price Prediction Flask based app built using html, css, js and Deep Learning LSTM',
    technologies: ['Python', 'Flask', 'Deep Learning', 'Numpy','Pandas','Scikit-Learn'],
    github: 'https://github.com/meet-vasita/CryptoCurrency-price-prediction-using-LSTM',
    image: CCPP,
  },
  {
    title: 'Cement Compressive Strength Prediction',
    description: 'A Machine Learning Project to Predict the Cement Compressive Strength',
    technologies: ['Python', 'Jupyter', 'XGBoost', 'Numpy','Pandas','Scikit-Learn'],
    github: 'https://github.com/meet-vasita/Cement_Compressive_Strength_Prediction_Model',
    image: ML,
  },
];

export default projects;