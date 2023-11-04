import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Function to save data to IndexedDB
const saveDataToDB = async (content) => {
  try {
    await postDb(content);
    console.log('Data saved to IndexedDB');
  } catch (error) {
    console.error('Error saving data to IndexedDB:', error);
  }
};

// Function to retreive data from IndexedDB
const retrieveDataFromDB = async () => {
  try {
    const data = await getAllDb();
    console.log('Data retrieved from  IndexedDB', data);
  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
  }
};

// Example usage of the saveDataToDB function
// saveDataToDB({ yourData: 'example' });

// Example usage of the retrieveDataFromDB function
// retrieveDataFromDB();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
