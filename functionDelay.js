function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  
  (async ()=>{
      console.log("running script")
      let inboxItems = document.querySelectorAll(".table-inbox tr td.table-inbox-checkbox .checkboxSelect")
  
      if(inboxItems.length){
       for(item of inboxItems){
          console.log(item.getAttribute("rel"));
          item.getAttribute("rel")
          await delay(8000)
          console.log("clicking back button");
          history.back()
          await delay(8000)
          console.log("clicked back button");
      }
      }
  })()
  