
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
  
export  function writeData(conn, value, storage) {
    return new Promise((resolve, reject) => {
      const tx = conn.transaction([storage],'readwrite');
      const store = tx.objectStore(storage);
      const request = store.put(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
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

export async function putValueOnDB(value,storage) {
    let conn;
    try {
      conn = await connect('stone-crypto',1);
      await writeData(conn, value, storage)
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
            await putValueOnDB({name:"Carlos José", email:"carlos@gmail.com", password:"123" ,cpf:"07469212418", data_nascimento:"24/12/1995"},"user")
            await putValueOnDB({name:"Maria José", email:"maria@gmail.com", password:"123",cpf:"07469212418", data_nascimento:"24/12/1995"},"user")
            await putValueOnDB({name:"Adriano Galvao", email:"adriano@gmail.com",password:"123",cpf:"07469212418", data_nascimento:"24/12/1995"},"user")    
        }
    } catch(error){
        console.log(error)
    }
}


export default connect