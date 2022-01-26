const processCustomersList = async (customersList)=>{
  const requiredFields = ["Seller First Name", "Seller Last Name", "Property Name", "Seller Phone", "Property Address", "Maximum Offer"]
  
  // map over customersList.items
  let filtered = customersList.items.map((item)=>{
    // filter every item to get the required fields only
    return item.fields.filter((item) => requiredFields.includes(item.label))
  })
  
  // map over the filteredCustomersList and make a simple object for each customer's data
  let processed = filtered.map((item)=>{
    return {
      propertyAddress: item.find((item)=>item.label == "Property Name").values[0].value,
      firstName: item.find((item)=>item.label == "Seller First Name").values[0].value,
      lastName: item.find((item)=>item.label == "Seller Last Name").values[0].value,
      PhoneNumber: item.find((item)=>item.label == "Seller Phone").values[0].value,
      maxOffer: item.find((item)=>item.label == "Maximum Offer") && item.find((item)=>item.label == "Maximum Offer").values[0].value,
      addressBreakDown: item.find((item)=>item.label == "Property Address") && item.find((item)=>item.label == "Property Address").values[0],
      ourOffer: item.find((item)=>item.label == "Maximum Offer") && (item.find((item)=>item.label == "Maximum Offer").values[0].value - item.find((item)=>item.label == "Maximum Offer").values[0].value * 0.03),
    }
  })
  
  return processed;
}

module.exports = processCustomersList;