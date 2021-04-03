import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState} from 'react'

const axios = require('axios')

// var test = {firstName: "Chase", lastName: "Myers", "ID": 1, address: "123 Fake St. Apt 3"}

export default function Home() {

  const [apiToken, setApiToken] = React.useState("")

  function createHashmap(e){
    e.preventDefault()
    
    axios.post('/api/create', {
      hashmapName: e.target.hashmapName.value
    })
    .then(res => {
      // console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
      if (res.status == 200){
        setApiToken(res.data.token)
        console.log("API TOKEN: " + apiToken)
      }else{
        setApiToken("")
      }
    })
    .catch(error => {
      console.error(error)
      console.log(error.response.status)
      console.log(error.response.data.message)
      setApiToken(error.response.data.message)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Hashmap.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <a id="social" href="https://twitter.com/PhantomOfTheOS">@PhantomOfTheOS</a>
      <main className={styles.main}>
        <h1>HASHMAP.ME</h1>
        <text>Persist data using this hashmap without the need for setting up your own database.</text>
        <text>Simply write records to this hashmap through HTTP, and retrieve them on initialization of your application to persist data.</text>
        <text>Each hashmap is it's own collection inside MongoDB.</text>
        <h2>{apiToken}</h2>
        <form onSubmit={e=>createHashmap(e)}  style={{alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <input maxLength='22' id="hashmapName" placeholder="Hashmap Name?" type="text" style={{textAlign: 'center' , width: '300px', height: '40px'}} /><br />
          <button style={{fontSize:'20px', width: "80%", height: '30px', marginTop: '10px'}}>Generate Hashmap</button>
        </form>
        <h4 style={{marginBottom: 0}}>Please note, a token can NEVER be found again.</h4>
        <h4 style={{margin: 0}}>Write down your token, to use your hashmap, or generate a new one.</h4>        
        <hr style={{width: '100%'}} />
        <h1>HOW?</h1>
        <div id="docs">

          <text style={{fontWeight: 'bold'}}>Header:</text>
          <br />
          <text><span style={{fontWeight: 'bold'}}>x-api-key</span>: Provide the Hashmap Token produced from above.</text>
          <br />
          <br />
          <h3 style={{marginTop: 0}}><a target="_blank" href="https://hoppscotch.io/?method=GET&url=https%3A%2F%2Fhashmap.me&path=%2Fapi%2Fread&headers=%5B%7B%22key%22%3A%22x-api-key%22,%22value%22%3A%22test-54ddb023-67a2-4546-a0bb-66afd40c33eb%22,%22active%22%3Atrue%7D%5D&rawParams=%7B%22identifier%22%3A%2208496ca9-1823-4a44-a667-486537b349af%22,%22code%22%3A%221231412312312%22%7D">
          Try Read</a><span> (please double check URL)</span></h3>
          <text><span style={{fontWeight: 'bold'}}>* GET</span> https://hashmap.me/api/read - Return all hashmap entry sets.</text>          
          <br />
          <br />
          <h3 style={{marginTop: 0}}><a target="_blank" href="https://hoppscotch.io/?method=PUT&url=https://hashmap.me&path=/api/write&contentType=application/json&headers=%5B%7B%22key%22:%22x-api-key%22,%22value%22:%22test-54ddb023-67a2-4546-a0bb-66afd40c33eb%22,%22active%22:true%7D%5D&bodyParams=%5B%7B%22key%22:%22key%22,%22value%22:%22thisisunique%22,%22active%22:true%7D,%7B%22key%22:%22value%22,%22value%22:%22%5C%22%5B%27apples%27,%20%27pears%27,%20%27oranges%27%5D%5C%22%22,%22active%22:true%7D,%7B%22key%22:%22%22,%22value%22:%22%22,%22active%22:true%7D%5D">
          Try Write</a><span> (please double check URL)</span></h3>
          <text><span style={{fontWeight: 'bold'}}>* PUT</span> https://hashmap.me/api/write - Insert or Update an entry set with the unique identifier KEY provided.</text>
          <br />
          <text><span style={{ marginLeft: '20px', fontWeight: 'bold'}}>BODY</span>:</text>
          <br />
          <text><span style={{ marginLeft: '40px', fontWeight: 'normal'}}>KEY - Unique identifer to the value being stored in the 'hashmap'</span></text>
          <br />
          <text><span style={{ marginLeft: '40px', fontWeight: 'normal'}}>VALUE - The data to be stored into the hashmap.</span></text>
        </div>        
        <hr style={{width: '100%'}} />
        <h1>EXAMPLE</h1>
        <img style={{width: '80%'}} src="example.png"/>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
