const allProduct = document.getElementById("GetProducts");
const productListDiv = document.getElementById("productList");
const idInput = document.getElementById("idInput");
const getProductById = document.getElementById("GetProductById");

allProduct.addEventListener("click", fetchAllProduct);
getProductById.addEventListener("click", fetchProductById);

async function fetchProductById() {
  let inputValue = idInput.value;

  if (!inputValue) {
    alert("Enter product ID");
    return;
  }
  const idEndpoint = new URL(`http://localhost:3000/product/${inputValue}`);

  const idResponse = await fetch(idEndpoint);

  if (idResponse.status == 404) {
    alert("Product ID not found");
    return;
  }

  const data = await idResponse.json();

  productListDiv.innerHTML = `
  <li>
        <img src=${data.image} alt=""  id="productImage"> <br><br>

        <strong>Name:</strong> ${data.name} <br><br>
        
        <strong>quantity:</strong> ${data.quantity} <br><br>
        
        <strong>price:</strong> ${data.price}</li>
  `;
  idInput.value = "";
}

function fetchAllProduct() {
  fetch("http://localhost:3000/product")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getData(data);
    });
}

function getData(param) {
  Array.from(param).forEach((element) => {
    productListDiv.innerHTML += `
        <li>
        <img src=${element.image} alt=""  id="productImage"> <br><br>

        <strong>Name:</strong> ${element.name} <br><br>
        
        <strong>quantity:</strong> ${element.quantity} <br><br>
        
        <strong>price:</strong> ${element.price}</li>

        `;
  });
}
