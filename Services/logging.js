module.exports = function() {
  process.on('uncaughtException', (ex) => {
      console.log("Synchronous action error:", ex);
      process.exit(1);
  });
  
  process.on('uncaughtRejection', (ex) => {
      console.log("Asynchronous action error:", ex);
      process.exit(1);
  });    
}
