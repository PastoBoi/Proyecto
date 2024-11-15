// Sample JSON data (this could also be fetched from an API)
const jsonData = [
    {
        "name": "Hisohiso Banashi  -  Zutomayo",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/29ecd861ce6f102c6545e13a1248edb7/0x1900-000000-80-0-0.jpg"
    },
    {
        "name": "Otogi  -  Eve",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/e62edb9b94f7bcf0d7770c73d97562f6/0x1900-000000-80-0-0.jpg"
    },
    {
        "name": "Kyouugen  -  Ado",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/d00ed424dd8927d561034e6d89cb05b5/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Miracle Milk  -  Mili",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/1285d6765ae590bd717b886bb8b8dbd8/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Pure  -  Co Shiu Ne",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/43f9366c184d81b0fa1eaf86e39587b8/500x500-000000-80-0-0.jpg"
    }
];

// Function to display items
function displayItems(data) {
    const container = document.getElementById('ej');

    data.forEach(item => {
        // Extract details
        const name = item.name;
        const price = item.price;
        const link = item.link;
        const image = item.image;

        // Create HTML for each item
        const itemHTML = `
            <div class="product-item d-flex flex-column">
                <a href="${link}">
                    <img src="${image}" alt="Nombre Disco" class="product-image rounded">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-column">
                            <div class="product-name mt-2">${name}</div>
                            <div class="product-price">${price}</div>
                        </div>
                        <div class="add-button"><i class="ri-add-box-line"></i></div>
                    </div>
                </a>
            </div>
        `;

        // Append item HTML to container
        container.innerHTML += itemHTML;
    });
}


// Call the function to display items
displayItems(jsonData);