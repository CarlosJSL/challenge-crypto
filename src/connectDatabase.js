
export function connect(name, version) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);
      request.onupgradeneeded = () => {
          request.result.createObjectStore('user', { autoIncrement: true });
          request.result.createObjectStore('transactions', { autoIncrement: true });
      }
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => { console.log('blocked'); };
    });
  }
  
export  function writeData(conn, value,key , storage) {
    return new Promise((resolve, reject) => {
      const tx = conn.transaction([storage],'readwrite');
      const store = tx.objectStore(storage); 
      let request;
      if (storage === 'transactions'){
        request = store.put(value);
      } else{
        request = store.put(value, key);
      }
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
}


export async function getUserTransactions(storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      const transactions = await getAllData(conn, storage)
      return transactions.filter(transaction => transaction.wallet.hash === JSON.parse(window.localStorage.getItem('user')).wallet.hash)
    } catch(exception) {
      console.error(exception);
    } finally {
      if(conn)
        conn.close();
    }
}
export function getAllData(conn, storage) {
    return new Promise((resolve, reject) => {
      const tx = conn.transaction([storage],'readonly');
      const store = tx.objectStore(storage);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
}

export async function putValueOnDB(value,key, storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      await writeData(conn, value, key, storage)
    } catch(exception) {
      console.error(exception);
    } finally {
      if(conn)
        conn.close();
    }
}

export async function getUser(conn,storage) {
    return new Promise((resolve, reject) => {
        const tx = conn.transaction([storage],'readonly');
        const store = tx.objectStore(storage);
        const request = store.get(JSON.parse(window.localStorage.getItem('user')).email);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
}

export async function getUserAmount(storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      const user = await getUser(conn, storage)
      return user.wallet;
    } catch(exception) {
      console.error(exception);
    } finally {
      if(conn)
        conn.close();
    }
}

export async function getUserInfo(storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      const user = await getUser(conn, storage)
      return user;
    } catch(exception) {
      console.error(exception);
    } finally {
      if(conn)
        conn.close();
    }
}


export async function getAllDataOnDB(storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      const data = await getAllData(conn, storage)
      return data;
    } catch(exception) {
      console.error(exception);
    } finally {
      if(conn)
        conn.close();
    }
}

export async function chargeDB () {
    try {
        const result = await getAllDataOnDB("user")

        if(result.length === 0){
            await putValueOnDB(
                { 
                    name:"Carlos José", 
                    email:"carlos@gmail.com", 
                    password:"123", 
                    cpf:"07469212418", 
                    data_nascimento:"24/12/1995", 
                    wallet:{ 
                        hash: 'djcv98234y', 
                        real_value: 100000.00, 
                        bitcoin_value: 0 , 
                        brita_value: 0 
                    }
                },"carlos@gmail.com","user")
        }
    } catch(error){
        console.log(error)
    }
}


export default connect