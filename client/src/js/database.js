import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  console.log(`Content is ${content}`);
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  let result = store.put({ id: 1, value: content });
  console.log(`Result is ${result}`);
  // try {
  // result = store.put({ id: 1, value: content });
  // console.log('Data stored with ID' + result);
  // } catch (error) {
  //   console.error('putDb not implemented' + error);
  // }
  // await tx.done;
  const data = await result;
  console.log('Data stored with ID' + data.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  let content;
  try {
    content = store.get(1);
    console.log('Retrieved data: ', content);
    // return content;
  } catch (error) {
    console.error('getDb not implemented' + error);
    return [];
  }
  const result = await content;
  return result?.value;
};


initdb();