// Code from: https://stackoverflow.com/a/67139407/12205723

const net = require('net')
const HTTPTag = require('http-tag')

const socket = net.createConnection({
    // host: 'example.com',
    host: 'www.arweave.org',
    port: 443,
}, (hehe) => {

    console.log(hehe);
    // This callback is run once, when socket connected

    // Instead of manually writing like this:
    // socket.write('GET / HTTP/1.1\r\n')
    // socket.write('My-Custom-Header: Header1\r\n\r\n')
    
    // You will be able to write your request(or response) like this:
    // const xHeader = 'Header1' // here in the epressions you can pass any characters you want
    // socket.write(
    //     HTTPTag`
    //     GET / HTTP/1.1
    //     My-Custom-Header: ${xHeader}
        
    //     `
    // )
    socket.end()
})

socket.on('close', hasError => console.log(`Socket Closed, hasError: ${hasError}`))

// set readable stream encoding
socket.setEncoding('utf-8')
socket.on('data', data => console.log(data))
