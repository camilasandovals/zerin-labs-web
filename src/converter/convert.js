const fs = require('fs'); //already in node

// Read the input JSON file
fs.readFile('drugs.json', (err, data) => {
  if (err) throw err;
  
  // Parse the input JSON data into an array of strings
  const inputArray = JSON.parse(data);
  
  // Convert the input array into an array of objects
  const outputArray = inputArray.map(str => ({ 
    
        "value": str,
        "label": str
      
  }));
  
  // Write the output JSON file
  fs.writeFile('drugsconverted.json', JSON.stringify(outputArray), err => {
    if (err) throw err;
    console.log('The output file has been saved!');
  });
});